// ts-check

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import {AccessTime} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material';
import Translation from '../models/Translation';
import { TranslationPlayer } from '../api/apiService';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2"
                    },
                    style: {
                        fontSize: "16px"
                    }
                }
            ]
        }
    }
})

/**
 * 
 * @param {Translation} translation
 * @returns TranslationCard
 */
const TranslationCard = ({translation}) => {

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(false);
      }
      , [translation]);
    return (
    <Grid xs={12} sm={6} >
        <ThemeProvider theme={theme}>
            <Paper elevation={3}>
                <Box paddingX={1}>

                { visible &&  (
                    <Box sx = {{display: "flex", alignItems:"center"}} justifyContent="center">
                        <IconButton aria-label="delete" onClick={()=>setVisible(false)}>
                        <VisibilityIcon / >
                        </IconButton>
                    </Box>
                )}


                { !visible &&  (
                    <Box sx = {{display: "flex", alignItems:"center"}} justifyContent="center">
                                                <IconButton aria-label="delete" onClick={()=>setVisible(true)}>

                        <VisibilityOffIcon />
                        </IconButton>

                    </Box>
                )}




                    <Box>
                                       <TranslationPlayer audio_id={translation.id}/>
               
                    </Box>

                    { visible &&  (
                        <> 
                                            <Box sx = {{display: "flex", alignItems:"center"}} justifyContent="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Chapter: {translation.chapter}
                    </Typography>
                    </Box>
                                       <Box sx = {{display: "flex", alignItems:"center"}}>
                                       {/* <AccessTime sx={{width: 12.5}}/> */}
                                       <Typography variant="body2" marginLeft={.5} marginTop={.8}>
                                       <b>日本語:</b> {translation.japanese}
                                       </Typography>
                                   </Box>
                                   <Box sx = {{display: "flex", alignItems:"center"}} >
                                   <Typography variant="body2" marginLeft={.5} marginTop={.5} >
                                   <b>English:</b> {translation.english}
                                       </Typography>
                                   </Box>

                        </>
                    )
                    }
                    { !visible &&  (
                        <Box sx = {{display: "flex", alignItems:"center"}} justifyContent="center">
          <Button onClick={()=>setVisible(true)}>Show solution</Button>
        </Box>
                    )}

                </Box>
            </Paper>
        </ThemeProvider>
    </Grid>
    )
}

export default TranslationCard;