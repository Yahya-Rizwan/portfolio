import React from 'react'
import appwriteService  from "../appwrite/configs"
import {Link} from 'react-router-dom'
function PostCard({$id ,name,featuredImage}) {
  return (
     <Link to={`/post/${$id}`}>
         <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFile(featuredImage)} alt={name}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{name}</h2>
        </div>
     </Link>
  )
}

export default PostCard