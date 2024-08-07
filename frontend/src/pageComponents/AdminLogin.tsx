import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e:any) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email ,password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
        localStorage.setItem('jwtToken', data.access_token);
        toast.success("Login successfully")
        navigate('/adminproducts'); 
        } else {
            toast.error("Failed Login")
        }
    };

    
    
    return (
        <>
        <div>
        <h1>Admin Login page</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor="uname">Enter Username</label>
            <input type="text" id="uname" value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label htmlFor="email">Enter Email</label>
            <input type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="pass">Enter Password</label>
            <input type="password" id="pass" value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    </>
    )
}

export default AdminLogin
