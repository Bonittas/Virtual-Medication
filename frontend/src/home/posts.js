import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost, updatePost } from "../actions/admin/postActions";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Adjust the number of posts per page as needed
  const [editablePostId, setEditablePostId] = useState(""); // Track which post is being edited
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  const handleUpdate = (postId) => {
    const updatedPost = {
      _id: postId,
      title: editTitle,
      body: editBody,
      image: editImage 
    };
    dispatch(updatePost(postId, updatedPost));
    setEditablePostId("");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl text-center mt-20 m-4">Latest updates and Posts</h1>
        <div className="m-4 flex justify-center">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-400 rounded-full px-3 py-2 w-1/2"
          />
        </div>
        <div className="grid grid-cols-3 gap-10 m-6">
          {currentPosts.map((post) => (
            <div key={post._id} className="border bg-blue-50">
              <img
                src={`http://localhost:5001/${post.image}`}
                alt={post.title}
                className="w-full h-56 rounded-y-md"
              />
              {editablePostId !== post._id ? (
                <div className="p-4">
                  <h2 className="text-lg text-gray-500 font-md mb-2">{post.title}</h2>
                  <p className="mb-2 text-gray-500 ">{post.body}</p>
              
                </div>
              ) : (
                <div className="p-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 mb-2"
                  />
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 mb-2"
                  ></textarea>
                  <input
                    type="file" // Change input type to file
                    onChange={(e) => setEditImage(e.target.files[0])} // Handle file change event
                    className="border border-gray-400 rounded-md px-3 py-2 mb-2"
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditablePostId("")}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className="mx-2 px-4 py-2 mb-6 bg-blue-500 text-white rounded">
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
