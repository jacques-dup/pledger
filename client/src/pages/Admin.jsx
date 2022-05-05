import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const Admin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { items } = useSelector((state) => state.items)
    const { pledges } = useSelector((state) => state.pledges)

    useEffect(()=>{
        if (!user?.is_admin) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <div className='page admin'>
                <div className="header">
                    <Link to={'/'}>Back</Link>
                    <h2>Admin</h2>
                </div>

                <div className="content">
                    <div className=" ui pointing secondary menu options">
                        <ul>
                            <li className="item">Items</li>
                            <li className="item">Pledges</li>
                            <li className="item">Users</li>
                        </ul>
                    </div>
                    <div className={`ui segment tab ${true ? 'active' : ''}`}>
                        stuff
                    </div>
                </div>
            </div>
        </>
    )
};
