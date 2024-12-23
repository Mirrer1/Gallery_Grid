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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: 'easeIn' } }
  },
  initial: 'hidden',
  whileInView: 'visible',
  exit: 'exit',
  viewport: { once: false, amount: 0.2 }
};

export const slideInUploadImage = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { type: 'spring', stiffness: 50, damping: 20 }
};

export const suggestedListAnimation = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  viewport: { once: false, amount: 0.2 }
};

export const suggestedItemAnimation = {
  variants: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeInOut'
      }
    }
  }
};

export const slideInPostingUploadImage = (index: number, batchStart: number) => ({
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: {
    delay: (index - batchStart) * 0.2,
    type: 'spring',
    stiffness: 50,
    damping: 20
  }
});

export const reorderPostingUploadImage = {
  layout: true,
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 18,
    mass: 0.9
  }
};
