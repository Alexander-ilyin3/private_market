export default () => ({
  preloader: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.19)',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 10000,
    marginLeft: -8,
    marginTop: -8,
  },
  cssloadloader: {
    position: 'relative',
    left: 'calc(50% - 31px)',
    width: 100,
    height: 100,
    margin: '130px 0',
    perspective: 780,
  },
  cssloadInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    borderRadius: '50%',
  },
  one: {
    left: '0%',
    top: '0%',
    animation: '$cssload-rotate-one 1.15s linear infinite',
    borderBottom: '3px solid #5C5EDC',
  },
  two: {
    right: '0%',
    top: '0%',
    animation: '$cssload-rotate-two 1.15s linear infinite',
    borderRight: '3px solid rgba(76, 70, 101, 0.99)',
  },
  three: {
    right: '0%',
    bottom: '0%',
    animation: '$cssload-rotate-three 1.15s linear infinite',
    borderTop: '3px solid rgb(233, 144, 138)',
  },

  '@keyframes cssload-rotate-one': {
    '0%': {
      transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)',
    },
    '100%': {
      transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)',
    },
  },

  '@keyframes cssload-rotate-two': {
    '0%': {
      transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)',
    },
    '100%': {
      transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)',
    },
  },

  '@keyframes cssload-rotate-three': {
    '0%': {
      transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)',
    },
    '100%': {
      transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)',
    },
  },
})
