

import { useState } from "react"
import { Form, message } from "antd"
import { motion } from "framer-motion"
import { MailOutlined, LockOutlined, UserOutlined, StarOutlined } from "@ant-design/icons"
import CommonInput from "../../component/CommonInput"
import CommonPassword from "../../component/CommonPassword"
import CommonButton from "../../component/CommonButton"
import "../../style/Login.css"
import { useNavigate } from 'react-router-dom';
import { LeftSideContent } from "../../component/LeftSideContent"

const SignUpPage = () => {
  
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
         <LeftSideContent/>

          {/* Right Side - Login Form */}
          <motion.div className="form-section" variants={itemVariants}>
            <motion.div className="form-container" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              {/* Header */}
              <motion.div className="form-header" variants={itemVariants}>
                <motion.div className="form-icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <UserOutlined className="form-icon-svg" />
                </motion.div>
                <h2 className="form-title">Sign Up </h2>
                <p className="form-description">Sign up your account to continue</p>
              </motion.div>

              {/* Form */}
              <Form form={form} onFinish={handleSubmit} layout="vertical" className="login-form">
             <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message:"Name is required",
                    },
                  ]}
                >
                  <CommonInput
                    label="Name"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    icon={<UserOutlined />}
                  />
                </Form.Item>

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
                <motion.div className="form-options text-blue-500 cursor-pointer" variants={itemVariants}
                onClick={()=>{
                  navigate("/forget-password")
                }}
                
                >
                </motion.div>

                {/* Submit Button */}
                <Form.Item>
                  <CommonButton type="primary" loading={loading} htmlType="submit">
                    {loading ? "Sign UP..." : "Sign UP"}
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

export default SignUpPage
