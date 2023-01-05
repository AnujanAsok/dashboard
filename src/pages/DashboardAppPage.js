import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { supabase } from '../utils/supabase_client';
// components

import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage(props) {
  const { status, setStatus } = props;
  const [giftMetrics, setGiftMetrics] = useState({ gift_frequency: '' });
  const [totalCampaignSpend, setTotalCampaignSpend] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const theme = useTheme();

  // const user = supabase.auth.getUser(); // this works after the user has completed email verification
  // console.log('user id ', user);
  const navigate = useNavigate();

  useEffect(() => {
    sendDataToSupa();
  }, []); // realtime changes for auth

  useEffect(() => {
    getTotalSpend();
  }, []);

  useEffect(() => {
    getRemainingBudget();
  }, [totalCampaignSpend]);

  const sendDataToSupa = async () => {
    const userSession = await supabase.auth.getSession();
    console.log('session ', userSession.data.session.user.id);
    setStatus({ ...status, userId: userSession.data.session.user.id });
    if (status.phone && status.budget) {
      const { error } = await supabase
        .from('profiles')
        .update({ phone: status.phone, budget: status.budget })
        .eq('id', status.userId);
    }
  };

  const getTotalSpend = async () => {
    const { data } = await supabase.from('campaigns').select('total_spend').eq('client_id', status.userId);
    console.log('total spend from all campaigns ', data);
    const total = data.reduce((a, b) => a + b.total_spend, 0);
    const { data: newTotal, error } = await supabase
      .from('gifting_metrics')
      .update({ total_spend: total })
      .eq('client_id', status.userId)
      .select('total_spend');
    setTotalCampaignSpend(newTotal[0]);
  };

  const getRemainingBudget = async () => {
    const { data } = await supabase.from('profiles').select('budget').eq('id', status.userId);
    setRemainingBudget(data[0]);
    console.log(data);
  };

  // if()
  // navigate('/login', { replace: true });

  const fetchMetrics = async () => {
    const { data } = await supabase.from('gifting_metrics').select('*').eq('client_id', status.userId);
    setGiftMetrics(data[0]);
    // const { error } = await supabase
    // .from('profiles')
    // .upsert([
    //   {
    //     email: accountInfo.email,
    //     full_name: accountInfo.full_name,
    //   },
    // ]).eq('id', user.)
  };

  // const fetchUser = async () => {
  //   console.log('status in fetch user', status);
  //   const { error } = await supabase
  //     .from('profiles')
  //     .update([{ full_name: status.full_name, email: authTest.user.email }])
  //     .eq('id', authTest.user.id);
  // };

  // useEffect(() => {
  //   if (authTest.user) {
  //     fetchUser();
  //   }
  // }, [authTest]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const dates = Object.entries(giftMetrics.gift_frequency).map((date) => date[1].date);
  const giftAmount = Object.entries(giftMetrics.gift_frequency).map((date) => date[1].amount);

  return (
    <>
      <Helmet>
        <title> Overview </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Remaining Budget"
              total={remainingBudget.budget - totalCampaignSpend.total_spend}
              icon={'ph:money-fill'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Spend"
              total={totalCampaignSpend.total_spend}
              color="info"
              icon={'ri:money-dollar-circle-fill'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Upcoming Launch Date"
              date={'10/01/2022'}
              color="warning"
              icon={'bi:calendar-date'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Cost Per Gift"
              total={giftMetrics.cost_per_gift}
              color="success"
              icon={'bxs:gift'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Satisfaction Rate"
              percentage={giftMetrics.satisfaction_rate}
              icon={'mdi:emoticon-happy'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Mentions"
              number={giftMetrics.total_mentions}
              color="error"
              icon={'ion:social-rss'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Total Sends Over Last 12 Months"
              subheader="(+43%) than last year"
              chartLabels={dates}
              chartData={[
                {
                  name: 'Gift Sends',
                  type: 'column',
                  fill: 'solid',
                  data: giftAmount,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Holiday Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: ['AAPI Month', 'Hispanic Heritage Month', 'Christmas', 'Eid/Ramadan', 'Diwali'][index],
                type: `holiday${index + 1}`,
                time: faker.date.future(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gifts By Occasion"
              chartData={[
                { label: 'Christmas', value: 4344 },
                { label: 'Eid/Ramadan', value: 5435 },
                { label: 'Diwali', value: 1443 },
                { label: 'Hispanic Heritage Month', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
