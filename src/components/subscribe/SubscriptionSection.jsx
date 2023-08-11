import React from 'react'
import {Box , Typography} from '@mui/material';
import icon from '../../assets/images/sub_icon.png';
import Subscribe from './Subscribe';
function SubscriptionSection() {
  return (
    <Box 
    sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EFF0F3",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%"

    }}>
        <img style = {{marginBottom:"2%"}} src ={icon} alt = "sub icon" />
        <Typography style ={{fontWeight : "bold"}} sx={{ typography: {md:"h3" , sm: 'h4', xs: 'h6' }}}  >Subscribe For The Latest Updates</Typography>
        <Typography sx={{ typography: {md:"body1" , sm: 'body2', xs: 'body2' } }} >Subscribe to newsletter and never miss the new post every week.</Typography>
        <Subscribe />
    </Box>
  )
}

export default SubscriptionSection
