import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const PageNotFound = () => {
  return (
    <StyledContainer>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Page not found :(
          </Typography>
          <Typography>
            Maybe the page you are looking for has been removed, or you typed in
            the wrong URL
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to="/">
            <Typography>Go to homepage</Typography>
          </Button>
        </CardActions>
      </Card>
    </StyledContainer>
  );
};

export default PageNotFound;
