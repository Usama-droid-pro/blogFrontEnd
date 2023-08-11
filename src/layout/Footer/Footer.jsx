import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, TextField, Button, IconButton, Typography } from '@mui/material';
import { Email, Facebook, Twitter, LinkedIn, Phone, Home } from '@mui/icons-material';
import Subscribe from '../../components/subscribe/Subscribe';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E4E5E9",
    color: "black",
    padding: theme.spacing(4),
    minHeight: '400px', // Increase the height to make the footer taller
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Vertically align content
  },
  logo: {
    width: 100,
    height: 100,
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
  },
  subscribeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  subscribeInput: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  sectionHeading: {
    marginBottom: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
          <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    >
                        <span style={{ color: '#001858' }}>Muhasim</span><span style={{ color: 'blue', fontSize: '14px' }}>.insights</span>

                    </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Social Links */}
            <Typography variant="h6" className={classes.sectionHeading}>
              Social Links
            </Typography>
            <div className={classes.categoryItem}>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <Typography>Facebook</Typography>
            </div>
            <div className={classes.categoryItem}>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <Typography>Twitter</Typography>
            </div>
            <div className={classes.categoryItem}>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
              <Typography>LinkedIn</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Categories Column */}
            <Typography variant="h6" className={classes.sectionHeading}>
              Categories
            </Typography>
            <div>
              <div className={classes.categoryItem}>
                <Home />
                <Typography>Projects</Typography>
              </div>
              {/* Add more categories here */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* About Us Column */}
            <Typography variant="h6" className={classes.sectionHeading}>
              About Us
            </Typography>
            <div>
              <div className={classes.categoryItem}>
                <LinkedIn />
                <Typography>LinkedIn</Typography>
              </div>
              {/* Add more about us links here */}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* Contact Us Links */}
            <Typography variant="h6" className={classes.sectionHeading}>
              Contact Us
            </Typography>
            <div className={classes.contactItem}>
              <Phone />
              <Typography>+1234567890</Typography>
            </div>
            <div className={classes.contactItem}>
              <Email />
              <Typography>contact@example.com</Typography>
            </div>
          </Grid>
      
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
