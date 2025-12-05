import React from "react";
import { motion } from "framer-motion";
const MotionDiv = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
