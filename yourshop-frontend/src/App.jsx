
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './ContextApi/AuthContextApi';
import ProtectedRoute from './ProtectedRouter/ProtectedRoute';
import Login from './Authentication/Login/Login.jsx';
import Register from './Authentication/Register/Register.jsx';
import Verify from './Component/EmailVerification/EmailVerification.jsx';
import Email from './Component/Email.jsx';
import SendPassTokenMail from './Authentication/SendPassTokenMail/SendTokenMail.jsx';
import ResetPassWord from './Component/ResetPassWord/ResetPassword.jsx';
import Header from './Component/Header/Header.jsx';
import Home from './Page/Home/Home.jsx';
import Footer from './Component/Footer/Footer.jsx';
import CardDetails from "./Component/CardDetails/CardDetails.jsx";
import Address from './Component/Address/Address.jsx';
import './App.css'

function App() {


  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route index path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email" element={<Email />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path="/forgetpassword" element={<SendPassTokenMail />} />
            <Route path="address" element={<Address />} />
            <Route path="/Reset-Password/:token" element={<ResetPassWord />} />
            <Route path='/product/:id' element={<CardDetails />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
