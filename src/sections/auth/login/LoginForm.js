import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { supabase } from '../../../utils/supabase_client';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const { setOnLogin } = props;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailInfo, setEmailInfo] = useState('');
  const [passwordInfo, setPasswordInfo] = useState('');

  const handleClick = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailInfo,
        password: passwordInfo,
      });
      if (error) throw error;
      navigate('/dashboard', { replace: true });
      setOnLogin(false);
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmailInfo(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPasswordInfo(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
