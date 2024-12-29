import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {


  const [ user, setUser] = useState({
    email:"",
    password:"",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if(response.ok) {
        storeTokenInLS(res_data.token);
        toast('login successfull');
        setUser({
          email:"",
          password:"",});
          navigate('/')
      } else{
        toast.error( res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("invalid credentials");
      }

      console.log("response data : ", response);
    } catch (error) {
      console.error("Error", error);
    }
    
  };

  return ( 
  <>
  <section>
    <main>
    <div className="section-registration">
          <div className="container grind grid-two-cols">
            <div className="reg-img">
              <img  src="/images/login.png"
                   alt="login form filling " 
                   width="200"
                   height="200"
              />
            </div>
            <div className="registration-form">
              <h1 className='main-heading mb-3'>Login Form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">email</label>
                  <input 
                    type="text" 
                    name='email'
                    placeholder='email'
                    id='email'
                    required
                    autoComplete='off'
                    value={user.email}
                    onChange={handleInput}
                    />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input 
                    type="password" 
                    name='password'
                    placeholder='password'
                    id='password'
                    required
                    autoComplete='off'
                    value={user.password}
                    onChange={handleInput}
                    />
                </div>
                <br />
                <button type='submit' className='btn btn-submit'>Login</button>
              </form>
            </div>
          </div>
        </div>
    </main>
  </section>
  </>
  )
}

export default Login