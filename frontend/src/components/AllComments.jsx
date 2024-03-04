import React, { useEffect, useState } from 'react'
import moment from 'moment';
import {FaThumbsUp} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

const AllComments = ({comment, onLike, onEdit}) => {

    const[user, setUser] = useState({})
    console.log(user);
    const { currentUser } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.textContent)

    useEffect(()=>{
        const getUserComments = async()=>{
            try{
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
            }catch(error){
                console.log(error);
            }
        }
        getUserComments();
    },[comment])

    const handleEdit = () => {
        setIsEditing(true)
        setEditedContent(comment.textContent)
    }

    const handleSave = async() => {
        try{
            const res = await fetch(`/api/comment/editComment/${comment._id}`,{
                method : 'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    textContent: editedContent
                })
            })
            if(res.ok){
                setIsEditing(false)
                onEdit(comment, editedContent)
            }
        }catch(error){
            console.log(error);
        }
    }


  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-8 h-8 rounded-full ' src={user.profilePicture} alt={user.username} />
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-sm truncate'>{user ? `@${user.username}` : "Anonymous User"}</span>
                <span className='text-gray-500 text-sm'>
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>

            {isEditing ? (
                <>
                    <Textarea className='mb-2'
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                     />

                     <div className='flex justify-end gap-2 text-xs'>
                        <Button type='button' size='sm' color='failure' onClick={() => setIsEditing(false)} >
                            Cancel
                        </Button>
                        <Button type='button' size='sm' gradientDuoTone='purpleToBlue' onClick={handleSave}>
                            Save Changes
                        </Button>
                     </div>
                </>
            ) : (
                <>
                
            <p className='text-gray-500 mb-2'>{comment.textContent}</p>

            <div className='flex items-center pt-2 text-sm border-t dark:border-gray-700 max-w-fit gap-2'>
                <button 
                className={`text-gray-400 hover:text-blue-500
                    ${currentUser && comment.likes.includes
                        (currentUser._id) && '!text-blue-500'
                    }  
                `}
                type='button'
                onClick={() => onLike(comment._id)}
                >
                    <FaThumbsUp className='text-sm'/>
                </button>
                <p className='text-gray-400'>
                    {
                        comment.likesCount > 0 && 
                        comment.likesCount + " " + (comment.likesCount === 1 ? 'like' : 'likes') 
                    }
                </p>

                {
                    currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) &&(
                        <button type='button' className='text-gray-400 hover:text-blue-500' onClick={handleEdit}> 
                            Edit
                        </button>
                    )
                }
            </div>
                </>
            )}

        </div>
    </div>
  )
}

export default AllComments