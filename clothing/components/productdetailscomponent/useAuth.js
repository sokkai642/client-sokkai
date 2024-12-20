import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.id;
    } catch {
      return null;
    }
  };

  return { isAuthenticated, getUserId };
};

export default useAuth;