import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { LockOutlined as LoginIcon } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/userContext';

const StyledContainer = styled(({ noOverlay, ...rest }) => <div {...rest} />)(
  ({ theme, noOverlay }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',

    '&::before': {
      content: `' '`,
      position: 'fixed',
      display: 'block',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundImage: `url('${process.env.PUBLIC_URL}/images/login-background-01.jpg')`,
      zIndex: -200,
    },

    '&::after': {
      content: `' '`,
      position: 'fixed',
      display: 'block',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.primary.main,
      opacity: noOverlay ? 0 : 0.9,
      zIndex: -199,
      transition: 'opacity linear 1500ms',
    },
  }),
);

const StyledLoginAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledFormWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(6, 3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButtonWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(1),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const StyledLoading = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -8,
  marginLeft: -12,
});

const Login = () => {
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [isLoginFailed, setLoginFailed] = useState(false);

  // TODO: REMOVE MOCKUP
  const [formEmail, setFormEmail] = useState('user@example.com');
  const [formPassword, setFormPassword] = useState('password');

  const { loginSuccess } = useUser();

  const handleSubmit = event => {
    event.preventDefault();

    // TODO: REMOVE MOCKUP
    if (formEmail === 'user@example.com' && formPassword === 'password') {
      setLoggingIn(true);
      setTimeout(() => {
        loginSuccess();
        toast('Welcome!!!');
      }, 1000);
    } else {
      setLoggingIn(true);
      setTimeout(() => {
        setLoginFailed(true);
        setLoggingIn(false);
      }, 1000);
    }
  };

  return (
    <StyledContainer noOverlay={isLoggingIn}>
      <Grid
        container
        justify="center"
        alignItems="center"
        xs={12}
        sm={8}
        md={5}
      >
        <Card>
          <CardContent>
            <StyledFormWrapper>
              <StyledLoginAvatar>
                <LoginIcon />
              </StyledLoginAvatar>
              <Typography variant="h3">Log in</Typography>
              <StyledForm noValidate onSubmit={handleSubmit}>
                <TextField
                  error={isLoginFailed}
                  variant="outlined"
                  margin="normal"
                  // required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  defaultValue="user@example.com"
                  onChange={event => setFormEmail(event.target.value)}
                />
                <TextField
                  error={isLoginFailed}
                  variant="outlined"
                  margin="normal"
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  defaultValue="password"
                  onChange={event => setFormPassword(event.target.value)}
                />
                <StyledButtonWrapper>
                  <StyledSubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoggingIn}
                  >
                    <Typography>Log In</Typography>
                  </StyledSubmitButton>
                  {isLoggingIn && <StyledLoading size={24} />}
                </StyledButtonWrapper>
              </StyledForm>
            </StyledFormWrapper>
          </CardContent>
        </Card>
      </Grid>
    </StyledContainer>
  );
};

export default Login;
