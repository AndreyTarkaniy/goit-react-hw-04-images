import axios from 'axios';

const API_KEY = '34996310-6eb230e6525d45c07c1c5f00a';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImage = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  };
  const responce = await axios.get('/', { params });

  return responce;
};
