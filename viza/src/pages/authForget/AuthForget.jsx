import { useState } from "react";
import  ForgetPassword  from "./ForgetPassword";
import  ChangePassword  from "./ChangePassword";
import { VerifyOtp } from "./VerifyOtp";
import { forgetPassword } from "../../api/authApi";


const AuthForgot = () => {
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
        let res = await forgetPassword(values, { message: true });
        console.log(res,'get response hereeee')
        // localStorage.setItem("forgetToken", res?.data?.data?.token)
        // if (res?.status === 200) {
          setIsReset({
            resetComp: true,
          })
        // }
      

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const otpSection = async (otp) => {
    try {
      let forgetToken
      localStorage.setItem("otp",otp)
      
      setLoading(true);
      // const res = await verifyOtpAPI(finalPayload, { message: true });

      // if (res?.status === 200) {
        setIsOtp({ resetOtp: true })
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