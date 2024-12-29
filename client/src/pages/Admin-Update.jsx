import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminUpdate = () => {
const [data, setData] = useState({
    username:"",
    email:"",
    phone:""
});

const {authorizationToken} = useAuth();
const params = useParams();

const getSingleUserData = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
            method: 'GET',
            headers: {
                Authorization: authorizationToken,
            },
        });
        const data = await response.json();
        setData(data);
        console.log(data);
    } catch (error) {
        console.log({msg: "error is therre"});
        
    }
    
    // if(response.ok) {
    //     getSingleUserData
    // }
}

useEffect(() => {
    getSingleUserData();
}, []);

const handleInput =  (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
        ...data,
        [name]: value,
    });
};

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: authorizationToken,
            },
            body: JSON.stringify(data),
        }
    );
    if(response.ok){
        toast.success('updated Successfuly');
    } else {
        toast.error('not updated');
    }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <section className="section-contact">
    <div className="contact-content container">
      <h1 className="main-heading">Update User Data</h1>
    </div>
    {/* <h1>Contact Page</h1> */}
    <div className="container ">
      {/* <div className="contact-img ">
        <img src="/images/support.png" alt="always ready to help you" />
      </div> */}

      <section className="section-form">
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={handleInput}
              autoCapitalize="off"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={data.email}
              onChange={handleInput}
              autoCapitalize="off"
              required
            />
          </div>
          <div>
            <label htmlFor="phone ">phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleInput}
              autoCapitalize="off"
              required
            />
          </div>
          <div>
            <button type="submit"> Submit </button>
          </div>
        </form>
      </section>
    </div>
  </section>
  )
}

export default AdminUpdate