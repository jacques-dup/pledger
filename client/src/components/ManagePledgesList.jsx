import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaPrint } from 'react-icons/fa'
import { getAllPledges } from "../features/pledge/pledgeSlice";
import { getUsers } from '../features/auth/authSlice';
import { getItems } from '../features/item/itemSlice'
import { sortByProp } from '../utils/data'
import  { Loader } from '../components'


export const ManagePledgesList = ({ print }) => {

    const [ data, setData ] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { allPledges, isLoading } = useSelector((state) => state.pledges)
    const { allUsers } = useSelector((state) => state.auth)
    const { items } = useSelector((state) => state.items)

    const mapPledges = () => {
        if (!allPledges || !allUsers | !items) {
            return []
        }
        const rawPledges = allPledges.reduce( (acc, pledge) => {
            const user = allUsers.find(u => u._id === pledge.user)
            const item = items.find(i => i._id === pledge.item)
            let userObj = {
                user: user.name,
                email: user.email,
                phone: user.phone,
                item: item.name,
                amount: pledge.amount,
                isNewUser: false
            }
            acc.push(userObj)
            return acc
        }, [])

        const byName = rawPledges.sort(sortByProp('user'))
        let previous
        return byName.map((pledge) => {
            if (previous != pledge.email) {
                previous = pledge.email
                pledge.isNewUser = true
            }
            return pledge
        })
    }

    const onClickPrint = (e) => {
        e.preventDefault()
        navigate('/print/pledges')
    }

    useEffect(() => {
        dispatch(getAllPledges())
        dispatch(getUsers())
        dispatch(getItems())
    }, [])

    useEffect(() => {
        setData(mapPledges())
    }, [allPledges, allUsers, items])

    if (isLoading) {
        return <Loader />
    }

    if (!allPledges.length) {
        return <p>Empty</p>
    }

    return (
        <div>
            {
                !print &&
                <div className="tools">
                    <button className="ui button primary" onClick={onClickPrint}><FaPrint /></button>
                </div>
            }

            <div className="manage-item-list">
                <h2>All Pledges</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Pledge item</th>
                        <th>Qty.</th>
                        <th><FaCheckCircle style={{color: 'green', height: '1.5em', width: '1.5em'}}/></th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    data.map( (listing, index) => {
                        console.log('listing', listing)
                        return (
                            <tr key={`listing-${index}`} className={listing.isNewUser ? 'new-section' : ''}>
                                <td className="tablecell">
                                    {listing.user}
                                </td>
                                <td className="tablecell">
                                    {listing.email}
                                </td>
                                <td className="tablecell">
                                    {listing.phone}
                                </td>
                                <td className="tablecell">
                                    {listing.item}
                                </td>
                                <td className="tablecell">
                                    {listing.amount}
                                </td>
                                <td className="tablecell">
                                    <input type="checkbox" />
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
            </div>
        </div>
    )
};
