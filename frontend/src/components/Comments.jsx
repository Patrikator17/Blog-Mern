import { Button, TextInput, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AllComments from './AllComments';

const Comments = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [displayComments, setDisplayComments] = useState([])
    console.log(displayComments);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        console.log("postId:", postId);
        const res = await fetch(`/api/comment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ textContent: comment, postId, userId: currentUser._id })
        });
        const data = await res.json();
        if (res.ok) {
            setComment('');
            setDisplayComments([data, ...displayComments])
        }
    };

    useEffect(() => {
        const getComments = async() =>{
            try{
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok){
                    const data = await res.json()
                    setDisplayComments(data)
                }
            }catch(error){
                console.log(error);
                
            }
        }
        getComments()
    },[postId])

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/login');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setDisplayComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === commentId
                            ? {
                                  ...comment,
                                  likes: data.likes,
                                  likesCount: data.likesCount,
                              }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };


  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {
            currentUser ?
            (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Logged in as : </p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username}
                </Link>
            </div>
            ) : (
                <div>
                    You must be logged in to comment...
                    <Link  className='text-blue-500 hover:underline' to={'/login'}>
                        Login
                    </Link>
                </div>
            )
            
        }
        {
            currentUser && (
                <form action="" className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                    <p className='text-gray-500 text-xs'>
                        {200 - comment.length} characters remaining
                    </p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        Submit
                    </Button>
                    </div>
                </form>
                
            )
        }
        {
            displayComments.length === 0 ? (
                <p className='text-sm my-5'>No Comments yet</p>
            ) : (
                <>
                <div className='text-sm my-5 flex items-center gap-1'>
                    <p>Comments</p>
                    <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                        <p>{displayComments.length}</p>

                    </div>
                </div>
                {
                    displayComments.map(comment => (
                        <AllComments key={comment._id}
                        comment={comment}
                        onLike={handleLike}/>
                    ))
                }
                </>
            )
        }
    </div>
  )
}

export default Comments