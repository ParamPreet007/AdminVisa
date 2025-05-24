"use client"
import { Input } from "antd"
import { motion } from "framer-motion"

const CommonInput = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
  icon,
  error,
  className = "",
  ...props
}) => {
  return (
    // <motion.div
    //   className="common-input-container"
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.3 }}
    // >
    <>
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <div className="input-icon">{icon}</div>}
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`common-input ${icon ? "with-icon" : ""} ${error ? "error" : ""} ${className}`}
          {...props}
        />
      </div>
      </>
      // {error && (
      //   <motion.p
      //     className="error-message"
      //     initial={{ opacity: 0, x: -10 }}
      //     animate={{ opacity: 1, x: 0 }}
      //     transition={{ duration: 0.2 }}
      //   >
      //     {error}
      //   </motion.p>
      // )}
    // </motion.div>
  )
}

export default CommonInput
