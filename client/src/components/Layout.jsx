import { Outlet } from 'react-router-dom';
import { CustomLink } from './CustomLink';
import Cookies from 'universal-cookie';

const Layout = () => {
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    
    return (
        <>
            <header>
                <CustomLink to="/">Rooms</CustomLink>
                <span style={{color: "white", position: "fixed", right: "1%"}}>{userData?.name}</span>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="container container-footer">&copy; Stark Industries</footer>
        </>
    )
}

export {Layout}