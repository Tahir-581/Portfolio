export const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

export const slideUpWord = {
  initial: { y: "110%" },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.55, delay: 0.02 * i, ease: EASE_LUXURY },
  }),
  closed: {
    y: "110%",
    transition: { duration: 0.45, ease: EASE_LUXURY },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.45 },
  },
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};
