import * as Yup from "yup";

export const signupSchema = Yup.object({
    user_name : Yup.string().min(2).max(25).required("Please Enter your name"),
    email : Yup.string().email().required("Please Enter your email"),
    password : Yup.string().min(6).required("Please Enter your password"),
    confirmPassword : Yup.string().required().oneOf([Yup.ref("password") , null] , "password must match" )
})

export const LoginSchema = Yup.object({
    email : Yup.string().email().required("Please Enter your email"),
    password : Yup.string().min(6).required("Please Enter your password")
})

export const createBlogSchema = Yup.object({
    blogTitle : Yup.string().required("Please Enter Blog Title"),
    description : Yup.string().required("Please Enter Description"),
    category : Yup.string().required("Please choose Category"),
    read_time : Yup.string().required("please Enter estimated Read Time")

})