import { useState } from "react";
import { useAuth } from "../store/auth";
import { json } from "react-router-dom";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

// type UserAuth = boolean;
export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);

  const { user } = useAuth();

  // console.log("frontend user ", user);

  const [userData, setUserData] = useState(true);

  if (userData && user) {
    setData({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    // console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
          body: JSON.stringify(data)
        });

        if(response.ok){
          setData(defaultContactFormData);
          // console.log(data);
          alert('message send succesfully');
        }
    } catch (error) {
      alert('message not send ');
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* <h1>Contact Page</h1> */}
        <div className="container ">
          <div className="contact-img ">
            <img src="/images/support.png" alt="always ready to help you" />
          </div>

          <section className="section-form">
            <form onSubmit={handleContactForm}>
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
                <label htmlFor="message ">message</label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  value={data.message}
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
    </>
  );
};

export default Contact