import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'

const OAuth = () => {

    const auth = getAuth(app) // add app coming from firebase

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt : 'select_account'})// to always ask which account to login onClick
        try{
            const resultFromGoogle = await signInWithPopup(auth, provider)
            // console.log(resultFromGoogle);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl : resultFromGoogle.user.photoURL
                }),
            })
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }

        }catch(error){
            console.log(error);
        }
    }

  return (
    <div>
        <Button  outline gradientDuoTone="purpleToPink" className="w-full mt-4 flex items-center justify-center" onClick={handleGoogleClick}>
          <FaGoogle className="mr-2" /> Sign up with Google
        </Button>
    </div>
  )
}

export default OAuth

