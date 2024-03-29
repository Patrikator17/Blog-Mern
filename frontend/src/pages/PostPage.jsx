import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import PostCard from '../components/PostCard'

const PostPage = () => {
    const {slug} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)
    const [recentPost, setRecentPost] = useState(null)

    useEffect(()=> {
        // console.log(slug);
        const fetchPost = async() =>{
            try{
                setLoading(true)
                const res = await fetch(`/api/post/get-post?slug=${slug}`);
                const data = await res.json()
                if(!res.ok){
                    setError(true)
                    setLoading(false)
                    return
                }
                if(res.ok){
                    setPost(data.posts[0])
                    setError(false)
                    setLoading(false)
                }
            }catch(error){
                setError(true)
                setLoading(false)
            }
        }

        fetchPost()
    },[slug])

    useEffect(() => {
        console.log("post._id:", post && post._id);
    }, [post]);


    useEffect(() =>{
        try{
            const fetchRecentPosts = async()=>{
                const res = await fetch(`/api/post/get-post?limit=3`);
                const data = await res.json()
                if(res.ok){
                    setRecentPost(data.posts)
                }
            }
            fetchRecentPosts()
        }catch(error){
            console.log(error);
        }

    },[])

    if(loading) return(
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    )


  return <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>

    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
    </h1>

    <Link to={`/search?category=${post && post.category}`} className='self-center mt5'>
        <Button color='gray' pill size='xs'>
            {post && post.category}
        </Button>
    </Link>

    <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />

    <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl
    text-sm'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length/1000).toFixed(0)} mins read</span>
    </div>

    <div className='p-3 max-w-2xl mx-auto w-full post-content'
    dangerouslySetInnerHTML={{__html: post && post.content}}>

    </div>

    <div>
        {post && <Comments postId={post._id} />}
    </div>

    <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent Articles</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 justify-center'>
                    {recentPost &&
                        recentPost.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
        </div>
    </div>

  </main>
}

export default PostPage