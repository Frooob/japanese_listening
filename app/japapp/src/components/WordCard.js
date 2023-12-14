import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import {AccessTime} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material';


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

const WordCard = ({word}) => {
    return (
    <Grid xs={12} sm={6}>
        <ThemeProvider theme={theme}>
            <Paper elevation={3}>
                <Box paddingX={1}>
                    <Typography variant="subtitle1">
                        {word}
                    </Typography>
                    <Box sx = {
                        {display: "flex",
                        alignItems:"center"}}
                    >
                        <AccessTime sx={{width: 12.5}}/>
                        <Typography variant="body2" marginLeft={.5}>
                            Meaning
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>
    </Grid>
    )
}

export default WordCard;