import {useQuery} from '@tanstack/react-query';

const useAuthenticate = () => {

    const query = useQuery({ queryKey: ['authenticate'], queryFn: getTodos });
}

export default useAuthenticate;