import axios from 'axios';
import { Image } from '../components/App/App.types';

const ACCESS_KEY = 'lZRghMy73VppnumKharDvrkXy1y0d5jKYDF72QdWW04';

axios.defaults.baseURL = 'https://api.unsplash.com/';

interface UnsplashData {
  results: Image[];
  total: number;
}

export async function getPhotosBySearchValue(
  query: string,
  page = 1
): Promise<UnsplashData> {
  const params = new URLSearchParams({
    query: `${query}`,
    page: String(page),
    orientation: 'landscape',
    client_id: ACCESS_KEY,
  });

  const response: { data: Promise<UnsplashData> } = await axios.get(
    '/search/photos',
    {
      params,
    }
  );
  return response.data;
}
