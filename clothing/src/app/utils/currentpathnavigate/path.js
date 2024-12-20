import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const setpath=(currentpath)=>{
    Cookies.set('currentpath',currentpath,{expires:7});
}

export const getpath = () => {
    return Cookies.get('currentpath'); 
  };
  export const removepath=()=>{
    Cookies.remove('currentpath');
  }