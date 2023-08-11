import React from 'react'
import Header from '../../layout/Header/Header'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import {Box} from '@mui/material'
import Footer from '../../layout/Footer/Footer.jsx';
import { useLocation, useParams } from 'react-router-dom';
import sampleBlog from '../../assets/images/sampleBlog.png'

function BlogDetail() {
    const params = useLocation();
    const {title , description , image , user_name , user_image , date , read_time ,blogContent} =params.state;
    console.log(blogContent);
    console.log(title)
    
    return (
        <div>
            <Header />
            <Container sx={{marginBottom : "5%"}}>
                <Typography sx={{ typography: {md:"h3" , sm: 'h5', xs: 'h5' } , textTransform : "capitalize"}} gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{typography: {sm: 'subtitle1', xs: 'subtitle1' }}} gutterBottom>
                    {description}
                </Typography>
                <Grid container spacing={3} alignItems="center">
                <Box sx={{ display: "flex", alignItems: "center", marginLeft:"20px" , marginTop: "30px"}}>
                  <Avatar sx={{height : "55px" , width: "55px"}} src={user_image} />
                  <Box sx={{ ml: 2}}>
                    <Typography variant="subtitle2">{user_name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {"Date here"}<span class="dot"></span>{read_time} Read
                    </Typography>
                  </Box>
                </Box>
                </Grid>
                <img src={image} onError={(e)=>{e.target.src = sampleBlog}} alt="Blog" style={{ width: '100%', marginTop: 16, marginBottom: 24 }} />
                {blogContent.map((content, index) => (
                    <div key={index}>
                        <Typography sx={{ typography: {md:"h4" , sm: 'h5', xs: 'h6' }}} gutterBottom>
                            {content.heading}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {content.content}
                        </Typography>
                    </div>
                ))}
            </Container>
            <Footer />
        </div>
    )
}

export default BlogDetail
