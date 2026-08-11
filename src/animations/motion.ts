export const pageTransition = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2,0.8,0.2,1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } }
}

export const floatVariant = {
  initial: { y: 0 },
  animate: { y: [0, -8, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
}
