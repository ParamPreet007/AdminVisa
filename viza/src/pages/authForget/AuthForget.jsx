import { useState } from "react";
import  ForgetPassword  from "./ForgetPassword";
import { ChangePassword } from "./ChangePassword";
import { VerifyOtp } from "./VerifyOtp";


const AuthForgot = () => {
  const [errorCount, setErrorCount] = useState(0);
  const [isReset, setIsReset] = useState({
    resetComp: false,
  });
  const [isOtp, setIsOtp] = useState({
    resetOtp: false
  })
  const [loading, setLoading] = useState(false);

  const forgotPasswordHandler = async (values) => {
    setLoading(true);
    try {
      // if (errorCount < MaxCount?.maxCount) {
        // let res = await forgetPasswordAPI(values, { message: true });
        // localStorage.setItem("forgetToken", res?.data?.data?.token)
        // if (res?.status === 200) {
        //   setIsReset({
        //     resetComp: true,
        //   })
        // }
      // }

    } catch (error) {
      setErrorCount((prev) => prev + 1)
    } finally {
      setLoading(false);
    }
  };
  const otpSection = async (otp) => {
    try {
      let forgetToken
      if (localStorage.getItem("resendOtp")) {
        forgetToken = localStorage.getItem("resendOtp")
      }
      else {
        forgetToken = localStorage.getItem("forgetToken")
      }
      let finalPayload = {
        otp,
        token: forgetToken
      }
      setLoading(true);
      // const res = await verifyOtpAPI(finalPayload, { message: true });

      // if (res?.status === 200) {
      //   setIsOtp({ resetOtp: true })
      //   localStorage.setItem("changePassword", res?.data?.data?.token)
      //   localStorage.setItem("otp", otp)


      // }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {isReset?.resetComp ? (
        isOtp.resetOtp ? <ChangePassword /> : <VerifyOtp otpSection={otpSection} loading={loading} />
      ) : (
        <ForgetPassword
          forgotPassword={forgotPasswordHandler}
          loading={loading}
        />
      )}
    </>
  );
};

export default AuthForgot;