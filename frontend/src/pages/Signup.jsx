import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'//from userSlice



const Signup = () => {

  const [formData, setFormData] = useState({})
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, error: errorMessage} = useSelector(state => state.user) // user: name of reducer

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value}) //{username: 'are', email: 'dsa', password: 'fsd'}
  }
  // console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.username || !formData.password || !formData.email){
      return dispatch(signInFailure('Please fill in all the credentials..'))
      // return setErrorMessage('Please fill in all the credentials..')
    }

    try{
      // setLoading(true)
      // setErrorMessage(null)
      dispatch(signInStart())

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if(data.success === false){
        // setLoading(false)
        // return setErrorMessage('Email Already Exists..')
        dispatch(signInFailure('Email Already Exists.. Please Login to continue!!'))
      }
      // setLoading(false)

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/login')
      }
    }catch(error){
      // setErrorMessage(error.message)
      // setLoading(false)
      dispatch(signInFailure(data.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1  bg-gradient-to-r from-blue-400 to-purple-600
             hover:from-pink-500 hover:to-yellow-500 text-white rounded-xl'>Pratik's</span>
            &nbsp; Blog
          </Link>
          <p className='text-md mt-5'>
            Welcome to our community-driven platform, where creativity thrives and innovation knows no bounds. Whether you're a seasoned creator or just starting your journey, this is your space to share your ideas, showcase your projects, and connect with like-minded individuals from around the globe. Join us in building a vibrant community where imagination takes flight, and together, let's turn dreams into reality.
          </p>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Enter Username' />
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Enter Email' />
              <TextInput 
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Enter Password' />
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Signup'
                )
              }
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-4'>
            <span>Have an account? </span>
            <Link to='/login' className='text-blue-600'>
              Login
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-4 flrx flex-col' color='failure'> 
                {errorMessage}
              </Alert>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Signup