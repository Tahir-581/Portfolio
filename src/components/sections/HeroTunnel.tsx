"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroTunnelProps = {
  images: string[];
  isDarkMode?: boolean;
};

const TUNNEL_WIDTH = 24;
const TUNNEL_HEIGHT = 16;
const SEGMENT_DEPTH = 6;
const NUM_SEGMENTS = 6;
const FLOOR_COLS = 6;
const WALL_ROWS = 4;
const COL_WIDTH = TUNNEL_WIDTH / FLOOR_COLS;
const ROW_HEIGHT = TUNNEL_HEIGHT / WALL_ROWS;

function disposeMesh(mesh: THREE.Mesh, disposeMap: boolean) {
  mesh.geometry.dispose();
  const material = mesh.material;
  const mats = Array.isArray(material) ? material : [material];
  mats.forEach((m) => {
    if (disposeMap && m instanceof THREE.MeshBasicMaterial && m.map) {
      m.map.dispose();
    }
    m.dispose();
  });
}

export function HeroTunnel({ images, isDarkMode = true }: HeroTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const segmentsRef = useRef<THREE.Group[]>([]);
  const scrollPosRef = useRef(0);
  const imageUrlsRef = useRef(images);

  useEffect(() => {
    imageUrlsRef.current = images;
  }, [images]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkMode ? 0x050505 : 0xffffff);
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x050505 : 0xffffff, 0.035);
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const isSmallScreen = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isSmallScreen,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();
    const textureCache = new Map<string, THREE.Texture>();
    const texturePending = new Map<string, Promise<THREE.Texture>>();

    const loadTexture = (url: string) => {
      const cached = textureCache.get(url);
      if (cached) return Promise.resolve(cached);
      const pending = texturePending.get(url);
      if (pending) return pending;

      const next = new Promise<THREE.Texture>((resolve) => {
        textureLoader.load(url, (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.colorSpace = THREE.SRGBColorSpace;
          textureCache.set(url, tex);
          texturePending.delete(url);
          resolve(tex);
        });
      });
      texturePending.set(url, next);
      return next;
    };

    const populateImages = (group: THREE.Group, w: number, h: number, d: number) => {
      const cellMargin = 0.4;
      const activePool = imageUrlsRef.current;
      if (activePool.length === 0) return;

      const addImg = (
        pos: THREE.Vector3,
        rot: THREE.Euler,
        wd: number,
        ht: number,
      ) => {
        const url = activePool[Math.floor(Math.random() * activePool.length)];
        const geom = new THREE.PlaneGeometry(wd - cellMargin, ht - cellMargin);
        const mat = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        });
        loadTexture(url).then((tex) => {
          mat.map = tex;
          mat.needsUpdate = true;
          gsap.to(mat, { opacity: 0.85, duration: 0.6 });
        });
        const m = new THREE.Mesh(geom, mat);
        m.position.copy(pos);
        m.rotation.copy(rot);
        m.name = "slab_image";
        group.add(m);
      };

      let lastFloorIdx = -999;
      for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > lastFloorIdx + 1 && Math.random() > 0.8) {
          addImg(
            new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, -h, -d / 2),
            new THREE.Euler(-Math.PI / 2, 0, 0),
            COL_WIDTH,
            d,
          );
          lastFloorIdx = i;
        }
      }

      let lastCeilIdx = -999;
      for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > lastCeilIdx + 1 && Math.random() > 0.88) {
          addImg(
            new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, h, -d / 2),
            new THREE.Euler(Math.PI / 2, 0, 0),
            COL_WIDTH,
            d,
          );
          lastCeilIdx = i;
        }
      }

      let lastLeftIdx = -999;
      for (let i = 0; i < WALL_ROWS; i++) {
        if (i > lastLeftIdx + 1 && Math.random() > 0.8) {
          addImg(
            new THREE.Vector3(-w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
            new THREE.Euler(0, Math.PI / 2, 0),
            d,
            ROW_HEIGHT,
          );
          lastLeftIdx = i;
        }
      }

      let lastRightIdx = -999;
      for (let i = 0; i < WALL_ROWS; i++) {
        if (i > lastRightIdx + 1 && Math.random() > 0.8) {
          addImg(
            new THREE.Vector3(w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
            new THREE.Euler(0, -Math.PI / 2, 0),
            d,
            ROW_HEIGHT,
          );
          lastRightIdx = i;
        }
      }
    };

    const createSegment = (zPos: number) => {
      const group = new THREE.Group();
      group.position.z = zPos;
      const w = TUNNEL_WIDTH / 2;
      const h = TUNNEL_HEIGHT / 2;
      const d = SEGMENT_DEPTH;

      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDarkMode ? 0x555555 : 0xb0b0b0,
        transparent: true,
        opacity: isDarkMode ? 0.35 : 0.5,
      });
      const lineGeo = new THREE.BufferGeometry();
      const vertices: number[] = [];

      for (let i = 0; i <= FLOOR_COLS; i++) {
        const x = -w + i * COL_WIDTH;
        vertices.push(x, -h, 0, x, -h, -d);
        vertices.push(x, h, 0, x, h, -d);
      }
      for (let i = 1; i < WALL_ROWS; i++) {
        const y = -h + i * ROW_HEIGHT;
        vertices.push(-w, y, 0, -w, y, -d);
        vertices.push(w, y, 0, w, y, -d);
      }
      vertices.push(-w, -h, 0, w, -h, 0);
      vertices.push(-w, h, 0, w, h, 0);
      vertices.push(-w, -h, 0, -w, h, 0);
      vertices.push(w, -h, 0, w, h, 0);

      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      const lines = new THREE.LineSegments(lineGeo, lineMaterial);
      group.add(lines);
      populateImages(group, w, h, d);
      return group;
    };

    const segments: THREE.Group[] = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const z = -i * SEGMENT_DEPTH;
      const segment = createSegment(z);
      scene.add(segment);
      segments.push(segment);
    }
    segmentsRef.current = segments;

    let frameId = 0;
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;
      frameId = requestAnimationFrame(animate);
      if (!cameraRef.current || !sceneRef.current || !rendererRef.current) {
        return;
      }

      const targetZ = -scrollPosRef.current * 0.05;
      const currentZ = cameraRef.current.position.z;
      cameraRef.current.position.z += (targetZ - currentZ) * 0.1;

      const tunnelLength = NUM_SEGMENTS * SEGMENT_DEPTH;
      const camZ = cameraRef.current.position.z;

      segmentsRef.current.forEach((segment) => {
        if (segment.position.z > camZ + SEGMENT_DEPTH) {
          let minZ = 0;
          segmentsRef.current.forEach((s) => {
            minZ = Math.min(minZ, s.position.z);
          });
          segment.position.z = minZ - SEGMENT_DEPTH;
        }
        if (segment.position.z < camZ - tunnelLength - SEGMENT_DEPTH) {
          let maxZ = -999999;
          segmentsRef.current.forEach((s) => {
            maxZ = Math.max(maxZ, s.position.z);
          });
          segment.position.z = maxZ + SEGMENT_DEPTH;
        }
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(frameId);
          animate();
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0 },
    );
    observer.observe(containerRef.current);

    const onScroll = () => {
      scrollPosRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) {
        return;
      }
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      segmentsRef.current.forEach((segment) => {
        segment.traverse((child) => {
          if (child instanceof THREE.Mesh && child.name === "slab_image") {
            disposeMesh(child, false);
          }
          if (child instanceof THREE.LineSegments) {
            child.geometry.dispose();
            const mat = child.material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat.dispose();
          }
        });
        scene.remove(segment);
      });
      segmentsRef.current = [];
      textureCache.forEach((tex) => tex.dispose());
      textureCache.clear();
      renderer.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once; theme updates handled below
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    const bgHex = isDarkMode ? 0x050505 : 0xffffff;
    const fogHex = isDarkMode ? 0x050505 : 0xffffff;
    const lineHex = isDarkMode ? 0x555555 : 0xb0b0b0;
    const lineOp = isDarkMode ? 0.35 : 0.5;

    sceneRef.current.background = new THREE.Color(bgHex);
    if (sceneRef.current.fog instanceof THREE.FogExp2) {
      sceneRef.current.fog.color.setHex(fogHex);
    }

    segmentsRef.current.forEach((segment) => {
      segment.children.forEach((child) => {
        if (child instanceof THREE.LineSegments) {
          const mat = child.material as THREE.LineBasicMaterial;
          mat.color.setHex(lineHex);
          mat.opacity = lineOp;
          mat.needsUpdate = true;
        }
      });
    });
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? "#050505" : "#ffffff",
        transition: "background-color 0.7s ease",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
