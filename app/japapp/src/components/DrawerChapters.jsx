//@ts-check

// ChaptersComponent.js

import React, { useEffect, useState } from 'react';
import { fetchChapters } from '../api/apiService';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';

const ChaptersComponent = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadChapters = async () => {
      const chapterNames = await fetchChapters();
      setChapters(chapterNames.sort());
    };
    console.log(chapters);

    loadChapters();
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <>
    {chapters.map((chapter) => (
        <Link to={`/chapter/${chapter}`} style={{ textDecoration: 'none', color: 'black' }} key={chapter}>
            <ListItemButton>
            <ListItemText primary={chapter} primaryTypographyProps={{fontSize: '13px'}} sx={{ pl: 2 }} />
            </ListItemButton>
        </Link>
        ))}
    </>
  );
};

export default ChaptersComponent;
