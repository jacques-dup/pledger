import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { ManageItemList, ManagePledgesList } from '../components'

export const Admin = () => {

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user?.is_admin) {
            navigate('/')
        }
    }, [user])


    const panes = [
        {
            menuItem: 'Manage Item List',
            render: () => <Tab.Pane attached={false}>
                <ManageItemList />
            </Tab.Pane>,
        },
        {
            menuItem: 'Manage Pledges',
            render: () => <Tab.Pane attached={false}>
                <ManagePledgesList />
            </Tab.Pane>,
        },
    ]

    return (
        <>
            <div className='page admin'>
                <div className="header">
                    <Link to={'/'}>Back</Link>
                    <h2>Admin</h2>
                </div>

                <div className="content">
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                </div>
            </div>
        </>
    )
};
