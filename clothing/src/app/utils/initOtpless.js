export const initOTPless = (callback) => {
  Reflect.set(window, "otpless", callback);
  const isScriptLoaded = document.getElementById("otpless-sdk");
  if (isScriptLoaded) return;

  const otplessSDK = document.createElement("script");
  otplessSDK.id = "otpless-sdk";
  otplessSDK.type = "text/javascript";
  otplessSDK.src = "https://otpless.com/v2/auth.js";
  otplessSDK.setAttribute("data-appid", "RXF5HPDIPQNCY9Z9O9RJ");
  document.head.appendChild(otplessSDK);
};
