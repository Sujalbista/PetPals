
export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const isAuthenticated = () => {
    return !!getToken();
  };
  
  export const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`
  });
  