import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Admin = () => {
  return (
   <>
   <header>
    <div className="container">
        <nav>
            <ul>
                <li> <NavLink to='/admin/users'> Users </NavLink></li>
                <li><NavLink to='/admin/contacts'> Contacts </NavLink></li>
                <li><NavLink to='/service'> Services </NavLink></li>
                <li><NavLink to='/'> Home </NavLink></li>
            </ul>
        </nav>
    </div>
   </header>
   <Outlet/>
   </>
  )
}

export default Admin