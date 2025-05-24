import React from 'react'
import { motion } from "framer-motion"
import {  StarOutlined } from "@ant-design/icons"
export const LeftSideContent = () => {
     const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }
  return (
    <motion.div className="welcome-section" variants={itemVariants}>
            <motion.div className="welcome-content" variants={itemVariants}>
              <div className="brand-header">
                <motion.div className="brand-icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <StarOutlined className="brand-icon-svg" />
                </motion.div>
                <h1 className="brand-title">Viza Verify</h1>
              </div>

              <motion.h2 className="welcome-title" variants={itemVariants}>
                Welcome back to the future
              </motion.h2>

              <motion.p className="welcome-description" variants={itemVariants}>
              We specialize in assisting individuals and families with visa applications for a wide range of countries, ensuring a smooth, stress-free process from start to finish. Whether you're planning to study, work, or settle abroad, viza Consultant provides expert guidance and personalized support every step of the way. Your journey to international opportunities begins here with viza Consultant by your side.
              </motion.p>
            </motion.div>

            <motion.div className="features-grid" variants={itemVariants}>
              <motion.div className="feature-card" whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
                <h3 className="feature-title">🔒 Secure Access</h3>
                <p className="feature-description">Advanced encryption and security protocols</p>
              </motion.div>

             
            </motion.div>
          </motion.div>
  )
}
