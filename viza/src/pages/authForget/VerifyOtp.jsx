import { useState, useRef, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LeftSideContent } from "../../component/LeftSideContent";
import "../../style/Login.css";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";

export const VerifyOtp = ({ otpSection }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
  let newValue = [...otp]; // ✅ makes a shallow copy of otp array

  const otpValue = newValue.join("");
  if (otpValue.length !== 6) {
    message.error("Please enter complete OTP");
    return;
  }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("OTP verified successfully!");
      console.log("OTP verified:", otp);
      // navigate("/dashboard");
    } catch (error) {
      console.error("OTP verification failed:", error);
      message.error("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
            otpSection(otp);

    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("OTP sent successfully!");
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      console.error("Resend failed:", error);
      message.error("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="login-page">
      <div className="background-elements">
        <motion.div className="blob blob-1" variants={floatingVariants} animate="animate" />
        <motion.div className="blob blob-2" variants={floatingVariants} animate="animate" transition={{ delay: 1 }} />
        <motion.div className="blob blob-3" variants={floatingVariants} animate="animate" transition={{ delay: 2 }} />
      </div>

      <motion.div className="main-content" variants={containerVariants} initial="hidden" animate="visible">
        <div className="content-grid">
          <LeftSideContent />
          <motion.div className="form-section" variants={itemVariants}>
            <motion.div className="form-container" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <motion.div className="form-header" variants={itemVariants}>
                <motion.div className="form-icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                </motion.div>
                <h2 className="form-title">Verify OTP</h2>
                <p className="form-description">We've sent a 6-digit verification code to your email address</p>
              </motion.div>

              <Form form={form} layout="vertical" className="login-form">
                <motion.div variants={itemVariants} className="otp-container">
                  <div className="otp-inputs" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.05 }}>
                        <Input
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="otp-input"
                          placeholder="0"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* <motion.div variants={itemVariants} className="resend-section">
                  {!canResend ? (
                    <p className="timer-text">
                      Resend code in <span className="timer-count">{timer}s</span>
                    </p>
                  ) : (
                    <Button
                      type="link"
                      onClick={handleResend}
                      loading={resendLoading}
                      icon={<ReloadOutlined />}
                      className="resend-button"
                    >
                      {resendLoading ? "Sending..." : "Resend Code"}
                    </Button>
                  )}
                </motion.div> */}

                <motion.div variants={itemVariants}>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!isComplete}
                    className="verify-button"
                    size="large"
                    block
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="back-to-login">
                  <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/login")}
                    className="back-button"
                  >
                    Back to Login
                  </Button>
                </motion.div>
              </Form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

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
  );
};

export default VerifyOtp;
