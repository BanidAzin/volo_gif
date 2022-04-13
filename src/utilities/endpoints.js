import {GIPHY_API_KEY} from './constants';

const BASE_URL = 'https://api.giphy.com/v1/gifs';
export const TRENDING_GIFS = `${BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=10`;

export const SEARCH_GIFS = `${BASE_URL}/search?api_key=${GIPHY_API_KEY}&limit=10`;
