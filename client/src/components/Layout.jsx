import { Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
    const cookies = new Cookies();
    const userData = cookies.get('PlanningAuth');
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{height: "5vh", width: "60vw"}}>
            <div className="collapse navbar-collapse" id="navbarNav" style={{color: "rgb(106, 165, 219)"}}>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/" style={{color: "rgb(106, 165, 219)", fontSize: '2vh', fontStyle: 'italic'}}>Rooms</a>
                    </li>
                </ul>
            </div>
        </nav>
        <main>
        <Outlet />
        </main>
        </>
    )
}

export {Layout}