import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaBook } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo from './CGD.jpg'

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='ui header'>
            <div className='logo'>
                <Link to='/'><img src={logo} width="300px"/></Link>
            </div>
            
            <ul>
                {user ? (
                    <>
                        <li>
                            <button className="ui primary button" onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                        <li>
                            <Link to='/pledges'>
                                <FaUser /> My Pledges
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </>
                )}

                {user?.is_admin &&
                    <>
                        <li>/</li>
                        <li>
                            <Link to='/admin'>
                                <FaBook /> Admin
                            </Link>
                        </li>
                    </>
                    }

            </ul>
        </header>
    )
};
