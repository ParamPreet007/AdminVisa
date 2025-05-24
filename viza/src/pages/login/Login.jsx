"use client"

import { useState } from "react"
import { Form, message } from "antd"
import { motion } from "framer-motion"
import { MailOutlined, LockOutlined, UserOutlined, StarOutlined } from "@ant-design/icons"
import CommonInput from "../../component/CommonInput"
import CommonPassword from "../../component/CommonPassword"
import CommonButton from "../../component/CommonButton"
import "../../style/Login.css"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
const navigate = useNavigate()
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

      console.log("Form values:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      message.success("Login successful!")

      // Here you would typically handle the login logic
      // navigate to dashboard or handle authentication
    } catch (error) {
      console.error("Login error:", error)
      message.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }


  const valildateEmailLogin = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your email!"))
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid email address!"))
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
          <motion.div className="welcome-section" variants={itemVariants}>
            <motion.div className="welcome-content" variants={itemVariants}>
              <div className="brand-header">
                <motion.div className="brand-icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <StarOutlined className="brand-icon-svg" />
                </motion.div>
                <h1 className="brand-title">Visa Verify</h1>
              </div>

              <motion.h2 className="welcome-title" variants={itemVariants}>
                Welcome back to the future
              </motion.h2>

              <motion.p className="welcome-description" variants={itemVariants}>
                Experience next-generation technology with our cutting-edge platform. Your journey into innovation
                starts here.
              </motion.p>
            </motion.div>

            <motion.div className="features-grid" variants={itemVariants}>
              <motion.div className="feature-card" whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
                <h3 className="feature-title">🔒 Secure Access</h3>
                <p className="feature-description">Advanced encryption and security protocols</p>
              </motion.div>

              <motion.div className="feature-card" whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
                <h3 className="feature-title">⚡ Real-time Sync</h3>
                <p className="feature-description">Instant updates across all your devices</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div className="form-section" variants={itemVariants}>
            <motion.div className="form-container" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              {/* Header */}
              <motion.div className="form-header" variants={itemVariants}>
                <motion.div className="form-icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <UserOutlined className="form-icon-svg" />
                </motion.div>
                <h2 className="form-title">Welcome Back</h2>
                <p className="form-description">Sign in to your account to continue</p>
              </motion.div>

              {/* Form */}
              <Form form={form} onFinish={handleSubmit} layout="vertical" className="login-form">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      validator: valildateEmailLogin,
                    },
                  ]}
                >
                  <CommonInput
                    label="Email Address"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<MailOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Password",
                    },
                  ]}
                >
                  <CommonPassword
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    icon={<LockOutlined />}
                  />
                </Form.Item>

                {/* Remember Me & Forgot Password */}
                <motion.div className="form-options" variants={itemVariants}
                onClick={()=>{
                  navigate("/forget-password")
                }}
                
                >
                  <label className="remember-me">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkbox-label">Remember me</span>
                  </label>
                  {/* <motion.a href="/forgot-password" className="forgot-password" whileHover={{ scale: 1.05 }}> */}
                    Forgot password?
                  {/* </motion.a> */}
                </motion.div>

                {/* Submit Button */}
                <Form.Item>
                  <CommonButton type="primary" loading={loading} htmlType="submit">
                    {loading ? "Signing in..." : "Sign In"}
                  </CommonButton>
                </Form.Item>

                {/* Sign Up Link */}
                <motion.div className="signup-link" variants={itemVariants}>
                  <p className="signup-text">
                    Don't have an account?{" "}
                    <motion.a href="/signup" className="signup-link-text" whileHover={{ scale: 1.05 }}>
                      Sign up
                    </motion.a>
                  </p>
                </motion.div>
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

export default LoginPage
