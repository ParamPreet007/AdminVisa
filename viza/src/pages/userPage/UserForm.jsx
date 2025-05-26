import { Modal } from 'antd'
import React from 'react'
import { Form, Input, Button, Upload, Select, message, Row, Col, Card } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const { Option } = Select
const { TextArea } = Input


export const UserForm = ({open,onCancel}) => {
     const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      // Create FormData for file upload
      const formData = new FormData()

      // Append all form fields
      Object.keys(values).forEach((key) => {
        if (key === "picture" && values[key]?.fileList?.length > 0) {
          formData.append("picture", values[key].fileList[0].originFileObj)
        } else if (key !== "picture") {
          formData.append(key, values[key])
        }
      })

      // Replace with your actual backend endpoint
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        message.success("Form submitted successfully!")
        form.resetFields()
      } else {
        message.error("Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      message.error("An error occurred while submitting the form.")
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
    message.error("Please check all required fields and try again.")
  }

  // Custom validation for Aadhaar number (12 digits)
  const validateAadhaar = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Aadhaar number is required"))
    }
    if (!/^\d{12}$/.test(value.replace(/\s/g, ""))) {
      return Promise.reject(new Error("Aadhaar number must be 12 digits"))
    }
    return Promise.resolve()
  }

  // Custom validation for PAN number
  const validatePAN = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("PAN number is required"))
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
      return Promise.reject(new Error("Invalid PAN number format (e.g., ABCDE1234F)"))
    }
    return Promise.resolve()
  }

  // Custom validation for phone number
  const validatePhone = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Phone number is required"))
    }
    if (!/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject(new Error("Invalid phone number format"))
    }
    return Promise.resolve()
  }

  // File upload validation
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!")
    }
    return false // Prevent auto upload
  }

  // Format Aadhaar number with spaces
  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\s/g, "")
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(" ")
    }
    return value
  }

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value)
    form.setFieldsValue({ aadhaarNumber: formatted })
  }

  const handlePanChange = (e) => {
    const upperValue = e.target.value.toUpperCase()
    form.setFieldsValue({ panNumber: upperValue })
  }
  return (
   <>
   <Modal  title={
          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: 0, color: "#1677ff" }}>User Registration Form</h2>
            <p style={{ margin: "8px 0 0 0", color: "#666" }}>Please fill in all the required information</p>
          </div>
        } open={open}
         style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        onCancel={onCancel} footer={false} closable={false} maskClosable={false}>
   
      <div
       
       
      >
        <Form
          form={form}
          name="userForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          {/* Personal Information Section */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ borderBottom: "2px solid #1677ff", paddingBottom: "8px", color: "#333" }}>
              Personal Information
            </h3>
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your First name!" },
                  { min: 2, message: "Name must be at least 2 characters long!" },
                  { pattern: /^[a-zA-Z\s]+$/, message: "Name can only contain letters and spaces!" },
                ]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>

           
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Father's Name"
                name="fatherName"
                rules={[
                  { required: true, message: "Please enter your father's name!" },
                  { min: 2, message: "Name must be at least 2 characters long!" },
                  { pattern: /^[a-zA-Z\s]+$/, message: "Name can only contain letters and spaces!" },
                ]}
              >
                <Input placeholder="Enter your father's name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Mother's Name"
                name="motherName"
                rules={[
                  { required: true, message: "Please enter your mother's name!" },
                  { min: 2, message: "Name must be at least 2 characters long!" },
                  { pattern: /^[a-zA-Z\s]+$/, message: "Name can only contain letters and spaces!" },
                ]}
              >
                <Input placeholder="Enter your mother's name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Contact Information Section */}
          <div style={{ marginBottom: "24px", marginTop: "32px" }}>
            <h3 style={{ borderBottom: "2px solid #1677ff", paddingBottom: "8px", color: "#333" }}>
              Contact Information
            </h3>
          </div>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter your address!" },
              { min: 10, message: "Address must be at least 10 characters long!" },
            ]}
          >
            <TextArea rows={3} placeholder="Enter your complete address" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Phone Number" name="phone" rules={[{ validator: validatePhone }]}>
                <Input placeholder="Enter 10-digit phone number" maxLength={10} addonBefore="+91" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Visa Type"
                name="visaType"
                rules={[{ required: true, message: "Please select visa type!" }]}
              >
                <Select placeholder="Select visa type">
                  <Option value="workType">Work Type</Option>
                  <Option value="studyType">Study Type</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Document Information Section */}
          <div style={{ marginBottom: "24px", marginTop: "32px" }}>
            <h3 style={{ borderBottom: "2px solid #1677ff", paddingBottom: "8px", color: "#333" }}>
              Document Information
            </h3>
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Aadhaar Card Number" name="aadhaarNumber" rules={[{ validator: validateAadhaar }]}>
                <Input placeholder="Enter 12-digit Aadhaar number" maxLength={14} onChange={handleAadhaarChange} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="PAN Card Number" name="panNumber" rules={[{ validator: validatePAN }]}>
                <Input placeholder="Enter PAN number (e.g., ABCDE1234F)" maxLength={10} onChange={handlePanChange} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: "32px" }}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Button type="default" size="large" style={{ width: "100%" }} onClick={() => form.resetFields()}>
                  Reset Form
                </Button>
              </Col>
              <Col xs={24} sm={12}>
                <Button type="primary" htmlType="submit" size="large" style={{ width: "100%" }}>
                  Submit Form
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
   </Modal>
   </>
  )
}
