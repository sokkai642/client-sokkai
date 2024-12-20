import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


export const getUserIdFromToken = () => {
  const token = Cookies.get('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken?.id; 
  }
  return null;
};


export const getToken = () => {
  return Cookies.get('token'); 
};


export const setToken = (token) => {
  Cookies.set('token', token, { expires: 7 }); 
};


export const removeToken = () => {
  Cookies.remove('token');
};
export const isAuthenticated = () => {
    const token = Cookies.get('token');
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.exp > Math.floor(Date.now() / 1000); 
    } catch {
      return false;
    }
  };