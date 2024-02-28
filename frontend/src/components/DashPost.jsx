import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const DashPost = () => {

  const{currentUser} = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState({ posts: [] })
  const [showMore, setShowMore] = useState(true)
  
  
  

  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const res = await fetch(`/api/post/get-post?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok){
          setUserPosts(data)
          if(data.posts.length < 9){
            setShowMore(false)
          }
          
        }
      }catch(error){
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      
      fetchPosts()
      
    }
  }, [currentUser._id])

  const handleShowMore = async() => {
    const startIndex = userPosts.posts.length
    try{
      const res = await fetch(`/api/post/get-post?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev) => ({ posts: [...prev.posts, ...data.posts] }));
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    }catch(error){
      console.log(error);
    }
  } 
  

  // console.log(userPosts.posts)
  
  // console.log(userPosts.posts.length)
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.posts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {
              userPosts.posts.map((post, index) => (
                <Table.Body className='divide-y' key={`${post._id}-${index}`}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} >
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-20 h-10 object-cover bg-gray-500' 
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`} >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} className='text-teal-500'>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-500 hover:underline'>Delete</span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            }
          </Table>

          {
            showMore && (
              <button 
              className='w-full text-teal-500 self-center text-sm py-7'
              onClick={handleShowMore}
              >
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  )
}

export default DashPost