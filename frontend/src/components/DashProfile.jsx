import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { app } from '../firebase'


const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const filePickerRef = useRef()
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [invalidFileTypeAlert, setInvalidFileTypeAlert] = useState(false); // State for alert visibility

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
        })
      }

    )
  }


  return (
    <div className='max-w-lg mx-auto w-full'>

      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4'>

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