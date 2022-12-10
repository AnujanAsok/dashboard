import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { fDate } from '../utils/formatTime';
import { fCurrency, fPercent } from '../utils/formatNumber';
import { supabase } from '../utils/supabase_client';

// ----------------------------------------------------------------------

const campaignNames = ['Hispanic Heritage Month', 'Eid/Ramadan', 'Diwali', 'Christmas', 'Birthday'];
const campaignBudget = [90000, 50000, 27000, 25000, 10000];
const totalSpends = [50000, 24000, 23000, 19000, 5000];
const engagementRates = [50, 90, 75, 70, 80];
const giftIcon = ['mdi:gift-open', 'mdi:gift-open', 'mdi:gift-open', 'mdi:gift-outline', 'mdi:gift-outline'];

// const users = [...Array(5)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.name.fullName(),
//   company: faker.company.name(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer',
//   ]),
// }));

const users = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: giftIcon[index],
  name: campaignNames[index],
  date: fDate(faker.date.future()),
  budget: fCurrency(campaignBudget[index]),
  isSpent: fCurrency(totalSpends[index]),
  engagement: fPercent(engagementRates[index]),
}));

export default users;
