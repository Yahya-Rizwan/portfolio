import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input } from ".."; // Adjust based on your imports
import appwriteService from "../../appwrite/configs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            name: post?.name || "",
            about: post?.about || "",
            email: post?.email || "",
            Phone: post?.Phone || "", 
            skills: post?.skills || [""],
            Education: post?.Education || [""], // Keeping "Education" uppercase
        },
    });

    const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: "skills",
    });

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "Education", // Keeping "Education" uppercase
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata);

    const submit = async (data) => {
        console.log(data.Education); // Consistent use of "Education"
        const slug = data.name
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");

        data.slug = slug;

        if (data.Phone) {
            data.Phone = data.Phone.trim(); // Just trim whitespace
        }

        // Upload file logic and database interaction
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`); // Updated navigation path for portfolio
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`); // Updated navigation path for portfolio
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create or Update Portfolio</h2>
            <div className="flex justify-between items-start">
                <div className="w-3/4 flex flex-col space-y-4">
                    <div className="flex items-center">
                        <label className="w-1/4 text-gray-600">Name:</label>
                        <Input
                            placeholder="Enter your name"
                            className="flex-1 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/4 text-gray-600">About:</label>
                        <Input
                            placeholder="About"
                            as="textarea"
                            className="flex-1 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("about", { required: true })}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/4 text-gray-600">Email:</label>
                        <Input
                            placeholder="Email"
                            className="flex-1 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/4 text-gray-600">Phone:</label>
                        <Input
                            placeholder="Phone"
                            type="tel"
                            className="flex-1 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("Phone", { required: true })} 
                        />
                    </div>

                    {/* Skills Section */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-600">Skills:</label>
                            <Button type="button" onClick={() => appendSkill("")} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                Add Skill
                            </Button>
                        </div>
                        {skillsFields.map((item, index) => (
                            <div key={item.id} className="flex items-center mb-2">
                                <Input
                                    placeholder="Skill"
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register(`skills.${index}`, { required: true })}
                                />
                                <Button type="button" onClick={() => removeSkill(index)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 transition">
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Education Section */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-600">Education:</label>
                            <Button type="button" onClick={() => appendEducation("")} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                Add Education
                            </Button>
                        </div>
                        {educationFields.map((item, index) => (
                            <div key={item.id} className="flex items-center mb-2">
                                <Input
                                    placeholder="Education"
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register(`Education.${index}`, { required: true })} // Keeping "Education" uppercase
                                />
                                <Button type="button" onClick={() => removeEducation(index)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 transition">
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/4 flex flex-col items-end">
                    <label className="mb-2 text-gray-600">Featured Image:</label>
                    <Input
                        type="file"
                        className="mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFile(post.featuredImage)}
                                alt={post.name}
                                className="rounded-lg w-32 h-32 object-cover border border-gray-300"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full mt-4">
                <Button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
