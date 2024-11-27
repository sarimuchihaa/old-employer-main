import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { googleLogin } from "../../services/auth";


const GoogleOAuth = ({ type, size, width,shape }) => {
  const router = useRouter();
  const handleGoogleLogin = async (credentials) => {
    const resp = await googleLogin(credentials.credential);
    if (resp.status === 200) {
      router.push("/profile");
      toast.success("Login Successfully");
    } else {
      toast.error(resp.error.message);
    }
  };

  return (
    <div style={{margin: "0 auto"}}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleLogin(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        size={size}
        width={width}
        type={type}
        shape={shape}
      />
    </div>
  );
};

export default GoogleOAuth;
