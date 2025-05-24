"use client"
import { Button } from "antd"
import { motion } from "framer-motion"

const CommonButton = ({
  children,
  onClick,
  loading = false,
  type = "primary",
  className = "",
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      className="button-wrapper"
    >
      <Button
        onClick={onClick}
        loading={loading}
        disabled={disabled}
        icon={icon}
        className={`common-button ${type} ${disabled || loading ? "disabled" : ""} ${className}`}
        {...props}
      >
        <span className="button-text">{children}</span>
      </Button>
    </motion.div>
  )
}

export default CommonButton
