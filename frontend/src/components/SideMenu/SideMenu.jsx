import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.css';
import { fetchSession, logoutThunk } from '../../store/sessionReducer';

const SideMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    console.log('User in SideMenu:', user);

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        navigate('/'); // Redirect to login or home after logout
    }

    return (
        <div className="side-menu">
            <ul>
                <li><Link className="menu-item" to="/">Dashboard</Link></li>
                <li><Link className="menu-item" to="/patients">Patients</Link></li>
                <li><Link className="menu-item" to="/appointments">Appointments</Link></li>
                <li><Link className="menu-item" to="/settings">Settings</Link></li>
                {/* <li><button className='logout-btn' onClick={handleLogout}>Logout</button></li> */}
            </ul>
            <div className='logout-button'>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default SideMenu;