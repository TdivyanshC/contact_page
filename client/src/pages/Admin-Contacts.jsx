import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const AdminContacts = () => {

  const {authorizationToken} = useAuth();
  const [contactData, setContactData] = useState([]);

  const getContactData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      console.log('contact data: ', data);
      if(response.ok) {
        // console.log(response);
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getContactData();
  }, []);

  return <>
  <section className='admin-contacts-section'>
    <h1>Admin Contact Data</h1>

    <div className="container admin-users">
              <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>message</th>
                </tr>
                <tbody>
      {contactData.map((curContactData, index) => {
                const {username, email, message} = curContactData;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td><button>Delete </button></td>
                  </tr>
                );
              
              })}
            </tbody>
              </thead>
            </table>
    </div>
  </section>
  </>
}

export default AdminContacts