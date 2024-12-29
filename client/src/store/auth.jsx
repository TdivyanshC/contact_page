import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // our main goal is to get the user data 👇
        console.log("user", data.userData);
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async() => {
    try {
      const response = await fetch('http://localhost:5000/api/data/service',{
        method: 'GET',
      });

      if(response.ok){
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);  
    }
  };
  
  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);
  
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
      return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
      setToken("");
      return localStorage.removeItem('token')
    }
  
      return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken }}>
          {children}
        </AuthContext.Provider>
      );
    };

    
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider");
        
    }
    return authContextValue;
}



