import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UpdatePost = () => {

    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        category: 'uncategorized',
        image: '', // You may set a default value if needed
        content: '',
        _id:'',
    });
    const [imageUploadingProgress, setImageUploadingProgress] = useState(null)
    const [imageUploadingError, setImageUploadingError] = useState(null)
    const [publishError, setPublishError] = useState(null)
    const navigate = useNavigate()
    const { postId } = useParams();
    const {currentUser} = useSelector((state) => state.user);


    useEffect(() => {
        // Log formData whenever it changes
        console.log('formData:', formData);
    }, [formData]);

    useEffect(() => {
        // Fetch the post data using postId
        const fetchPostData = async () => {
            try {
                const res = await fetch(`/api/post/get-post?postId=${postId}`);
                const data = await res.json();

                if (res.ok && data.posts.length > 0) {
                    const post = data.posts[0]; // Assuming you get only one post
                    setFormData({
                        title: post.title,
                        category: post.category,
                        image: post.image,
                        content: post.content,
                        _id: post._id,
                    });
                } else {
                    console.log(data.error);
                }
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        // Call the function to fetch post data
        fetchPostData();
    }, [postId]);

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

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const res = await fetch(`/api/post/update-post/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if(!res.ok){
                setPublishError(data.message)
                return
            }
            
            if(res.ok){
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        }catch(error){
            setPublishError('Something went wrong...')
        }
    }

    console.log('formData:', formData);
    console.log('currentUser:', currentUser);
    console.log('postId:', postId);


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                type='text' 
                placeholder='Title' 
                required 
                id='title'
                className='flex-1' 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                value={formData.title}
                />

                <Select  onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
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

            <ReactQuill 
            theme='snow' 
            placeholder='Start typing...' 
            className='h-72 mb-12' 
            required
            onChange={(value) => setFormData({...formData, content: value})}
            value={formData.content}
            // value={formData.title}
            />

            <Button 
            type='submit' 
            gradientDuoTone='purpleToPink'
            >
                Update Post
            </Button>
            {publishError && (
                <Alert color='failure'>
                    {publishError}
                </Alert>
            )}
        </form>
    </div>
  )
}

export default UpdatePost