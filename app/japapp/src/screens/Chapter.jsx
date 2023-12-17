//@ts-check

import React, { useEffect, useState } from 'react';
import TranslationCard from '../components/TranslationCard';
import { randomChapterTranslation } from '../api/apiService';
import Translation from '../models/Translation';
import Typography from '@mui/material/Typography';
import WordCard from '../components/WordCard';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import { useParams } from 'react-router-dom';

const Chapter = () => {
  // Get a random translation from the api in a sideeffect
  // Save the translation in state
  // Pass the translation to the TranslationCard component

  const [translation, setTranslation] = useState();
  let { chapter } = useParams();


  const loadTranslation = async () => {
    const translationfetched = await randomChapterTranslation(chapter);
    setTranslation(translationfetched);
  };

  useEffect(() => {
    loadTranslation();
  }
  , [chapter]);



  return ( 
    <>
      <Grid container spacing={2}>
        {translation && (
          <Grid item xs={12}>
            <TranslationCard translation={translation} />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button onClick={loadTranslation}>Load new translation</Button>
        </Grid>
      </Grid>
    </>
    )
};

export default Chapter;