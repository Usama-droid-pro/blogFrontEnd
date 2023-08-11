import React, { useState } from 'react';
import BlogCard from '../../components/BlogsSection/BlogCard';
import { Pagination , Grid , Typography , Box , useMediaQuery , CircularProgress} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BaseUrl } from '../../../BaseUrls';
import usersample from '../../assets/images/usersample.png'
import useFetch from '../../hooks/useFetch';

// Sample blog data (you can replace this with your actual data)
// const blogData = [
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   {
//     id: 1,
//     image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
//     title: 'Blog Title 1',
//     user_name: 'John Doe',
//     user_image: 'url-to-user-image-1',
//     date: '2023-07-23',
//     read_time: '5 min',
//   },
//   // Add more blog entries here
// ];

const itemsPerPage = 10;


function AllBlogPage() {

  const params = useLocation();
  const {category_id} = params.state;

  console.log(category_id);
  const {data , loading , error} = useFetch(BaseUrl+'category/getCategoryAndBlogs?category_id=' + category_id);
  let categoryData =data[0];
  console.log("error" , error);
  console.log("Its data" ,categoryData);

  const ismediumScreen = useMediaQuery((theme)=> theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery((theme)=> theme.breakpoints.down('sm'));

  let paddingRight=20;
  let paddingLeft=20;

  if(ismediumScreen){
      paddingRight = 10;
      paddingLeft = 10;
  }
  if(isSmallScreen){
    paddingRight = 0;
    paddingLeft = 0;
  }

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBlogs = categoryData?.all_blogs?.slice(startIndex, endIndex) || [];


  return loading? (
    <Box sx= {{display : 'flex' , justifyContent: "center" , alignItems : "center"}}>
            <CircularProgress color="success" />

    </Box>
  ) : error ? (
    <h2>error</h2>
  ) : 
 (
  <>
  <div style={{ padding: '20px' }}>
    {/* Render Grid layout for BlogCard components */}
    <Box sx= {{display: "flex" , flexDirection : "column" , justifyContent: "center" , alignItems : "center" , marginBottom: "3%" , marginTop : "3%"}}>
      <img style = {{maxWidth : "50px"}} src = {BaseUrl+categoryData?.icon} alt = "category_image" />
    <Typography variant="h4" gutterBottom>
        {categoryData?.name}
      </Typography>
    </Box>
    

    <Grid container spacing={4} paddingRight={paddingRight} paddingLeft={paddingLeft}>
      {paginatedBlogs?.map((blog, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={12/5} key={index}>
             <BlogCard
                    image={BaseUrl+blog?.image}
                    title={blog?.blogTitle}
                    user_name={blog.user[0]?.user_name || 'Unknown User'}
                    user_image={blog.user[0]?.user_image || usersample}
                    date={blog.createdAt}
                    read_time={blog.read_time}
                    blogContent = {blog.blogContent}
                    description = {blog.description}
                  />
        </Grid>
      ))}
    </Grid>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
          <Pagination
            count={Math.ceil(categoryData?.all_blogs?.length / itemsPerPage)}
            color="primary"
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
  </div>
  </>
    
  );
}

export default AllBlogPage;
