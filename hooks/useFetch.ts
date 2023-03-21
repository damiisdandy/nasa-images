import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';
import axios from 'axios';
import { APIRoot } from '@/types';
import { pageSize } from '@/config';

export type UseFetchProps = {
  query: string;
  startYear?: string;
  endYear?: string;
  enabled: boolean;
};

type UseFetchReturnType<T> = UseQueryResult<T> & {}


const getNasaImages = async <T>({ query, startYear, endYear }: Omit<UseFetchProps, 'enabled'>) => {
  const urlParameters = new URLSearchParams({
    q: query,
    media_type: 'image',
    page_size: pageSize.toString(),
    ...(startYear ? { year_start: startYear } : {}),
    ...(startYear ? { year_start: startYear } : {}),
  });
  const URL = encodeURI(`https://images-api.nasa.gov/search?${urlParameters.toString()}`)
  return axios
    .get<T>(URL)
    .then(res => res.data)
}

export default function useFetch({ enabled, ...rest }: UseFetchProps): UseFetchReturnType<APIRoot> {
  const queryResponse = useQuery({
    queryKey: ['search'],
    queryFn: () => getNasaImages<APIRoot>(rest),
    enabled,
  })
  return queryResponse;
}