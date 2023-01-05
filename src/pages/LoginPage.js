import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Modal, Box, TextField } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { supabase } from '../utils/supabase_client';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

// ----------------------------------------------------------------------

export default function LoginPage(props) {
  const { setStatus, setOnLogin, status } = props;
  const mdUp = useResponsive('up', 'md');
  const [openModal, setOpenModal] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('log in event tracker ', event);
      setStatus({ ...status, userId: session?.user.id ?? null });
      if (accountInfo.budget) {
        setStatus({ ...status, budget: accountInfo.budget });
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setOnLogin(true);
  }, []);

  const closeModalMenu = () => {
    setOpenModal(false);
  };

  const createAccount = async () => {
    setOpenModal(false);
    const { data } = await supabase.auth.signUp({
      email: accountInfo.email,
      password: accountInfo.password,
      options: {
        data: {
          full_name: accountInfo.full_name,
          phone: accountInfo.phone,
        },
      },
    });
    setStatus({ phone: accountInfo.phone });
  };
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Accent
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" onClick={() => setOpenModal(true)}>
                Get started
              </Link>
            </Typography>

            <Modal open={openModal} onClose={closeModalMenu}>
              <Box sx={modalStyle}>
                <Typography variant="h6">Create an account</Typography>
                <TextField
                  variant="outlined"
                  label="Enter your full name"
                  sx={{ m: 3, width: 500 }}
                  onChange={(e) => setAccountInfo({ ...accountInfo, full_name: e.target.value })}
                />
                <TextField
                  variant="outlined"
                  label="Enter your phone number"
                  sx={{ m: 3, width: 500 }}
                  onChange={(e) => setAccountInfo({ ...accountInfo, phone: e.target.value })}
                />

                <TextField
                  variant="outlined"
                  label="What is your gifting budget?"
                  sx={{ m: 3, width: 500 }}
                  onChange={(e) => setAccountInfo({ ...accountInfo, budget: e.target.value })}
                />
                <TextField
                  variant="outlined"
                  label="Enter your email name"
                  sx={{ m: 3, width: 500 }}
                  onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                />
                <TextField
                  variant="outlined"
                  label="Enter your password"
                  sx={{ m: 3, width: 500 }}
                  onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                />
                <Button variant="contained" onClick={createAccount}>
                  Create Account
                </Button>
              </Box>
            </Modal>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm setOnLogin={setOnLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
