import { useContext } from 'react';
import Cookies from 'universal-cookie';

export function useAuth() {
    const cookies = new Cookies();
    const user = cookies.get('PlanningAuth');
    return user;
    // cookies.set('myCat', 'Pacman', { path: '/' });
    // console.log(cookies.get('Auth')); // Pacman
    // return useContext(AuthContext);
}
