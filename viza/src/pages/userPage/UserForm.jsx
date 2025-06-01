import { Modal, Spin } from "antd";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Row,
  Col,
  Card,
} from "antd";
import {
  CameraOutlined,
  FileImageOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

export const UserForm = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [imageLoading, setImageLoading] = useState({
    aadhaarphoto: false,
    passportPhoto: false,
  });
  const [payload,setPayload]=useState({})
  const [imageProcess, setImageProcess] = useState({});
  const [commonBoolean, setCommonBoolean] = useState({
    loading: false,
    imageLoading: false,
  });
  //Upload pic Functionality here
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      onSuccess();
    } catch (error) {
      onError("Upload failed");
    }
  };
  const CustomRequestApi = async (info) => {
    setCommonBoolean({ ...commonBoolean, imageLoading: true });
    try {
      if (info?.file?.status === "uploading") {
        getBase64(info?.file?.originFileObj, (imageUrl) => {
          setImageProcess({
            ...imageProcess,
            showImage: imageUrl,
          });
        });
        return;
      }
      if (info?.file?.originFileObj) {
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        // const response = await s3WorkerGenericApi(
        //   formData,
        // );
        // if (response?.status === 200) {
        //   const imageValue = response?.data?.data;
        //   setPayload({ ...payload, image: imageValue });
        // } else {
        //   message.error(res.data.message);
        // }
      }
    } catch (error) {
    } finally {
      setCommonBoolean({ ...commonBoolean, imageLoading: false });
    }
  };

  //logic for passport pic

  const passportCusotm = async ({ file, onSuccess, onError }) => {
    try {
      onSuccess();
    } catch (error) {
      onError("Upload failed");
    }
  };
  
  const addhareCustom = async ({ file, onSuccess, onError }) => {
    try {
      onSuccess();
    } catch (error) {
      onError("Upload failed");
    }
  };
  const UploadPicCustomAPi = async (info, fieldType) => {
    setImageLoading({ ...imageLoading, [fieldType]: true });
    try {
      if (info?.file?.status === "uploading") {
        getBase64(info?.file?.originFileObj, (imageUrl) => {
          setImageProcess((prev) => {
            return {
              ...prev,
              [fieldType]: imageUrl,
            };
          });
        });
        return;
      }
      if (info?.file?.originFileObj) {
        const formData = new FormData();
        formData.append("file", info?.file?.originFileObj);
        //   const response = await s3GenericApi(
        //     {
        //       employeecode: payload?.employeecode,
        //     },
        //     formData
        //     // {
        //     //   message: true,
        //     // }
        //   );
        //   if (response?.status === 200 || response?.code === 200) {
        //     const imageValue = response?.data?.data;
        //     setPayload({ ...payload, [fieldType]: imageValue });
        //   } else {
        //     message.error(res.data.message);
        //   }
      }
    } catch (error) {
    } finally {
      setImageLoading({ ...imageLoading, [fieldType]: false });
    }
  };

  const onFinish = async (values) => {
    try {
      console.log(values, "values here ");
      // Create FormData for file upload
      const formData = new FormData();

      // Append all form fields
      Object.keys(values).forEach((key) => {
        if (key === "picture" && values[key]?.fileList?.length > 0) {
          formData.append("picture", values[key].fileList[0].originFileObj);
        } else if (key !== "picture") {
          formData.append(key, values[key]);
        }
      });

      // Replace with your actual backend endpoint
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        message.success("Form submitted successfully!");
        form.resetFields();
      } else {
        message.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please check all required fields and try again.");
  };

  // Custom validation for Aadhaar number (12 digits)
  const validateAadhaar = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Aadhaar number is required"));
    }
    if (!/^\d{12}$/.test(value.replace(/\s/g, ""))) {
      return Promise.reject(new Error("Aadhaar number must be 12 digits"));
    }
    return Promise.resolve();
  };

  // Custom validation for PAN number
  const validatePAN = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("PAN number is required"));
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
      return Promise.reject(
        new Error("Invalid PAN number format (e.g., ABCDE1234F)")
      );
    }
    return Promise.resolve();
  };

  // Custom validation for phone number
  const validatePhone = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Phone number is required"));
    }
    if (!/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject(new Error("Invalid phone number format"));
    }
    return Promise.resolve();
  };

  // Format Aadhaar number with spaces
  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(" ");
    }
    return value;
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    form.setFieldsValue({ aadhaarNumber: formatted });
  };

  const handlePanChange = (e) => {
    const upperValue = e.target.value.toUpperCase();
    form.setFieldsValue({ panNumber: upperValue });
  };
  return (
    <>
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: 0, color: "#1677ff" }}>
              User Registration Form
            </h2>
            <p style={{ margin: "8px 0 0 0", color: "#666" }}>
              Please fill in all the required information
            </p>
          </div>
        }
        open={open}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        onCancel={onCancel}
        footer={false}
        closable={false}
        maskClosable={false}
      >
        <div>
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
              <h3
                style={{
                  borderBottom: "2px solid #1677ff",
                  paddingBottom: "8px",
                  color: "#333",
                }}
              >
                Personal Information
              </h3>
            </div>

            <div className="text-sm  ml-4 my-2">Profile Image</div>
            <div
              className={
                !imageProcess?.showImage
                  ? "w-24 h-24 mb-2 rounded-full bg-[#FFFFFF] border-dashed border border-black mx-2 flex justify-center items-center"
                  : "w-24 h-24 mb-2 mx-2"
              }
            >
              {imageProcess?.showImage ? (
                <div class="image-container">
                  <div class="image-wrapper">
                    <img
                      src={imageProcess?.showImage}
                      alt={imageProcess?.showImage}
                      className="w-24 h-24 rounded-full uploadImgSection"
                    />
                    <div class="icon-container rounded-full">
                      <div class="center-icon flex"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <Upload
                  name="image"
                  listType="text"
                  accept="image/*"
                  className="lableSlipUpload cursor-pointer"
                  onChange={CustomRequestApi}
                  customRequest={customRequest}
                >
                  {commonBoolean?.imageLoading ? (
                    <Spin className="h-24 w-24 cameraIcon" />
                  ) : (
                    <CameraOutlined
                      style={{ fontSize: "40px", color: "#D2D2D2" }}
                    />
                  )}
                </Upload>
              )}
            </div>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="First Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your First name!",
                    },
                    {
                      min: 2,
                      message: "Name must be at least 2 characters long!",
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters and spaces!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Father's Name"
                  name="fatherName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your father's name!",
                    },
                    {
                      min: 2,
                      message: "Name must be at least 2 characters long!",
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters and spaces!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your father's name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Mother's Name"
                  name="motherName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your mother's name!",
                    },
                    {
                      min: 2,
                      message: "Name must be at least 2 characters long!",
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters and spaces!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your mother's name" />
                </Form.Item>
              </Col>
            </Row>

            {/* Contact Information Section */}
            <div style={{ marginBottom: "24px", marginTop: "32px" }}>
              <h3
                style={{
                  borderBottom: "2px solid #1677ff",
                  paddingBottom: "8px",
                  color: "#333",
                }}
              >
                Contact Information
              </h3>
            </div>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
                {
                  min: 10,
                  message: "Address must be at least 10 characters long!",
                },
              ]}
            >
              <TextArea rows={3} placeholder="Enter your complete address" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ validator: validatePhone }]}
                >
                  <Input
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    addonBefore="+91"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Visa Type"
                  name="visaType"
                  rules={[
                    { required: true, message: "Please select visa type!" },
                  ]}
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
              <h3
                style={{
                  borderBottom: "2px solid #1677ff",
                  paddingBottom: "8px",
                  color: "#333",
                }}
              >
                Document Information
              </h3>
            </div>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Aadhaar Card Number"
                  name="aadhaarNumber"
                  rules={[{ validator: validateAadhaar }]}
                >
                  <Input
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={14}
                    onChange={handleAadhaarChange}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="PAN Card Number"
                  name="panNumber"
                  rules={[{ validator: validatePAN }]}
                >
                  <Input
                    placeholder="Enter PAN number (e.g., ABCDE1234F)"
                    maxLength={10}
                    onChange={handlePanChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12}>
                <div>
                  <div className="flex ml-6 my-1 text-xs text-[#697174] 	">
                    Passport Pic
                  </div>
                  <Form.Item
                    name="passport"
                    rules={[
                      {
                        required: true,
                        message: "Passport is required.",
                      },
                    ]}
                  >
                    <Card
                      className={
                        !imageProcess?.passport
                          ? "w-24 h-24 rounded-md bg-[#FFFFFF] border-dashed border border-black mx-5 flex justify-center items-center"
                          : "w-24 h-24 mx-5"
                      }
                    >
                      {imageProcess?.passport ? (
                        <div class="image-container">
                          <div class="image-wrapper">
                            <img
                              src={imageProcess?.passport}
                              alt={imageProcess?.passport}
                              className="w-24 h-24 rounded-md uploadImgSection"
                            />
                          </div>
                        </div>
                      ) : (
                        <Upload
                          name="passport"
                          listType="text"
                          onDrop={false}
                          accept="image/*"
                          className="lableSlipUpload"
                          onChange={(e) => UploadPicCustomAPi(e, "passport")}
                          customRequest={passportCusotm}
                        >
                          {imageLoading?.passportPhoto ? (
                            <Spin className="h-24 w-24 cameraIcon" />
                          ) : (
                            <FileImageOutlined
                              style={{
                                fontSize: "48px",
                                color: "gray",
                              }}
                            />
                          )}
                        </Upload>
                      )}
                    </Card>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div>
                  <div className="flex ml-6 my-1  text-xs text-[#697174] 	">
                    Aadhaar Card 
                  </div>
                  <Form.Item
                    name="aadhaarphoto"
                    rules={[
                      {
                        required: true,
                        message: "Aadhaar Card is required.",
                      },
                    ]}
                  >
                    <Card
                      className={
                        !imageProcess?.aadhaarphoto
                          ? "w-24 h-24 rounded-md bg-[#FFFFFF] border-dashed border border-black mx-5 flex justify-center items-center"
                          : "w-24 h-24 mx-5"
                      }
                    >
                      {imageProcess?.aadhaarphoto ? (
                        <div class="image-container">
                          <div class="image-wrapper">
                            <img
                              src={imageProcess?.aadhaarphoto}
                              alt={imageProcess?.aadhaarphoto}
                              className="w-24 h-24 rounded-md uploadImgSection"
                            />
                            
                          </div>
                        </div>
                      ) : (
                        <Upload
                          name="aadhaarphoto"
                          onDrop={false}
                          listType="text"
                          accept="image/*"
                          className="lableSlipUpload"
                          onChange={(e) =>
                            UploadPicCustomAPi(e, "aadhaarphoto")
                          }
                          customRequest={addhareCustom}
                        >
                          {imageLoading?.aadhaarphoto ? (
                            <Spin className="h-24 w-24 cameraIcon" />
                          ) : (
                            <FileImageOutlined
                              style={{
                                fontSize: "48px",
                                color: "gray",
                              }}
                            />
                          )}
                        </Upload>
                      )}
                    </Card>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Form.Item style={{ marginTop: "32px" }}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Button
                    type="default"
                    size="large"
                    style={{ width: "100%" }}
                    onClick={() => {
                      form.resetFields();
                      onCancel();
                    }}
                  >
                    Cancel Form
                  </Button>
                </Col>
                <Col xs={24} sm={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    Submit Form
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
