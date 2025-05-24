"use client"

import { useState } from "react"
import { Input } from "antd"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const CommonPassword = ({ label, placeholder, value, onChange, name, icon, error, className = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <motion.div
      className="common-password-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {label && <label className="password-label">{label}</label>}
      <div className="password-wrapper">
        {icon && <div className="password-icon">{icon}</div>}
        <Input.Password
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          visibilityToggle={{
            visible: showPassword,
            onVisibleChange: setShowPassword,
          }}
          iconRender={(visible) =>
            visible ? <EyeOutlined className="eye-icon" /> : <EyeInvisibleOutlined className="eye-icon" />
          }
          className={`common-password ${icon ? "with-icon" : ""} ${error ? "error" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          className="error-message"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default CommonPassword
