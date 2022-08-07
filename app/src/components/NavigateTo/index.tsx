import { useNavigate } from 'react-router-dom';

interface UseNavigateTo {
  navigateTo(link: string): void;
}

export default function useNavigateTo(): UseNavigateTo {
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    navigate(link, { replace: true });
  };
  return { navigateTo };
}
