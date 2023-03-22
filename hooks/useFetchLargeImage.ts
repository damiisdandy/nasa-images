import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';
import axios from 'axios';

export type UseFetchLargeImage = {
  url: string;
  enabled: boolean;
};

type UseFetchReturnType<T> = UseQueryResult<T> & {}


const getLargeImage = async <T>({ url }: Omit<UseFetchLargeImage, "enabled">) => {
  return axios
    .get<T>(url)
    .then(res => res.data)
}
/**
 * Fetch high quality image after media data is gotten
 */
export default function useFetchLargeImage({ url, enabled }: UseFetchLargeImage): UseFetchReturnType<string[]> {
  const queryResponse = useQuery({
    queryFn: () => getLargeImage<string[]>({ url }),
    enabled,
    cacheTime: 0
  })
  return queryResponse;
}