import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('could not fetch blogs');
  }
};

const getOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('could not fetch blogs');
  }
};

export default { getAll, getOne };
