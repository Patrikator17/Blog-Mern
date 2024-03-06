import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className='group relative border border-blue-900 hover:border-2 transition-all rounded-lg overflow-hidden max-h-[400px]
    dark:border-gray-300'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.slug}
          className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-3'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='text-sm italic category'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-blue-900
           text-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300 text-center 
           py-2 rounded-md !rounded-tl-none m-2 dark:text-white'
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
