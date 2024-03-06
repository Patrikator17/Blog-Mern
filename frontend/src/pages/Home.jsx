import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

import reactLogo from '../assets/Logo/react_logo.png'
import jsLogo from '../assets/Logo/js_logo.png'
import pythonLogo from '../assets/Logo/python_logo.png'; 

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/get-post');
      const data = await res.json();
      setPosts(data.posts.slice(0, 6)); // Limit to the first 6 posts
    };
    fetchPosts();
  }, []);

  return (
    <div>
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
      <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
      <p className='text-gray-500 text-xs sm:text-sm dark:text-gray-200'>
      Welcome to our homepage! Dive into a world of articles and tutorials covering web development
      , offering insights and guidance. Explore the nuances of software engineering
      , designed for both beginners and seasoned professionals. 
      Embark on a journey through various programming languages, 
      empowering you with knowledge to enhance your coding skills.
      </p>
      <Link
      to='/search'
      className='text-xs sm:text-sm text-blue-900 font-bold hover:underline dark:text-gray-100'
      >
        View all posts
      </Link>
    </div>

    <div className='flex item-center justify-center gap-4 mb-18'>

      {/* React Logo */}
      <img src={reactLogo} alt='React Logo' className='w-20 h-20 rounded-full border border-blue-500 p-2 transition-transform transform hover:scale-110' />

      {/* JavaScript Logo */}
      <img src={jsLogo} alt='JavaScript Logo' className='w-20 h-20 rounded-full border border-yellow-500 p-2 transition-transform transform hover:scale-110' />

      {/* Python Logo */}
      <img src={pythonLogo} alt='Python Logo' className='w-20 h-20 rounded-full border border-green-500 p-2 transition-transform transform hover:scale-110' />

    </div>


    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
      {posts && posts.length > 0 && (
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} className='mb-4' />
            ))}
          </div>
          <Link
            to={'/search'}
            className='text-lg text-blue-900 hover:underline text-center dark:text-gray-300'
          >
            View all posts
          </Link>
        </div>
      )}
    </div>
  </div>
  );
};

export default Home;
