import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = async (e:any) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/admin/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email , password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
        localStorage.setItem('jwtToken', data.access_token);
        toast.success("Login successfully")
        navigate('/adminlogin'); 
        } else {
            toast.error("Failed Login")
        }
    };

    
    
    return (
        <>
        <div className="flex items-center justify-center mt-[50px] bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6">Admin Register Page</h1>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="uname" className="block text-sm font-medium mb-1">Enter Username</label>
                <input
                  type="text"
                  id="uname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Enter Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="pass" className="block text-sm font-medium mb-1">Enter Password</label>
                <input
                  type="password"
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
    </>
    )
}

export default AdminRegister
