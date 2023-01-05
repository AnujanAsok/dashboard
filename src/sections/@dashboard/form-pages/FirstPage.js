import { faker } from '@faker-js/faker';
import {
  Container,
  Card,
  Stack,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Typography,
  FormControlLabel,
  Switch,
  Box,
  RadioGroup,
  Radio,
} from '@mui/material';
import { useState } from 'react';
import { fDate } from '../../../utils/formatTime';
import { supabase } from '../../../utils/supabase_client';

const holidayList = [
  'Diwali',
  'Welcome Gift',
  'Eid/Ramadan',
  'Employee Appreciation',
  'Hispanic Heritage Month',
  'Lunar New Year',
];

const FirstPage = (props) => {
  const { setCustomSelected, formData, setFormData, status, setFormSubmitted } = props;
  const [showBox, setShowBox] = useState(false);
  const [showCard, setShowCard] = useState(false);

  console.log('formdata ', formData);

  const createCampaign = async () => {
    const { data, error } = await supabase.from('campaigns').insert([
      {
        name: formData.holiday,
        date: fDate(faker.date.future()),
        campaign_budget: formData.campaignBudget,
        total_spend: faker.random.numeric(4),
        engagement_rate: faker.random.numeric(2),
        client_id: status.userId,
      },
    ]);
  };

  const handleClick = async () => {
    const { data, error } = await supabase.from('unboxing_experience').insert([
      {
        timeline: formData.timeline,
        holiday: formData.holiday,
        budget_range: formData.campaignBudget,
        additional_comments: formData.comments,
        box_type: formData.box_type,
        personal_message: formData.personal_message,
        client_id: status.userId,
      },
    ]);
    createCampaign();
    setFormSubmitted(true);
    setShowCard(false);
    setFormData({});
  };

  return (
    <>
      <Card>
        <Typography variant="h6" sx={{ m: 2 }}>
          Tell us more about your gifting needs
        </Typography>
        <Stack justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            label="What is your timeline?"
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            sx={{ m: 5, width: 700 }}
          />
          <Autocomplete
            disablePortal
            id="holiday-list"
            options={holidayList}
            sx={{ width: 700 }}
            onChange={(e, value) => setFormData({ ...formData, holiday: value })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="What holiday are you looking to celebrate?"
                onChange={(e) => setFormData({ ...formData, holiday: e.target.value })}
              />
            )}
          />

          <TextField
            variant="outlined"
            label="Enter your budget range"
            onChange={(e) => setFormData({ ...formData, campaignBudget: e.target.value })}
            sx={{ width: 700, mt: 5 }}
          />

          <TextField
            variant="outlined"
            multiline
            rows={5}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            label="Please comment any customizations that you would like on your gift"
            sx={{ m: 5, width: 700 }}
          />
        </Stack>
      </Card>
      <Card sx={{ marginTop: 5, paddingTop: 5 }}>
        <Typography variant="h6" sx={{ ml: 5 }}>
          Additional Customization Options
        </Typography>

        <Stack alignItems={'center'}>
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  setShowBox((previousState) => !previousState);
                  setCustomSelected((prevState) => !prevState);
                }}
              />
            }
            label="Do you want to add box customizations?"
            labelPlacement="start"
          />

          {showBox && (
            <RadioGroup
              name="box-choice"
              sx={{ paddingLeft: 5 }}
              onChange={(e) => setFormData({ ...formData, box_type: e.target.value })}
            >
              <FormControlLabel value="1 color box" control={<Radio />} label="1 Color Box" />
              <FormControlLabel value="custom logo" control={<Radio />} label="Custom Logo" />
              <FormControlLabel value="custom logo and design" control={<Radio />} label="Custom Design and Logo Box" />
              <FormControlLabel value="alternative packaging" control={<Radio />} label="Alternative Packaging" />
            </RadioGroup>
          )}

          {formData.box_type === 'custom logo' && (
            <Box display={'flex'} flexDirection={'column'} justifyContent="center" alignItems="center">
              <Button variant="contained" component="label" sx={{ marginY: 2 }}>
                Upload your logo
                <input type="file" hidden />
              </Button>
            </Box>
          )}

          {formData.box_type === 'custom logo and design' && (
            <Box display={'flex'} flexDirection={'column'} justifyContent="center" alignItems="center">
              <Button variant="contained" component="label" sx={{ marginY: 2 }}>
                Upload your design
                <input type="file" hidden />
              </Button>
            </Box>
          )}
          <FormControlLabel
            control={<Switch onChange={() => setShowCard((previousState) => !previousState)} />}
            label="Do you want to add card customizations?"
            labelPlacement="start"
          />
          {showCard && (
            <Box display={'flex'} flexDirection="column" justifyContent="center" alignItems="center">
              <Button variant="contained" component="label" sx={{ marginY: 2 }}>
                Upload your design
                <input type="file" hidden />
              </Button>
              <TextField
                variant="outlined"
                multiline
                rows={5}
                label="Enter a personalized message you want on your card..."
                onChange={(e) => setFormData({ ...formData, personal_message: e.target.value })}
                sx={{ m: 2, width: 500 }}
              />
            </Box>
          )}
          <Button variant="contained" component="label" sx={{ marginBottom: 3 }} onClick={handleClick}>
            Submit
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default FirstPage;
