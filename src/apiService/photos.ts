import axios from 'axios';

interface Photo {
  id: string;
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
}

interface ApiResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}

const API_KEY = 'YmeqEEevrarvG7Seo8nhFGuSiQOwBqQUHIqZtRYHjvM';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;

axios.defaults.params = {
  orientation: 'landscape',
  per_page: 28,
};

export const getPhotos = async (query: string, page: number): Promise<ApiResponse> => {
  const { data } = await axios.get<ApiResponse>(`search/photos`, {
    params: { query, page },
  });

  return data;
};

