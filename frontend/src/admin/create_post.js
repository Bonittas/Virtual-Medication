import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../actions/admin/postActions";
import Navbar from "./navbar";
import Footer from "../home/footer"

const AdminPostForm = ({ postToEdit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(postToEdit ? postToEdit.title : "");
  const [body, setBody] = useState(postToEdit ? postToEdit.body : "");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);

    try {
      if (postToEdit) {
        await dispatch(updatePost(postToEdit._id, formData));
        setSuccessMessage("Post updated successfully.");
        setErrorMessage("");
      } else {
        await dispatch(createPost(formData));
        setSuccessMessage("Post created successfully.");
        setErrorMessage("");
      }

      setTitle("");
      setBody("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage(""); 
      setErrorMessage("Error creating Post");
    }
  };

  return (
    <>      
      <Navbar  />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 my-20">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-6">
          <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{postToEdit ? "Update Post" : "Create Post"}</button>
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
      <div className="bg-blue-950">
    <Footer/>
    </div>
    </>
  );
};

export default AdminPostForm;
