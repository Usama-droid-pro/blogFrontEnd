import React, { useState } from 'react';
import { Button, IconButton, TextField, Typography, MenuItem, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { BaseUrl } from '../../../BaseUrls';
import useFetch from '../../hooks/useFetch';
import { CircularProgress } from '@mui/material'
import { useFormik, FieldArray } from 'formik';
import usePost from '../../hooks/usePost';
import { createBlogSchema } from '../../Validations'
import Cookies from 'js-cookie';
import { Alert } from '@mui/material'




const BlogContentForm = () => {

  const user_id = Cookies.get("user_id");
  const [alert, setAlert] = useState(true);

  const { data: categories, loading, error } = useFetch(BaseUrl + "category/getAllCategories")
  let { data, loading: blogPostLoading, error: blogPostError, postData } = usePost(BaseUrl + 'blog/addBlog');
  const { data: imageData, loading: imageloading, error: ImageError, postData: imagePostData } = usePost(BaseUrl + "imageUpload/imageUpload");
  console.log(imageData);



  const handleImageUpload = () => {
    console.log("image upload started")
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("file_type", "image")
    console.log(formData);
    imagePostData(formData);
  }


  const initialValues = {
    blogTitle: "",
    description: "",
    category: "",
    user: user_id,
    read_time: "",
    image: "",
    sections: [{ type: '', heading: '', content: '' }]

  }


  const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues,
    validationSchema: createBlogSchema,
    onSubmit: async (values, action) => {
      setAlert(true);
      let obj = {
        blogTitle : values.blogTitle,
        description : values.description,
        category : values.category,
        user: values.user,
        read_time : values.read_time,
        image : values.image,
        blogContent : values.sections
      }
      console.log("values are", obj);
      console.log(errors);

      postData(obj)

      // action.resetForm();
    }
  })

  if (imageData) {
    if (values) {
      values.image = imageData.image_url;
    }
  }


  const handleAddSection = () => {
    const newField = { type: '', heading: '', content: '' };
    setFieldValue('sections', [...values.sections, newField]);
  };

  const handleRemoveSection = (index) => {
    console.log(index)
    const updatedSections = [...values.sections];
    updatedSections.splice(index, 1);
    setFieldValue('sections', [...updatedSections]);
  };

  console.log(values.sections)



  const handleAlertOpen = () => {
    setAlert(true);
  }
  const handleAlertClose = () => {
    setAlert(false);
  }

 console.log(data)
 console.log(data?.status)

  return (
    <Box>
      <Typography style={{ fontWeight: "bold" }} sx={{ typography: { md: "h4", sm: 'h6', xs: 'h6' }, marginBottom: "2%" }} >Create Blog:</Typography>
      <Box component="form" onSubmit={handleSubmit}
        sx={{ marginBottom: "30px", display: "flex", flexDirection: 'column', gap: 3 }}>
        <TextField
          label="BlogTitle"
          name="blogTitle"
          error={errors.blogTitle && touched.blogTitle ? true : false}
          helperText={errors.blogTitle && touched.blogTitle ? errors.blogTitle : ""}
          value={values.blogTitle}
          onChange={handleChange}
          fullWidth={true}
        ></TextField>

        <TextField
          label="Description"
          fullWidth={true}
          error={errors.description && touched.description ? true : false}
          helperText={errors.description && touched.description ? errors.description : ""}
          name="description"
          value={values.description}
          onChange={handleChange}

        ></TextField>

        <TextField
          label="Choose category"
          select
          error={errors.category && touched.category ? true : false}
          helperText={errors.category && touched.category ? errors.category : ""}
          fullWidth={true}
          name="category"
          values={values.category}
          onChange={handleChange}
        >
          {loading ? (
            <CircularProgress color="success" />
          ) : error ? (
            <h4>Error in fetching categories</h4>
          ) :
            categories?.map((category) => (
              <MenuItem key={category?._id} value={category?._id}>{category?.name}</MenuItem>
            ))}
        </TextField>

        <TextField
          label="Read Time"
          fullWidth={true}
          name="read_time"
          placeholder='eg : 45 min'
          error={errors.read_time && touched.read_time ? true : false}
          helperText={errors.read_time && touched.read_time ? errors.read_time : ""}
          values={values.read_time}
          onChange={handleChange}
        ></TextField>

        <Box>
          <TextField
            type="file"
            fullWidth={true}
            name="image"
            values={values.image}
            onChange={(event) => {
              setFieldValue("image", event.target.files[0]);

            }}
          ></TextField>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleImageUpload}
            name='image-upload'
            sx={{ maxwidth: "15%" }}
          >
            Upload image
          </Button>
          {imageloading ? (
            <CircularProgress color="success" />
          ) : ImageError ? (
            <h4>Error while uploading</h4>
          ) : imageData ? (
            <h4 style={{ color: 'green' }}>Image uploaded</h4>
          ) : null}

        </Box>
        <Typography style={{ fontWeight: "bold" }} sx={{ typography: { md: "h5", sm: 'h5', xs: 'h6' }, marginBottom: "2%" }} >Add blog content:</Typography>


        <FieldArray
          name="sections"
          validateOnChange={false}
          render={({ insert, remove }) => (
            <Box sx={{ marginBottom: '16px' }}>
              {values.sections.map((section, index) => (
                <div key={index}>
                  {index >= 1 && (
                    <IconButton
                      aria-label="remove-section"
                      onClick={() => { handleRemoveSection(index) }}
                      sx={{ marginTop: '16px' }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                  <TextField
                    label="Heading"
                    type="text"
                    value={section.heading}
                    onChange={(e) => {
                      const newSections = [...values.sections];
                      newSections[index].heading = e.target.value;
                      setFieldValue('sections', newSections);
                    }}
                    fullWidth
                    sx={{ marginTop: '8px' }}
                  />
                  <TextField
                    select
                    label="Type"
                    name="type"
                    value={section.type}
                    onChange={(e) => {
                      const newSections = [...values.sections];
                      newSections[index].type = e.target.value;
                      setFieldValue('sections', newSections);
                    }}
                    fullWidth
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="code">Code</MenuItem>
                  </TextField>

                  <TextField
                    label="Content"
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...values.sections];
                      newSections[index].content = e.target.value;
                      setFieldValue('sections', newSections);
                    }}
                    multiline
                    fullWidth
                    rows={4}
                    sx={{ marginTop: '8px' }}
                  />

                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddSection}
                sx={{ marginTop: '16px' }}
              >
                Add Section
              </Button>
              {blogPostLoading ? (
                <CircularProgress color="success" />

              ) : blogPostError && alert ? (
                <Alert sx= {{marginTop : "10px"}} variant="filled" severity="error" onClose={handleAlertClose}>{blogPostError.response.data.message}</Alert>

              ) : data?.status == true  && alert ? (
                <Alert  sx= {{marginTop : "10px"}} variant="filled" severity="success" onClose={handleAlertClose}>{data?.message}</Alert>

              ) : data?.status == false  && alert ? (
                <Alert  sx= {{marginTop : "10px"}} variant="filled" severity="error" onClose={handleAlertClose}>{data?.message}</Alert>

              ): null}
            </Box>
          )}
        />


        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="small"
          sx={{ marginTop: '16px', width: '150px', height: '40px', alignSelf: 'center' }}
        >
          Create blog
        </Button>

      </Box>

    </Box>
  );
};

export default BlogContentForm;
