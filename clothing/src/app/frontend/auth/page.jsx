"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { initOTPless } from "@/app/utils/initOtpless";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const callback = async (otplessUser) => {
    console.log("Callback triggered with user data:", otplessUser);

    if (otplessUser) {
      console.log("OTPless condition passed");

      try {
        const { identities } = otplessUser;

        if (!identities || identities.length === 0) {
          console.error("Identities array is missing or empty:", identities);
          return;
        }

        const email = identities[0]?.identityValue;
        const name = identities[0]?.name;
        const picture = identities[0]?.picture;

        console.log("Parsed email and name:", email, name);
        const response = await axios.post("/api/Auth", {
          email,
          picture,
          name,
        });
        console.log(response);
        if (response.status === 200) {
          console.log("response to console the data : ", response.data);
          const { token, user } = response.data;
          console.log("user : ", user, "\ntoken : ", token);
          localStorage.setItem("token", token);

          toast.success(`Welcome back, ${name}`);
        }
      } catch (error) {
        toast.error("Error during authentication:", error);
      }
    } else {
      console.error("OTPless login failed or no user data returned");
    }
  };

  useEffect(() => {
    console.log("OTPless initialization called");

    try {
      initOTPless(callback);
    } catch (error) {
      console.error("Error initializing OTPless:", error);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <div id="otpless-login-page"></div>
    </div>
  );
};

export default Page;
