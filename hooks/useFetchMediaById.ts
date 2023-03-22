import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';
import axios from 'axios';
import { APIRoot } from '@/types';

export type UseFetchMediaByIdProps = {
  id: string;
  enabled: boolean;
};

type UseFetchReturnType<T> = UseQueryResult<T> & {}


const getImageById = async <T>({ id }: Omit<UseFetchMediaByIdProps, "enabled">) => {
  const urlParameters = new URLSearchParams({
    media_type: 'image',
    page_size: "1",
    nasa_id: id,
  });
  const URL = encodeURI(`https://images-api.nasa.gov/search?${urlParameters.toString()}`)
  return axios
    .get<T>(URL)
    .then(res => res.data)
}

/**
 * Fetch media from Nasa by Id
 */
export default function useFetchMediaById({ id, enabled }: UseFetchMediaByIdProps): UseFetchReturnType<APIRoot> {
  const queryResponse = useQuery({
    queryKey: ['media-by-id'],
    queryFn: () => getImageById<APIRoot>({ id }),
    enabled,
  })
  return queryResponse;
}