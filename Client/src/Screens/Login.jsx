import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout, Input, PasswordInput } from '../Components/Index';
import axios from '../Config/axios';
import { useUser } from '../Context/User.context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser} = useUser()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/users/login', {
      email,password
    }).then((res) => {
      console.log(res.data)
      
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      
      navigate('/')
    }).catch((err) => (
      console.log(err.response.data)
    ))
    
    console.log({ email, password });
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}

          placeholder="Enter your email"
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          placeholder="Enter your password"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          type="submit"
        >
          Sign In
        </motion.button>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}