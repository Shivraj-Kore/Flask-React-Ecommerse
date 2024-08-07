import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pageComponents/LoginPage';
import RegisterPage from './pageComponents/RegisterPage';
import ProductPage from './pageComponents/ProductPage';
import AddAndUpdateProductPage from './pageComponents/AddAndUpdateProductPage';
import AdminLogin from './pageComponents/AdminLogin';
import AdminRegister from './pageComponents/AdminRegister';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    
      <ToastContainer/>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/adminlogin">Admin Login</Link>
              </li>
              <li>
                <Link to="/adminregister">Admin Register</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/adminproducts" element={<AddAndUpdateProductPage/>} />
            <Route path="/adminlogin" element={<AdminLogin/>} />
            <Route path="/adminregister" element={<AdminRegister/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

function Home() {
  return (
    <div>
      <h1>This is home</h1>
    </div>
  );
}

export default App;
