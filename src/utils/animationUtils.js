export function getAnimation(animationName) {
  const animationData = {
    slideUpWithFadeIn: {
      from: {
        translateY: 30,
        opacity: 1,
      },
      to: {
        translateY: 0,
        opacity: 1,
      },
    },
    slideDownWithFadeIn: {
      from: {
        translateY: -30,
        opacity: 1,
      },
      to: {
        translateY: 0,
        opacity: 1,
      },
    },
    slideUpWithFadeOut: {
      from: {
        translateY: 0,
        opacity: 1,
      },
      to: {
        translateY: -30,
        opacity: 0,
      },
    },
    slideDownWithFadeOut: {
      from: {
        translateY: 0,
        opacity: 1,
      },
      to: {
        translateY: 30,
        opacity: 0,
      },
    },
    slideRightWithFadeIn: {
      from: {
        translateX: -40,
      },
      to: {
        translateX: 0,
      },
    },
    slideLeftWithFadeOut: {
      from: {
        translateX: 0,
        opacity: 1,
      },
      to: {
        translateX: -100,
        opacity: 0,
      },
    },
    slideRightWithFadeOut: {
      from: {
        translateX: 0,
        opacity: 1,
      },
      to: {
        translateX: 100,
        opacity: 0,
      },
    },
    slideLeft: {
      from: {
        translateX: 0,
      },
      to: {
        translateX: -400,
      },
    },
    slideRight: {
      from: {
        translateX: 0,
      },
      to: {
        translateX: 400,
      },
    },
    sampleAnimation: {
      from: {
        rotate: '-30deg',
        scale: 0.6,
        opacity: 0,
      },
      to: {
        rotate: '0deg',
        scale: 1,
        opacity: 1,
      },
    },
    fadeIn: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    zoomInWithFadeIn: {
      from: {
        scale: 0.2,
        opacity: 0,
      },
      to: {
        scale: 1,
        opacity: 1,
      },
    },
  };

  return animationData[animationName];
}
