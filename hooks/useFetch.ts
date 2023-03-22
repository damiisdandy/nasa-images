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

export type UseFetchReturnType<T> = UseInfiniteQueryResult<T> & {}


const getNasaImages = async <T>({ query, startYear, endYear, page = 1 }: Omit<UseFetchProps, 'enabled'> & { page: number }) => {
  const urlParameters = new URLSearchParams({
    q: query,
    media_type: 'image',
    page_size: pageSize.toString(),
    page: page.toString(),
    ...(startYear ? { year_start: startYear } : {}),
    ...(endYear ? { year_end: endYear } : {}),
  });
  const URL = encodeURI(`https://images-api.nasa.gov/search?${urlParameters.toString()}`)
  return axios
    .get<T>(URL)
    .then(res => res.data)
}

/**
 * Fetching media images from Nasa's API
 */
export default function useFetch({ enabled, ...rest }: UseFetchProps): UseFetchReturnType<APIRoot> {
  const queryResponse = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: ({ pageParam }) => getNasaImages<APIRoot>({ ...rest, page: pageParam }),
    enabled,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.collection.metadata.total_hits | pageSize)
      if (pages.length < totalPages) {
        return pages.length + 1;
      }
      return undefined;
    }
  })
  return queryResponse;
}