import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon from react-icons
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme); // Accessing theme from Redux store

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.email) {
      dispatch(signInFailure('Please fill in all the credentials..'));
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure('Invalid Credentials'));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-md w-full p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-3xl font-extrabold text-center mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>Welcome Back!</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="text-gray-800">Email:</Label>
            <TextInput id="email" type='email' name="email" className="w-full" placeholder="Enter your email" onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-800">Password:</Label>
            <TextInput id="password" name="password" type="password" className="w-full" placeholder="Enter your password" onChange={handleChange} />
          </div>

          <div>
            <Button gradientDuoTone="purpleToBlue" type="submit" className="w-full">
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">or</span>
        </div>
        <OAuth />
        <div className='flex gap-2 text-sm mt-4'>
          <span>Don't Have an account? </span>
          <Link to='/signup' className='text-blue-600'>Signup</Link>
        </div>
      </div>

      {errorMessage && (
        <Alert className='mt-4 flrx flex-col' color='failure'>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default Login;
