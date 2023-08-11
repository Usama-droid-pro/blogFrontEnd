import React from 'react'
import { Grid , useMediaQuery } from '@mui/material';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';
import './style.css';
export default function Hero() {

    const ismediumScreen = useMediaQuery((theme)=> theme.breakpoints.down('md'));

    let hero_left_class_name ;
    if(!ismediumScreen){
        hero_left_class_name = "hero-left-large-screen"
    }else{
        hero_left_class_name = "hero-left-small-screen"
    }
    
    return (
        <>
            <Grid sx= {{backgroundColor : "#EFF0F3"}} container spacing={2}>
                <Grid  item md={6}>
                    <div className={hero_left_class_name}>
                    <HeroLeft />
                    </div>
                </Grid>
                {
                    !ismediumScreen && (
                          <Grid item md={6}>
                    <div className='hero-right'>
                    <HeroRight />
                    </div>
                </Grid>
                    )
                }
              
            </Grid>
        </>
    )
}
