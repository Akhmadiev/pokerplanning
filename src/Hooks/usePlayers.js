import { useQuery } from 'react-query'
import { QueryService } from '../Services/QueryService';

export const usePlayers = () => {
	const { data, error, isError, isLoading } = useQuery(['players'], () => QueryService.getRoom(1));
	return { data, error, isError, isLoading };
}