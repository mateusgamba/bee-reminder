import { useSearchParams } from 'react-router-dom';

export default function useQueryString(): URLSearchParams {
  const [searchParams] = useSearchParams();
  return searchParams;
}
