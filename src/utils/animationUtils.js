export function getAnimation(animationName) {
  const animationData = {
    slideUp: {
      from: {
        translateY: 50,
      },
      to: {
        translateY: 0,
      },
    },
    slideDown: {
      from: {
        translateY: 0,
      },
      to: {
        translateY: 50,
      },
    },
    slideUpTool: {
      from: {
        translateY: 0,
      },
      to: {
        translateY: -30,
      },
    },
    slideDownTool: {
      from: {
        translateY: -30,
      },
      to: {
        translateY: 0,
      },
    },
    slideDownHeader: {
      from: {
        translateY: -40,
      },
      to: {
        translateY: 0,
      },
    },
    slideUpHeader: {
      from: {
        translateY: 0,
      },
      to: {
        translateY: -40,
      },
    },
    slideRight: {
      from: {
        translateX: -45,
      },
      to: {
        translateX: 0,
      },
    },
    slideLeft: {
      from: {
        translateX: 0,
      },
      to: {
        translateX: -45,
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
    fadeOut: {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
  };

  return animationData[animationName];
}
