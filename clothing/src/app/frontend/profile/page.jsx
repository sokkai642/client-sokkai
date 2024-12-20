'use client'
import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTwitter } from "react-icons/fa";
import axios from 'axios';
import { getUserIdFromToken } from "@/app/utils/token/token";
import Image from 'next/image';
import {useRouter} from "next/navigation";
import profile1 from "../../../../public/images/profile/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
import profile from "../../../../public/images/profile/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.webp"
const Profile = () => {
  const router=useRouter();
  const userId = getUserIdFromToken();
  const [userdata, setData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false); 

  useEffect(() => {
    const getuserdata = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/user?userId=${userId}`);
          setData(response.data.userdata);
          setLoadingContent(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoadingContent(false); // Stop loading even if there is an error
        }
      } else {
        setLoadingContent(false); // Stop loading if no userId
      }
    };
    getuserdata();
  }, [userId]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
const navigate=(a)=>{
if(a==="orders"){
  router.push("/frontend/orderhistory")
}
}
  const saveChanges = async () => {
    setLoadingSave(true);
    try {
      const updatedUser = {
        userId,
        name: userdata.name,
        phone: userdata.phone,
        email: userdata.email
      };

      await axios.put(`/api/Auth/`, updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Changes saved successfully");
      toggleModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-8">
        <h1 className="text-3xl font-bold mt-12 mb-8 tracking-wide text-gray-800 text-center">PROFILE</h1>

        <section className="w-full max-w-screen-lg bg-white shadow-md rounded-lg p-6 sm:p-10">
          {loadingContent ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : userId ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6 md:pb-8 mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <Image
                    src={profile}
                    alt="User Avatar"
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-gray-300"
                    width={300}
                    height={300}
                  />
                  <div className="text-center md:text-left text-gray-800">
                    <h2 className="text-xl sm:text-2xl font-bold">{userdata.name}</h2>
                    <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
                      {userdata.phone || '6369012255'}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                      {userdata.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 md:mt-0">
                  <button
                    className="py-2 px-6 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100"
                    onClick={toggleModal}
                  >
                    EDIT PROFILE
                  </button>
                  <button className="py-2 px-6 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-200">
                    View Address
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="py-3 text-gray-800 font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-center shadow" onClick={()=>navigate("orders")}>
                  Orders
                </button>
                <button className="py-3 text-gray-800 font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-center shadow">
                  Cancelled
                </button>
                <button className="py-3 text-gray-800 font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-center shadow">
                  About
                </button>
                <button className="py-3 text-gray-800 font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-center shadow" >
                  Contact
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Please Log In or Sign Up</h2>
              <div className="flex justify-center gap-4">
                <button className="py-2 px-6 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">
                  Login
                </button>
                <button className="py-2 px-6 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" onClick={(e) => {
          if (e.target === e.currentTarget) toggleModal();
        }}>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Edit Profile
            </h2>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="text-black w-full p-4 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={userdata.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="text-black w-full p-4 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={userdata.phone || '6369012255'}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="text-black w-full p-4 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={userdata.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className={`py-3 px-6 w-full text-white ${loadingSave ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} rounded-md transition-colors`}
                  onClick={saveChanges}
                  disabled={loadingSave}
                >
                  {loadingSave ? (
                    <div className="flex justify-center items-center">
                      <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  type="button"
                  className="py-3 px-6 w-full text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-black text-white py-8 mt-8 w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">SOKKAI</h2>
          <p className="text-gray-400 text-sm mb-6 text-center">Men Made Better</p>

          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
