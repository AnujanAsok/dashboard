import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

// @mui
import {
  Container,
  Stack,
  Typography,
  Card,
  Button,
  FormControl,
  Box,
  Collapse,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { FirstPage } from '../sections/@dashboard/form-pages';
import { supabase } from '../utils/supabase_client';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [customSelected, setCustomSelected] = useState(false);
  const [formData, setFormData] = useState({
    timeline: '',
    holiday: '',
    budget: '',
    comments: '',
    box_type: '',
    personal_message: '',
  });

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const productSection = (
    <Box>
      <Typography variant="h3" sx={{ mb: 5 }}>
        {' '}
        Step 1: Pick Your Products
      </Typography>

      <Typography variant="h4" sx={{ ml: 5 }}>
        Choose Your Items From Our Trending Products
      </Typography>

      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
      </Stack>

      <ProductList products={PRODUCTS} />
      <ProductCartWidget />
    </Box>
  );

  return (
    <>
      <Helmet>
        <title> Start A Campaign </title>
      </Helmet>

      <Collapse in={!customSelected} timeout={500} collapsedSize={800}>
        {productSection}
      </Collapse>

      <Typography variant="h3" sx={{ my: 7 }}>
        Step 2: Create Your Unboxing Experience
      </Typography>
      <Container>
        <FormControl fullWidth>
          <FirstPage setCustomSelected={setCustomSelected} formData={formData} setFormData={setFormData} />
        </FormControl>
      </Container>
    </>
  );
}
