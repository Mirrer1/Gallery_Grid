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

export const slideInCarousel = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { type: 'tween', delay: 0.1, duration: 0.5, ease: 'easeInOut' }
};

export const slideInModal = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      duration: 0.4
    }
  }
};

export const slideInTooltip = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideInSeletedImage = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 }
};

export const slideInList = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: false, amount: 0.2 }
};

export const slideInUploadImage = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { type: 'spring', stiffness: 50, damping: 20 }
};
