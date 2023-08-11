import React from 'react'
import {Box , TextField} from '@mui/material';
import {useMediaQuery } from '@mui/material';

import DynamicButton from '../DynamicButton/DynamicButton';
function Subscribe() {
    const isSmallScreen = useMediaQuery((theme)=> theme.breakpoints.down('sm'));

  return (
    <div>
        <Box sx={{display : "flex" , flexDirection: "row" , gap : 2.5 , marginTop : "30px"}}>
            { !isSmallScreen ? <TextField label="Enter Email here" placeholder='Enter Email here' variant="outlined" 
        sx={{backgroundColor : 'white' , borderRadius : "10px" , width : "500px"}}/> : 
        <TextField label="Enter Email here" placeholder='Enter Email here' variant="outlined" 
        sx={{backgroundColor : 'white' , borderRadius : "10px"}}/>}
        
        <DynamicButton label="Subscribe" variant="contained" size="20px" sx={{borderRadius : "7px" , backgroundColor: "blue"}} />
        </Box>
      
    </div>
  )
}

export default Subscribe
