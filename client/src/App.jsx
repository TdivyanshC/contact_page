import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Service from './pages/Service';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';
import { useAuth } from './store/auth';
import Admin from './components/layouts/Admin-Layout';
import AdminContacts from './pages/Admin-Contacts';
import AdminUsers from './pages/Admin-Users';
import AdminUpdate from './pages/Admin-Update';



export const App = () => {
  return (
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/service' element={<Service/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/logout' element={<Logout/>} />
    <Route path='*' element={<Error/>} />
    <Route path='/admin' element={<Admin />}>
    <Route path='users' element={<AdminUsers/>}/>
    <Route path='contacts' element={<AdminContacts/>}/>
    <Route path='users/:id/edit' element={<AdminUpdate/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  </>
  );
};

export default App;
