import React from 'react'
import './style.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import {useNavigate} from "react-router-dom"
import sampleBlog from '../../assets/images/sampleBlog.png'
function BlogCard({image , title , user_name  , user_image, date , read_time , blogContent , description}) {

  console.log("blogContent in blog card" , blogContent)
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate(
      "/blog_details",{
        state:{
          image : image,
          title : title,
          user_name : user_name,
          user_image : user_image,
          date : date,
          read_time : read_time,
          blogContent : blogContent,
          description : description
        }
      }
    )
  }

  return (
    <Card onClick={onHandleClick} sx={{ maxWidth: 345 , paddingTop : "10%", paddingRight: "17px" , paddingLeft:"17px"}}>
    <CardMedia
      sx={{ height: 200 , borderRadius : "17px"}}
      component = "img"
      src={image}
      onError = { e =>{
        e.target.src =sampleBlog
      }}
    />
    <CardContent sx={{display:"flex" , justifyContent: "space-between" , flexDirection: "column"}}>
      <Typography sx = {{textTransform : "capitalize"}} className='title_text' gutterBottom variant="h6" component="div">
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "flex-start" , marginTop: "50px"}}>
                  <Avatar sx={{height : "55px" , width: "55px"}} src={user_image} />
                  <Box sx={{ ml: 2}}>
                    <Typography variant="subtitle2">{user_name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {date}<span class="dot"></span>{read_time} Read
                    </Typography>
                  </Box>
                </Box>
    </CardContent>
   
  </Card>
  )
}

export default BlogCard
