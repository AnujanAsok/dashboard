import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { supabase } from '../utils/supabase_client';

export default function SettingPage() {
  const test = 'hello';

  return (
    <Container>
      <Typography variant="h4">Hello There</Typography>
    </Container>
  );
}
