import axios from 'axios';

const API_URL = 'https://insta-api-delta.vercel.app/api/posts';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
