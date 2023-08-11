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
import {useFormik} from 'formik';
import {Alert} from '@mui/material'
import {LoginSchema} from '../../Validations'
import { CircularProgress } from '@mui/material'
import {useState} from 'react'
import usePost from '../../hooks/usePost';
import {BaseUrl} from '../../../BaseUrls/index'
import Cookies from 'js-cookie';


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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

    let { data, loading, error, postData } = usePost(BaseUrl + 'user/login');
   
    const navigate = useNavigate();
    const onSingnUpClick = () => {
        navigate("/signup")
    }

    const [alert , setAlert] = useState(true);

    const handleAlertOpen = ()=>{
        setAlert(true);
    }
    const handleAlertClose = ()=>{
        setAlert(false);
    }

    const initialValues = {
        email: "",
        password: "",
    }
    
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            setAlert(true);
            console.log(values);
            let result = await postData({
                email: values.email,
                password: values.password
            });
            console.log(result);
        
            // action.resetForm();
        }
    })

    if(data){
        console.log(data);
        Cookies.set('jwt', data.token, { expires: 7 });
        Cookies.set("user_id" , data.result._id);
        Cookies.set("user_name" , data.result.user_name);
        Cookies.set("email" , data.result.email);

        navigate("/createBlogPage");
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
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                                onChange={handleChange}
                                value ={values.email}
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
                                value = {values.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: "center" , gap: 2, alignItems: "center" }}>
                                    <CircularProgress color="success" />
                                    <p>Please Wait</p>
                                </Box>
                            ) : error && alert ?(
                                <Alert variant="filled" severity="error" onClose={handleAlertClose}>{error.response.data.message || "Error Occurred"}</Alert>
                            ) : data?.status=='success'   && alert ?(
                                <Alert variant="filled" severity="success" onClose={handleAlertClose}>"Logged in successfull"</Alert>

                            ) : data?.status=='failed'   && alert ?(
                                <Alert variant="filled" severity="success" onClose={handleAlertClose}>"Email or password is wrong . Or admin have not approved your request yet"</Alert>

                            ): null}

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={onSingnUpClick}
                                        variant="body2">
                                        {"Don't have an account? Sign Up"}
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