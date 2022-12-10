import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  {
    title: 'Google',
    cover:
      'https://uploads-ssl.webflow.com/629937eb2663857b73ec5771/631633b8d59581c390d8224c_580b57fcd9996e24bc43c51f.png',
  },
  {
    title: 'Duolingo',
    cover: 'https://uploads-ssl.webflow.com/629937eb2663857b73ec5771/631ac590c79cf6266ff993b0_logotype.svg',
  },
  {
    title: 'Hightouch',
    cover: 'https://uploads-ssl.webflow.com/629937eb2663857b73ec5771/631633b85dd15fc57f29e5de_logo.png',
  },
  {
    title: 'Zoom',
    cover:
      'https://uploads-ssl.webflow.com/629937eb2663857b73ec5771/631633b85dd15f303429e5df_2560px-Zoom_Communications_Logo.svg.png',
  },
  {
    title: 'PMG',
    cover: 'https://uploads-ssl.webflow.com/629937eb2663857b73ec5771/63151b25fac8ee2a6ccbd102_PMG%20Logo%20Refresh.png',
  },
];

const posts = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: POST_TITLES[index].cover,
  title: POST_TITLES[index].title,
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
