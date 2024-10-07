import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/configs";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/postSlice";

function Home() {
  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch ();

  const everyPost = useSelector((state)=>state.allPosts)
  useEffect(() => {
      appwriteService.getPosts().then((newPosts) => { 
        if (newPosts) {
          if(newPosts.documents.length!=everyPost.length){
            dispatch(addPost(newPosts.documents));
          }
        }
      });

  }, []);
  if (everyPost.length==0) {
    return (
      <div className="w-full py-8 mt-4 text-center min-h-screen bg-no-repeat bg-cover bg-center bg-[url('https://www.ilovefreesoftware.com/wp-content/uploads/2019/05/make_digital_portfolio_online-Featured.png')]">
        <Container>
          <div className="flex flex-wrap min-h-screen ">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  else{
  return (
    <div className="w-full py-8 mt-4 text-center min-h-screen bg-no-repeat bg-cover bg-center bg-[url('https://img.freepik.com/free-vector/dark-blue-memphis-blog-banner-template_53876-98946.jpg')]">
      <Container>
        <h1 className="text-white">All Portfolios</h1>
        <div className="flex flex-wrap">
          {
          everyPost && everyPost.length >0?  (everyPost.map((post) => (

            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))) : (<div className="p-2 w-full font-semibold text-xl">
          <p>Currently no post available</p>
        </div>)
          }
        </div>
      </Container>
    </div>
  );}
}

export default Home;