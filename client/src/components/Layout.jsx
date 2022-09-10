import { Outlet } from 'react-router-dom';
import { CustomLink } from './CustomLink';
import Cookies from 'universal-cookie';
import DataContext from '../contexts/DataContext';
import { useContext } from 'react';

const Layout = () => {
    const { data } = useContext(DataContext);
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    
    return (
        <>
            <header>
                <CustomLink to="/">Rooms:</CustomLink>
                <span style={{color: "white" }}>{data?.name}</span>
                <span style={{color: "var(--color-active)", position: "fixed", right: "1%"}}><span style={{color: "white"}}>Name:</span> <b><i>{userData?.name}</i></b></span>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="container container-footer">&copy; Stark Industries</footer>
        </>
    )
}

export {Layout}