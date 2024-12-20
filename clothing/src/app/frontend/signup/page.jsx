'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initOTPless } from '@/app/utils/initOtpless';
import './signup.css';
import Modal from 'react-modal';
import Cookies from 'js-cookie'; // Import js-cookie
import { setToken } from '@/app/utils/token/token';
import { getpath,setpath,removepath } from '@/app/utils/currentpathnavigate/path';
const Signup = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const backgrounds = [
    '/images/login/a4.jpg',
    '/images/login/a3.jpg',
    '/images/login/a6.webp',
    '/images/login/a7.jpg',
    '/images/login/a8.jpg',
    '/images/login/a11.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/Auth', formData);

      const { token, user } = response.data;
      console.log("token provided is", token);

   setToken(token);

      toast.success('Account created successfully!');

      setTimeout(() => {
        router.back();
      }, 2000);

    } catch (err) {
      console.error('Signup error:', err);

      const errorMessage = err.response ? err.response.data.error : err.message;

      if (errorMessage === 'Email already exists') {
        toast.error('This email is already registered. Please use a different one.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
const backtowebsite=()=>{
  const redirectPath = Cookies.get('currentpath');
  router.push(redirectPath)
}
  const openModal = (e) => {
    e.preventDefault()
    setIsModalOpen(true);
  
    try {
      initOTPless(callback); 
    } catch (error) {
      console.error("Error initializing OTPless:", error);
      toast.error("Error initializing OTPless.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

          const response = await axios.post("/api/Auth", {
              email,
              picture,
              name,
          });

          if (response.status === 200) {
              const { token, user } = response.data;
              console.log("token provided is", token, "👏👏👏👏👏👏👏👏👏👏😒❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥");

              Cookies.set("token", token, { expires: 7 });

              if (response.data.error === "Email already exists") {
                  console.log("Account already exists, skipping success toast.");
                  toast.error("Mail already exists.Try logging in");
                  router.push("/frontend/login")
                  return;  
              }

              toast.success(`Account created successfully, ${name}`);
              setIsModalOpen(false);
              const redirectPath = Cookies.get('currentpath');
              setTimeout(() => {
                removepath()
                router.push(redirectPath);
                 }, 2000);
          }
      } catch (error) {
          toast.error("Mail already exists.Try to Login");
          setIsModalOpen(false);
          router.push("/frontend/login")
          console.error("Error during authentication:", error);
      }
    } else {
      console.error("OTPless login failed or no user data returned");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <Image
          src={backgrounds[backgroundIndex]}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
        <div className="overlay">
          <h2>Join Us Today!</h2>
          <p>Create an account to enjoy exclusive benefits and seamless access.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-card">
          <button className="back-button" onClick={() => backtowebsite()}>
            Back to website →
          </button>
          <h1 className="form-header">Create an account</h1>
          <p className="form-subheader">
            Already have an account?  
            <button
              onClick={() => router.push('/frontend/login')}
              className="signup-link"
              style={{
                background: 'none',
                border: 'none',
                color: '#6f42c1',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group form-row">
              <input
                type="text"
                id="first-name"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <div className="divider">Or register with</div>

            <div className="social-buttons">
              <button className="google-button" onClick={(e)=>openModal(e)}>
                Google
              </button>
              <button className="apple-button">Apple</button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for OTPless Login */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="OTPless Login"
        className="otpless-modal"
        overlayClassName="otpless-overlay"
      >
        <div className="otpless-container">
          <div id="otpless-login-page"></div>
        </div>
        <button onClick={closeModal} className="close-modal-button">
          Close
        </button>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Signup;
