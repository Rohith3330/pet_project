import axios from 'axios';

export const fetchUsers = async () => {
    const response = await axios.get(`http://localhost:4000/Users`);
    return {
      data: response.data
    };
  };
  
  export const fetchevents = async () => {
    const response = await axios.get(`http://localhost:4000/Events`);
    return {
      data: response.data
    };
  };