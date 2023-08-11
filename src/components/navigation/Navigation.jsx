import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogDetail from '../../pages/BlogDetailPage/BlogDetail';
import Home from '../../pages/Home/Home';
import AllBlogPage from '../../pages/AllBlogsPage/AllBlogPage';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/singnup/Signup';
 import BlogCreationForm from '../../pages/CreateBlogPage';
 import PrivateRoute from '../../components/PrivateRoute'
function Navigation() {
  return (
    <Routes>
      <Route path="/blog_details" element={<BlogDetail />} />
      <Route path="/" element={<Home />} />
      <Route path="/allBlogPage" element={<AllBlogPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createBlogPage" element={
        <PrivateRoute>
            <BlogCreationForm />
        </PrivateRoute>
      } />


    </Routes>
  )
}

export default Navigation
