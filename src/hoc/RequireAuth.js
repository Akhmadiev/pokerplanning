import { useLocation, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QueryService } from '../Services/QueryService';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const cookies = new Cookies();
  const userData = cookies.get('PlanningAuth');
  const fromPage = location.pathname || '/';
  if (!userData) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  QueryService.createUser(fromPage.replace('/', ''), userData);
  return children;
}

export {RequireAuth};
