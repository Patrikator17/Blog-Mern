import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { deleteFailure, deleteStart, deleteSuccess, signoutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { Link } from 'react-router-dom'



const DashProfile = () => {

  const {currentUser, error, loading} = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const filePickerRef = useRef()
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [invalidFileTypeAlert, setInvalidFileTypeAlert] = useState(false); // State for alert visibility
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [showModal, setShowModal] = useState(false)

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
    console.log('Uploading img');
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
    console.log('Uploading img end');
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

      if (imageFile) {
        // Wait for the image upload to complete before updating the user profile
        await uploadImage();
      }


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

  const handleDelete = async(e) =>{
    setShowModal(false);
    try{
      dispatch(deleteStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
      {
        method: 'DELETE',
      })
      const data = await res.json()
      if(!res.ok){
        dispatch(deleteFailure(data.message))
      }
      dispatch(deleteSuccess(data))
    }catch(error){
      dispatch(deleteFailure(error.message))
    }
  }

  const handleSignout = async() => {
    try{
      const res = await fetch('api/user/signout', {
        method: 'POST',
      });
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess())
      }
      
    }catch(error){
      console.log(error.message);
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

        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || (imageFileUploadingProgress !== null && imageFileUploadingProgress !== "100")}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>

        {
          currentUser.isAdmin && (

            <Link to='/create-post'>
              <Button
                type='button'
                gradientDuoTone='purpleToPink'
                className='w-full'
              >
                Create a Post
              </Button>
            </Link>

          )

        }
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Signout</span> 
      </div>

      {updateUserSuccess && (
        <Alert color='success' className='mt-4'>
          {updateUserSuccess}
        </Alert>
      )}
      {error && (
        <Alert color='success' className='mt-4'>
          {error}
        </Alert>
      )}

      <Modal 
      show={showModal} 
      onClose={() => setShowModal(false)} 
      popup 
      size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200
            mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-600 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete} >
                Yes I'm sure
              </Button>
              <Button onClick={() => setShowModal(false)}>
                No Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> 

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