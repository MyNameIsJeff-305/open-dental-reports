import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
    return (
        <div className="side-menu">
            <img className="main-image" src='/main_logo.png'/>
            <ul>
                <li><Link className="menu-item" to="/">Dashboard</Link></li>
                <li><Link className="menu-item" to="/patients">Patients</Link></li>
                {/* <li><Link className="menu-item" to="/appointments">Appointments</Link></li>
                <li><Link className="menu-item" to="/settings">Settings</Link></li> */}
            </ul>
        </div>
    );
};

export default SideMenu;