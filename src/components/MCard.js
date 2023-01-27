import { Card, CardActionArea, Box, Paper, CardContent, Typography, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite"


export default function MCard({ item }) {
  return (
    <Card className='card' sx={{ width: 200 }}>
        <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
            <Box 
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              sx={[
                {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "300px"
                },
              ]} 
            > 
               <Paper sx={{ backgroundColor: "rgba(247, 233, 240, 0.8)" }}>
                  <CardContent>
                      <Box 
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        sx={[
                            { maxHeight: "30%",
                            overflow: "hidden",
                            color: "rgba(85, 18, 179, 1)"
                         },
                        ]}
                      >
                         <Typography gutterBottom variant='body1' component="div">
                            {`${item.original_title}`}
                         </Typography>


                         <Stack>
                             <Box
                               display="flex"
                               flexDirection="column"
                               justifyContent="center"
                               mr={3}
                             >
                                <RecommendIcon
                                  className='recommend-icon'
                                  fontSize='small'
                                />
                                <Typography variant='subtitle2' ml={1}>
                                    {`${item.vote_average}`}
                                </Typography>
                             </Box>
                             <Box 
                               display="flex"
                               flexDirection="row"
                               justifyContent="center"
                             >
                                <FavoriteIcon className='favorite_icon' fontSize='small'/>
                                <Typography>
                                    {`${item.vote_count}`}
                                </Typography>
                             </Box>
                         </Stack>
                      </Box>
                  </CardContent>
               </Paper>
            </Box>
        </CardActionArea>
    </Card>
  );
}

