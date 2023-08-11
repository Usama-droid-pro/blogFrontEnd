import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Category_card from "./Catetgory_card.jsx";
import useFetch from "../../hooks/useFetch";
import { BaseUrl } from "../../../BaseUrls/index";
import { CircularProgress , Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
const Categories = () => {
  // Sample categories data (replace this with your actual data)
  const [showSlider, setShowSlider] = useState(false);
  const [showLessBtn, setShowLessBtn] = useState(false);

  // Ref for the Slick Slider
  const sliderRef = useRef();

  const [sliderSettings, setSliderSettings] = useState({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: false,
    swipe: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 545,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  let {
    data: categories,
    loading,
    error,
  } = useFetch(BaseUrl + "category/getAllCategories");
  const showAllCategories = () => {
    setShowSlider(true);
    sliderSettings.draggable = true;
    sliderSettings.swipe = true;
    // Slide to the last category when "See All Categories" is clicked
    sliderRef.current.slickGoTo(categories.length - 1);
  };
  const showLess = () => {
    setShowSlider(false);
    sliderRef.current.slickGoTo(0);
    sliderSettings.draggable = false;
    sliderSettings.swipe = false;
  };

  const navigate =useNavigate();
  
  const onClickHandle = (category_id)=>{
    navigate("allBlogPage" , {state : {category_id}})

  }
  return loading ? (
    <Box sx= {{display : 'flex' , justifyContent: "center" , alignItems : "center"}}>
            <CircularProgress color="success" />
            <p>Fetching categories</p>


    </Box>
  ) : error ? (
    <h2>Error</h2>
  ) : (
    <div className="category_section">
      <div className="category_inner">
        <div className="category_section_bar">
          <h4>Browse the category</h4>

          {!showSlider && (
            <div className="see-all-button">
              <div onClick={showAllCategories}>See All Categories</div>
            </div>
          )}
          {showSlider && (
            <div className="show_less_button">
              <div onClick={showLess}>Show less</div>
            </div>
          )}
        </div>

        <div>
          <Slider
            ref={sliderRef}
            {...sliderSettings}
            className="categories-slider"
          >
            {categories &&
              categories.map((category) => (
                <div key={category.id} className="category-item">
                  <Category_card icon={BaseUrl+category.icon} name={category.name} onClickHandle={()=>{onClickHandle(category._id)}}/>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Categories;