import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { getPledges } from "../features/pledge/pledgeSlice";
import { getItems } from "../features/item/itemSlice";
import { Item, EditPledgePopup } from '../components'


const mapPledges = (pledges, items) => {
    return pledges.map( (pledge) => {
        return {
            id: pledge._id,
            item: items.find(i => i._id === pledge.item),
            amount: pledge.amount
        }
    })
}

export const MyPledges = () => {

    const [ myPledges, setMyPledges ] = useState([])
    const [ showEdit, setShowEdit ] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { pledges } = useSelector((state) => state.pledges)
    const { items } = useSelector((state) => state.items)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getPledges())
        dispatch(getItems())
    }, [showEdit])

    useEffect(() => {
        setMyPledges(mapPledges(pledges, items))
    }, [items, pledges])

    const onClick = (e) => {
        e.preventDefault()
        const elementIndex = e.target.id
        setShowEdit({[elementIndex]: true})
    }
    const onChange = (e) => {
        const elementIndex = e.target.id
        setShowEdit({[elementIndex]: false})
    }

    if (!user) {
        navigate('/login')
    }

    if (myPledges.length < 1) {
        return (
            <div>
                <div className="header">
                    <Link to={'/'}>Back</Link>
                    <h2>My Pledges</h2>
                </div>
                <h2>You have no pledges.</h2>
            </div>
        )
    }

    return (
        <>
            <div className='page pledges'>
                <div className="header">
                    <Link to={'/'}>Back</Link>
                    <h2>My Pledges</h2>
                </div>
                <ul>
                    {
                        myPledges.map((pledge, index) => {
                            return (
                                <Item data={pledge.item} key={pledge.id} tagLine={`You have pledged ${pledge.amount}`}>
                                    <button className="ui secondary button" id={index} onClick={onClick}>
                                        <FaEdit/>Edit
                                    </button>
                                    <EditPledgePopup item={pledge} index={index} show={showEdit} callback={onChange}/>
                                </Item>
                            )
                        })}
                </ul>
            </div>
        </>
    )
};
