// ts-check

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import {AccessTime} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material';
import Translation from '../models/Translation';
import { TranslationPlayer } from '../api/apiService';

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
    return (
    <Grid xs={12} sm={6}>
        <ThemeProvider theme={theme}>
            <Paper elevation={3}>
                <Box paddingX={1}>
                    <Typography variant="subtitle1">
                        {translation.chapter}
                    </Typography>
                    <Box sx = {{display: "flex", alignItems:"center"}}>
                        {/* <AccessTime sx={{width: 12.5}}/> */}
                        <Typography variant="body2" marginLeft={.5}>
                            {translation.japanese}
                        </Typography>
                    </Box>
                    <Box>
                    <Typography variant="body2" marginLeft={.5}>
                            {translation.english}
                        </Typography>
                    </Box>
                    <Box>
                        {/* console.log(translation.id) */}
                        <TranslationPlayer audio_id={translation.id}/>

                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>
    </Grid>
    )
}

export default TranslationCard;