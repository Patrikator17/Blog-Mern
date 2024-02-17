import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'


const Signup = () => {
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
        <div className=''>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Enter Username' />
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label value='Enter Email' />
              <TextInput 
                type='text'
                placeholder='Email'
                id='email'
              />
            </div>
            <div>
              <Label value='Enter Password' />
              <TextInput 
                type='text'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>
              Signup
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-4'>
            <span>Have an account? </span>
            <Link to='/login' className='text-blue-600'>
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup