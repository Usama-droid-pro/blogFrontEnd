import React from 'react'
import './style.css'
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material'
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { BaseUrl } from '../../../BaseUrls';
import { CircularProgress, Box } from '@mui/material'
import sampleBlog from '../../assets/images/sampleBlog.png'
import userSample from '../../assets/images/usersample.png'

function BlogComponent() {
  let {
    data: categories,
    loading,
    error,
  } = useFetch(BaseUrl + "category/getAllCategorAndBlogs");


  const navigate = useNavigate()
  const onClickHandle = (category_id) => {
    console.log("Pressed")
    navigate("allBlogPage", { state: { category_id } })

  }




  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
      <CircularProgress color="success" />
      <p>Fetching blogs</p>

    </Box>
  ) : error ? (
    <h2>Error</h2>
  ) : (
    <>
      <div className='blog_component'>
        {categories.map((category) => (
          category.all_blogs && category.all_blogs.length > 1 && (
            <div key={category._id} className='blog_section'>
              <div className='upper_bar'>
                <div className='category_name_dash'>
                <h3>{category.name}</h3>
                <div className='dash'></div>
                  </div>
                <div style={{fontWeight: "500"}} onClick={() => { onClickHandle(category._id) }}>See All Blogs  <i className="arrow_right"></i></div>
              </div>

              <div className='grid_section'>
                <Grid container spacing={8}>
                  {category.all_blogs.slice(0, 4).map((blog) => (
                    <Grid className="blog_card_grid" item xs={12} sm={6} md={3} key={blog._id}>
                      <BlogCard
                        image={BaseUrl + (blog.image)}
                        title={blog.blogTitle}
                        user_name={blog.user[0]?.user_name || 'Unknown User'}
                        user_image={blog.user[0]?.user_image || userSample}
                        date={blog.createdAt}
                        read_time={blog.read_time}
                        blogContent={blog.blogContent}
                        description={blog.description}
                      />
                      
                    </Grid>


                  ))}
                </Grid>
              </div>

            </div>
          )
        ))}
      </div>
    </>


  )
}

export default BlogComponent
