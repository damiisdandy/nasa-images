import { useInfiniteQuery } from 'react-query';
import type { UseInfiniteQueryResult } from 'react-query';
import axios from 'axios';
import { APIRoot } from '@/types';
import { pageSize } from '@/config';

export type UseFetchProps = {
  query: string;
  startYear?: string;
  endYear?: string;
  enabled: boolean;
};

type UseFetchReturnType<T> = UseInfiniteQueryResult<T> & {}


const getNasaImages = async <T>({ query, startYear, endYear, nextURL }: Omit<UseFetchProps, 'enabled'> & { nextURL: any }) => {
  console.log(nextURL);
  const urlParameters = new URLSearchParams({
    q: query,
    media_type: 'image',
    page_size: pageSize.toString(),
    page: "2",
    ...(startYear ? { year_start: startYear } : {}),
    ...(endYear ? { year_end: endYear } : {}),
  });
  const URL = encodeURI(`https://images-api.nasa.gov/search?${urlParameters.toString()}`)
  return axios
    .get<T>(URL)
    .then(res => res.data)
}

export default function useFetch({ enabled, ...rest }: UseFetchProps): UseFetchReturnType<APIRoot> {
  const queryResponse = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: ({ pageParam }) => getNasaImages<APIRoot>({ ...rest, nextURL: pageParam }),
    enabled,
    getNextPageParam: (lastPage) => "hello",
  })
  return queryResponse;
}