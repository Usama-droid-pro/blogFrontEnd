import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { signupSchema } from '../../Validations';
import usePost from '../../hooks/usePost';
import { BaseUrl } from '../../../BaseUrls'
import { CircularProgress } from '@mui/material'
import { Alert } from '@mui/material';
import { useState } from 'react'
import { SettingsApplications } from '@mui/icons-material';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="www.google.com">
                MuhasimInsights.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const initialValues = {
    user_name: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const defaultTheme = createTheme();

export default function SignUpSide() {

    const [alert , setAlert] = useState(true);

    const handleAlertOpen = ()=>{
        setAlert(true);
    }
    const handleAlertClose = ()=>{
        setAlert(false);
    }


    const { data, loading, error, postData } = usePost(BaseUrl + 'user/register');
    console.log(data);
    const navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: async (values, action) => {
            setAlert(true);
            console.log(values);
            let result = await postData({
                user_name: values.user_name,
                email: values.email,
                password: values.password
            });
            console.log(result);

            // action.resetForm();
        }
    })





    console.log(errors)
    const SignInClickHanlde = () => {
        navigate("/login");
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                error={errors.user_name && touched.user_name ? true : false}
                                helperText={errors.user_name && touched.user_name ? errors.user_name : ""}
                                required
                                fullWidth
                                id="user_name"
                                label="User name"
                                name="user_name"
                                autoComplete="user_name"
                                value={values.user_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                margin="normal"
                                error={errors.email && touched.email ? true : false}
                                helperText={errors.email && touched.email ? errors.email : ""}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                margin="normal"
                                error={errors.password && touched.password ? true : false}
                                helperText={errors.password && touched.password ? errors.password : ""}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={errors.confirmPassword && touched.confirmPassword ? true : false}
                                helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                                name="confirmPassword"
                                label="confirmPassword"
                                type="confirmPassword"
                                id="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="confirmPassword"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: "center" , gap: 2, alignItems: "center" }}>
                                    <CircularProgress color="success" />
                                    <p>Please Wait</p>
                                </Box>
                            ) : error && alert ?(
                                <Alert variant="filled" severity="error" onClose={handleAlertClose}>{error.response.data.message}</Alert>
                            ) : data?.statusCode==201   && alert ?(
                                <Alert variant="filled" severity="success" onClose={handleAlertClose}>"Successfull , Your request has been sent to admin , You can login after admin approve your request"</Alert>

                            ) : null}

                            <Grid container>
                                <Grid item>
                                    <Link onClick={SignInClickHanlde}
                                        variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}