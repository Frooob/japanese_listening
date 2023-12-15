import axios from 'axios';
import Translation from '../models/Translation.js';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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

export const fetchChapterTranslations = async (chapterId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/translations?chapter=${chapterId}`);
    return response.data.map(translation => new Translation(translation));
  } catch (error) {
    console.error('Error fetching translations:', error);
    return [];
  }
}

export const randomTranslation = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/random_translation/`);
    const t = new Translation(response.data);
    console.log("Fetched a random translation from apiService")
    console.log(t)
    return t;
  } catch (error) {
    console.error('Error fetching random translation:', error);
    return null;
  }
}

export const randomChapterTranslation = async (chapterId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/random_translation/?chapter=${chapterId}`);
    const t = new Translation(response.data);
    console.log("Fetched a random translation from apiService")
    console.log(t)
    return t;
  } catch (error) {
    console.error('Error fetching random translation:', error);
    return null;
  }
}

export const TranslationPlayer = ({audio_id}) => {
  console.log("TranslationPlayer called with audio_id: " + audio_id)
  return (
  <AudioPlayer
    autoPlay
    src={`${apiBaseUrl}/audio/${audio_id}`}
    onPlay={e => console.log("onPlay")}
    // other props here
  />)
}
