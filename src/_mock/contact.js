import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { fDate } from '../utils/formatTime';
import { fCurrency, fPercent } from '../utils/formatNumber';

const contact = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Diwali', 'Eid/Ramadan', 'Christmas', 'None']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default contact;
