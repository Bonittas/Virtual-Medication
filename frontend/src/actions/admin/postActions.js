// postActions.js

import axios from "axios";

export const createPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5001/api/posts", postData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({
      type: "CREATE_POST",
      payload: res.data,
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const updatePost = (postId, postData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postId}`, postData);
    dispatch({
      type: "UPDATE_POST",
      payload: res.data,
    });
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
