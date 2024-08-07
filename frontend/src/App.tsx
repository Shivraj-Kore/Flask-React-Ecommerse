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
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <ToastContainer />
      <Router>
        <div className="container mx-auto p-4">
          <nav className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <ul className="flex space-x-4 items-center">
              <li>
                <Link to="/" className="bg-[#121212] rounded p-1 hover:bg-[#212121]">Home</Link>
              </li>
              <li>
                <Link to="/login" className="bg-[#121212] rounded p-1 hover:bg-[#212121]">Login</Link>
              </li>
              <li>
                <Link to="/register" className="bg-[#121212] rounded p-1 hover:bg-[#212121]">Register</Link>
              </li>
              <li>
                <Link to="/adminlogin" className="bg-[#121212] rounded p-1 hover:bg-[#212121]">Admin Login</Link>
              </li>
              <li>
                <Link to="/adminregister" className="bg-[#121212] rounded p-1 hover:bg-[#212121]">Admin Register</Link>
              </li>
              <li>
                <button onClick={logout} className="bg-red-500 text-white p-1 rounded hover:bg-red-600 lg:ml-[400px]">Logout</button>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/adminproducts" element={<AddAndUpdateProductPage />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminregister" element={<AdminRegister />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold">This is home</h1>
    </div>
  );
}

function logout() {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
}

export default App;
