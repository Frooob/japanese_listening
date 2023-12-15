
import React, { useEffect, useState } from 'react';
import TranslationCard from '../components/TranslationCard';
import { randomTranslation } from '../api/apiService';
import Translation from '../models/Translation';
import Typography from '@mui/material/Typography';
import WordCard from '../components/WordCard';


const Home = () => {
  // Get a random translation from the api in a sideeffect
  // Save the translation in state
  // Pass the translation to the TranslationCard component

  const [translation, setTranslation] = useState();
  useEffect(() => {
    const loadTranslation = async () => {
      const translationfetched = await randomTranslation();
      // console.log(translationfetched);
      setTranslation(translationfetched);
      // console.log(translation)
    };

    loadTranslation();
  }
  , []);



  return ( 
    <>
      {/* <WordCard word={"hallo"} /> */}
      {/* <Typography variant="h1">Home</Typography> */}
      {translation && <TranslationCard translation={translation}/>}
    </>
    )
};

export default Home;