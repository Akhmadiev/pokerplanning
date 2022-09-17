import { Outlet } from 'react-router-dom';
import { CustomLink } from './CustomLink';
import Cookies from 'universal-cookie';
import DataContext from '../contexts/DataContext';
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
    const { data } = useContext(DataContext);
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav" style={{color: "rgb(106, 165, 219)"}}>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/" style={{fontSize: "20px", color: "rgb(106, 165, 219)"}}>Rooms</a>
                    </li>
                        <li className="nav-item">
                        <span className="nav-link" style={{position: "fixed", right: "0%", fontSize: "20px"}}>User name: <i style={{color: "rgb(106, 165, 219)"}}>{userData?.name}</i></span>
                    </li>
                </ul>
            </div>
        </nav>
        <main className="container">
        <Outlet />
        </main>
        </>
    )
}

export {Layout}