import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date } = props;

    return (
        <div>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',          
                        sm: 'repeat(2, 1fr)', 
                        md: 'repeat(4, 1fr)'  
                    },
                    gap: 2,
                    mt: 4
                }}
            >
                <Card sx={{ minWidth: 350 }}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={imageUrl}
                        title=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                            By {author} on {new Date(date).toUTCString()}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <a rel='noreferrer' href={newsUrl} target='_blank'>Read more</a>
                    </CardActions>
                </Card>
            </Box>
        </div>
    )

}
export default NewsItem
