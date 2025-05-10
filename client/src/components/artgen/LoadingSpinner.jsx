import { motion } from 'framer-motion';
// import '../../assets/css/artGen.css';
import './loading-spinner.css';

function LoadingSpinner({ small = false }) {
  return (
    <motion.div
      className={small ? 'artgen-spinner artgen-spinner--sm' : 'artgen-spinner'}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.6,
        ease: 'linear',
      }}
    />
  );
}

export default LoadingSpinner;
