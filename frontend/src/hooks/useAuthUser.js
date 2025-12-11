import { authuser } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
  const { data, isLoading } = useQuery({ 
    queryKey: ['authUser'], 
    queryFn: authuser,
    retry: false
  });


  return { 
    isloading: isLoading, 
    authUser: data,
    isAuthenticated: Boolean(data) // 
  };
}

export default useAuthUser;