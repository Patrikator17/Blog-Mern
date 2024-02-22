import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'

const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user)


  return (
    <div className='max-w-lg mx-auto w-full'>

      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md
          overflow-hidden rounded-full'>
          <img 
          src={currentUser.profilePicture} 
          className='rounded-full w-full h-full border-8 border-gray-300 object-cover'
          alt='user'
          />
        </div>

        <TextInput 
        type='text' 
        id='username'
        placeholder='Username'
        defaultValue={currentUser.username}
        />
        <TextInput 
        type='text' 
        id='email'
        placeholder='Email'
        defaultValue={currentUser.email}
        />
        <TextInput 
        type='password' 
        id='password'
        placeholder='Password'
        
        />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span>Delete Account</span>
        <span>Signout</span>
      </div>

    </div>
  )
}

export default DashProfile