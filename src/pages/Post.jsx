import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configs";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata);
    
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        console.log(slug)
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log(post)
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const downloadPost = () => {
        appwriteService.downloadPost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 max-w-5xl mx-auto ">
            <Container>
                {/* Main Card Design */}
                <div className="bg-cover bg-center bg-no-repeat border border-gray-300 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/geometric-dark-message-board-wallpaper-with-copy-space-modern-designs_796268-137.jpg?semt=ais_hybrid')" }}>
                    
                    {/* Header: Image + Buttons */}
                    <div className="flex items-center mb-8 p-8">
    {/* Title Container for Centering */}
    <div className="flex-1 text-center">
        <h1 className="text-4xl text-white font-bold mb-4 pl-20">{post.name}</h1>
        <div className="flex justify-center space-x-4">
            {isAuthor && (
                <>
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500">Edit</Button>
                    </Link>
                    <Button bgColor="bg-blue-500" onClick={downloadPost}>
                        Download
                    </Button>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                        Delete
                    </Button>
                </>
            )}
        </div>
    </div>

    {/* Profile Image Container */}
    <div className="flex-shrink-0">
        <img
            src={appwriteService.getFile(post.featuredImage)}
            alt={post.name}
            className="w-32 h-32 rounded-full object-cover border border-gray-100 shadow-lg"
        />
    </div>
</div>


        
                    {/* About Section */}
                    <div className="mb-8 p-4">
                        <h2 className="text-2xl text-white font-semibold text-amber-200 mb-2">About</h2>
                        <p className="text-gray-600 text-white">{post.about}</p>
                    </div>
        
                    {/* Skills Section */}
                    <div className="mb-8 p-4">
                        <h2 className="text-2xl text-white font-semibold text-amber-200 mb-2">Skills</h2>
                        <ul className="list-none text-white">
                            {post.skills && post.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
        
                    {/* Education Section */}
                    <div className="mb-8 p-4">
                        <h2 className="text-2xl font-semibold text-amber-200 mb-2">Education</h2>
                        <ul className="list-none text-gray-600 text-white">
                            {post.Education && post.Education.map((edu, index) => (
                                <li key={index}>{edu}</li>
                            ))}
                        </ul>
                    </div>
        
                    {/* Contact Information Section */}
                    <div className="mb-8 p-4">
                        <h2 className="text-2xl text-white font-semibold text-amber-200 mb-2">Contact Information</h2>
                        <p className="text-gray-600 text-white">Email: {post.email}</p>
                        <p className="text-gray-600 text-white">Phone: {post.Phone}</p>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
    
     
}
