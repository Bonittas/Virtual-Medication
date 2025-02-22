import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost, updatePost } from "../actions/admin/postActions";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [editablePostId, setEditablePostId] = useState("");
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center mt-20 mb-6">Latest Updates and Posts</h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-400 rounded-full px-4 py-2 w-full md:w-1/2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <div key={post._id} className="border bg-blue-50 rounded-lg overflow-hidden shadow-md">
              <img
                src={`https://healtlink.onrender.com/${post.image}`}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              {editablePostId !== post._id ? (
                <div className="p-4">
                  <h2 className="text-lg text-gray-500 font-bold mb-2">{post.title}</h2>
                  <p className="mb-2 text-gray-500">{post.body}</p>
                </div>
              ) : (
                <div className="p-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 mb-2 w-full"
                  />
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 mb-2 w-full"
                  ></textarea>
                  <input
                    type="file"
                    onChange={(e) => setEditImage(e.target.files[0])}
                    className="border border-gray-400 rounded-md px-3 py-2 mb-2 w-full"
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
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;