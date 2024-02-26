import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase'

const CreatePost = () => {

    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({})
    const [imageUploadingProgress, setImageUploadingProgress] = useState(null)
    const [imageUploadingError, setImageUploadingError] = useState(null)

    const handleUploadImage = () =>{
        try{
            if(!file){
                setImageUploadingError('Please Select an image')
                return
            }
            setImageUploadingError(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = 
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                    setImageUploadingProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadingError('Something went wrong..')
                    setImageUploadingProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadingProgress(null)
                        setImageUploadingError(null)
                        //save url in formData
                        setFormData({...formData, image: downloadURL})
                        
                    })
                }
            )
        }catch(error){
            setImageUploadingError('Image upload failed...')
            setImageUploadingProgress(null)
        }
    }



  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title'
                className='flex-1' />
                <Select>
                    <option value='uncategorized'>Select a category</option>
                    <option value='Javascript'>Javascript</option>
                    <option value='Python'>Python</option>
                    <option value='React'>React</option>
                </Select>
            </div>
                {
                    imageUploadingProgress ? (
                        <div className="flex gap-4 items-center justify-between border-4 border-purple-500 border-dotted p-3">
                            <div>{`Uploading: ${imageUploadingProgress}%`}</div>
                            {/* Optionally add a cancel button or loading spinner */}
                        </div>
                    ) : (
                        <div className="flex gap-4 items-center justify-between border-4 border-purple-500 border-dotted p-3">
                            <FileInput
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <Button
                                type="button"
                                gradientDuoTone="purpleToPink"
                                outline
                                onClick={handleUploadImage}
                                size="sm"
                            >
                                Upload Image
                            </Button>
                        </div>
                    )
                }
                {
                    imageUploadingError &&
                        <Alert color='failure'>
                            {imageUploadingError}
                        </Alert> 
                }
                {formData.image && (
                    <img src={formData.image} className='w-full h-72 object-cover'/>
                )}

            <ReactQuill theme='snow' placeholder='Start typing...' className='h-72 mb-12' required/>
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
  )
}

export default CreatePost