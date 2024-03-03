import React, { useEffect, useState } from 'react'
import moment from 'moment'

const AllComments = ({comment}) => {

    const[user, setUser] = useState({})
    console.log(user);

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
            <p className='text-gray-500 mb-2'>{comment.textContent}</p>
        </div>
    </div>
  )
}

export default AllComments