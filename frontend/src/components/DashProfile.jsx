import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'



const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const filePickerRef = useRef()
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [invalidFileTypeAlert, setInvalidFileTypeAlert] = useState(false); // State for alert visibility
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)

  console.log(imageFileUploadingProgress, imageFileUploadError);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file){
      const fileType = file.type;
      if (fileType && (fileType.startsWith('image/jpeg') || fileType.startsWith('image/png'))) {
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file))
        setInvalidFileTypeAlert(false);
      }else{
        setInvalidFileTypeAlert(true);
        console.log('Invalid file type. Only image files are allowed.');
      }
    }

  };

  // console.log(imageFile, imageFileUrl);

  useEffect(() => {
    if(imageFile){
      uploadImage()
    }
  },[imageFile])

  const uploadImage = async() =>{
    // console.log('Uploading img');
    const storage = getStorage(app) // from firebas.js
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)


    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageFileUploadingProgress(progress.toFixed(0))// remove decimal
      },
      (error) => {
        setImageFileUploadError('Could not upload the image.')
        setImageFileUrl(currentUser.profilePicture);
         // Reset image URL to previous value if upload fails
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setFormData({...formData, profilePicture: downloadURL})
        })
      },

    )
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
    // console.log(formData);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(Object.keys(formData).length === 0){
      return
    }
    try{
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',

        },
        body: JSON.stringify(formData)
      }
      )
      const data = await res.json()
      if(!res.ok){
        dispatch(updateFailure(data.message));
      }
      dispatch(updateSuccess(data))
      setUpdateUserSuccess('User Profile Updated Successfully...')
    }catch(error){
      dispatch(updateFailure(error.message))
    }

  }


  return (
    <div className='max-w-lg mx-auto w-full'>

      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        <input 
        type="file" 
        accept='image/*' 
        onChange={handleImageChange}
        ref={filePickerRef}
        hidden
        />

        <div className='w-32 h-32 self-center cursor-pointer shadow-md
          overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
          <img 
          src={imageFileUrl || currentUser.profilePicture} 
          className='rounded-full w-full h-full border-8 border-gray-300 object-cover'
          alt='user'
          />
        </div>

        {invalidFileTypeAlert && <Alert color='failure'>Invalid file type. Only image files are allowed.</Alert>}

        
        {imageFileUploadError && (
          <Alert color='failure'>
            {imageFileUploadError}
          </Alert>
        )}
        

        <TextInput 
          type='text' 
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput 
          type='text' 
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput 
          type='password' 
          id='password'
          placeholder='Password'
          onChange={handleChange}
        
        />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span>Delete Account</span>
        <span>Signout</span>
      </div>

      {updateUserSuccess && (
        <Alert color='success' className='mt-4'>
          {updateUserSuccess}
        </Alert>
      )}

    </div>
  )
}

export default DashProfile

//  service firebase.storage {
//       match /b/{bucket}/o {
//         match /{allPaths=**} {
//           allow read;
//           allow write: if
//           request.resource.size < 2 * 1024 * 1024 &&
//           request.resource.contentType.matches('image/.*')
//         }
//       }
//     }