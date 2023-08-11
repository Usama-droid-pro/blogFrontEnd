import { useState } from 'react';
import axios from 'axios';

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(url, formData);
      console.log(formData , "is here");
      setData(response.data);
    } catch (err) {
    
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
