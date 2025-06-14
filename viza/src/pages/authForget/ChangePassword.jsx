"use client"

import { useState } from "react"
import { Form, message } from "antd"
import { motion } from "framer-motion"
import { LockOutlined, KeyOutlined } from "@ant-design/icons"
import CommonPassword from "../../component/CommonPassword"
import CommonButton from "../../component/CommonButton"
import "../../style/Login.css"
import { LeftSideContent } from "../../component/LeftSideContent"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "../../api/authApi"
import Password from "antd/es/input/Password"

const ChangePassword = (props) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true)

      // Validate that new password and confirm password match
      if (values.newPassword !== values.confirmPassword) {
        message.error("New password and confirm password do not match!")
        return
      }

      const otp = localStorage.getItem("otp")
      const res = await resetPassword(otp,{password:formData?.confirmPassword})
      message.success("Password updated Successfully  ")
navigate("/login")
     
    } catch (error) {
      message.error(error?.message)
      console.error("Password change error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Current password validation
  const validateCurrentPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your current password!"))
    }
    if (value.length < 6) {
      return Promise.reject(new Error("Password must be at least 6 characters!"))
    }
    return Promise.resolve()
  }

  // New password validation
  const validateNewPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your new password!"))
    }
    if (value.length < 8) {
      return Promise.reject(new Error("New password must be at least 8 characters!"))
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number!"),
      )
    }
    if (value === formData.currentPassword) {
      return Promise.reject(new Error("New password must be different from current password!"))
    }
    return Promise.resolve()
  }

  // Confirm password validation
  const validateConfirmPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please confirm your new password!"))
    }
    if (value !== formData.newPassword) {
      return Promise.reject(new Error("Passwords do not match!"))
    }
    return Promise.resolve()
  }

  return (
    <div className="login-page">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <motion.div className="blob blob-1" variants={floatingVariants} animate="animate" />
        <motion.div className="blob blob-2" variants={floatingVariants} animate="animate" transition={{ delay: 1 }} />
        <motion.div className="blob blob-3" variants={floatingVariants} animate="animate" transition={{ delay: 2 }} />
      </div>

      {/* Main Content */}
      <motion.div className="main-content" variants={containerVariants} initial="hidden" animate="visible">
        <div className="content-grid">
          {/* Left Side - Welcome Content */}
          <LeftSideContent />

          {/* Right Side - Change Password Form */}
          <motion.div className="form-section" variants={itemVariants}>
            <motion.div className="form-container" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              {/* Header */}
              <motion.div className="form-header" variants={itemVariants}>
                <motion.div className="form-icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <KeyOutlined className="form-icon-svg" />
                </motion.div>
                <h2 className="form-title">Change Password</h2>
                <p className="form-description">Update your account password</p>
              </motion.div>

              {/* Form */}
              <Form form={form} onFinish={handleSubmit} layout="vertical" className="login-form">
                {/* Current Password */}
                <Form.Item
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      validator: validateCurrentPassword,
                    },
                  ]}
                >
                  <CommonPassword
                    label="Current Password"
                    placeholder="Enter your current password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    icon={<LockOutlined />}
                  />
                </Form.Item>

                {/* New Password */}
                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      validator: validateNewPassword,
                    },
                  ]}
                >
                  <CommonPassword
                    label="New Password"
                    placeholder="Enter your new password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    icon={<LockOutlined />}
                  />
                </Form.Item>

                {/* Confirm New Password */}
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      validator: validateConfirmPassword,
                    },
                  ]}
                >
                  <CommonPassword
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    icon={<LockOutlined />}
                  />
                </Form.Item>

                {/* Password Requirements */}
                <motion.div className="password-requirements" variants={itemVariants}>
                  <p className="requirements-title">Password Requirements:</p>
                  <ul className="requirements-list">
                    <li>At least 8 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Contains at least one number</li>
                    <li>Different from current password</li>
                  </ul>
                </motion.div>

                {/* Submit Button */}
                <Form.Item>
                  <CommonButton type="primary" loading={loading} htmlType="submit">
                    {loading ? "Updating Password..." : "Update Password"}
                  </CommonButton>
                </Form.Item>

                
              </Form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="footer-text">
          Copyright & Developed By{" "}
          <motion.a href="https://techabet.com/" className="footer-link" whileHover={{ scale: 1.05 }}>
            Viza verify
          </motion.a>{" "}
          © 2025
        </p>
      </motion.div>
    </div>
  )
}

export default ChangePassword
