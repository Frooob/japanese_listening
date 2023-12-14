import axios from 'axios';

const apiBaseUrl = 'http://localhost:8000'; // Replace with your API base URL

export const fetchChapters = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/chapters`);
    return response.data; // Assuming the server returns the list of chapters
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return []; // Return an empty array in case of error
  }
};
