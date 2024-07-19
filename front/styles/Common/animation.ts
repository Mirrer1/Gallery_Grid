export const slideInFromLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: {
    delay: 0.1,
    duration: 0.5,
    ease: 'easeInOut'
  }
};

export const slideInFromBottom = (delay = 0.1) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.5,
    ease: 'easeInOut'
  }
});

export const CarouselAnimation = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { type: 'tween', delay: 0.1, duration: 0.5, ease: 'easeInOut' }
};

export const modalAnimation = {
  initial: {
    opacity: 0,
    scale: 0.75
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: 'easeIn',
      duration: 0.35
    }
  }
};
