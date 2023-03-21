import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';
import axios from 'axios';
import { APIRoot } from '@/types';

type UseFetchProps = {
  query: string;
  startYear?: number;
  endYear?: number;
  enabled: boolean;
};

type UseFetchReturnType<T> = UseQueryResult<T> & {}


const getNasaImages = async <T>({ query, startYear, endYear }: Omit<UseFetchProps, 'enabled'>) => {
  const URL = encodeURI(`https://images-api.nasa.gov/search?q=${query}&media_type=image&page_size=20${startYear ?
    `&year_start=${startYear}` : ''}${endYear ?
      `&year_end=${endYear}` : ''}`)
  console.log(URL);
  return axios
    .get<T>(URL)
    .then(res => res.data)
}

export default function useFetch({ enabled, ...rest }: UseFetchProps): UseFetchReturnType<APIRoot> {
  const queryResponse = useQuery({
    queryKey: ['images'],
    queryFn: () => getNasaImages<APIRoot>(rest),
    enabled,
  })
  return queryResponse;
}