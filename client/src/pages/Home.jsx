import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaHeart } from 'react-icons/fa'
import { getItems } from "../features/item/itemSlice";
import { getPledges } from '../features/pledge/pledgeSlice';
import { Item, ProgressBar, EditItemPopup, EditPledgePopup } from '../components'

const calculateTotals = (items) => {
    return items.reduce((acc, item) => {
        acc.current += item.total_pledged
        acc.total += item.total_needed
        return acc
    },{current: 0, total: 1})
}

export const Home = () => {

    const [ totals, setTotals ] = useState({})
    const [ showEdit, setShowEdit ] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { items } = useSelector((state) => state.items)
    const { user } = useSelector((state) => state.auth)
    const { pledges } = useSelector((state) => state.pledges)

    const onClickPledge = (e) => {
        e.preventDefault()
        if (!user) {
            navigate('/login')
        }
        else {
            const elementIndex = e.target.id
            setShowEdit({[elementIndex]: true})
        }
    }

    const onClickEdit = (e) => {
        e.preventDefault()
        const elementIndex = e.target.id
        setShowEdit({[elementIndex]: true})
    }
    const onChange = (e) => {
        const elementIndex = e.target.id
        setShowEdit({[elementIndex]: false})
    }

    useEffect(() => {
        dispatch(getItems())
        dispatch(getPledges())
    }, [showEdit])

    useEffect(() => {
        setTotals(calculateTotals(items))
    }, [items, showEdit])

    useEffect(() => {

    })

    if (items.length < 1 || totals === {}) {
        return <h2>Loading</h2>
    }

    return (
        <>
            <div className='page home'>
                <h3>The items below reflect what is still needed for the CGD Community camp. To pledge, please click the pledge button. You will be required to enter your email so that we can follow up.</h3>
                <div className="ui card fluid home-header">
                    <h1>Total Progress:</h1>
                    <ProgressBar current={totals.current} total={totals.total} size="big" />
                </div>
            
                <ul>
                    {
                        items.map((item, index) => {

                            const hasExistingPledge = pledges.find(pledge => pledge.item === item._id)

                            return (
                                <Item data={item} key={item._id}> 
                                    <>
                                        <button 
                                            className="ui primary button" 
                                            id={`pledge-${index}`} 
                                            onClick={onClickPledge}
                                            disabled={hasExistingPledge ? true : false}>
                                                <FaHeart/> {hasExistingPledge ? 'Pledged' : 'Pledge'}
                                        </button>
                                        <EditPledgePopup 
                                            title="I pledge..."
                                            item={item}
                                            index={`pledge-${index}`} 
                                            show={showEdit} 
                                            callback={onChange}
                                            isNew/>
                                    </>
                                    
                                    {user?.is_admin && 
                                        <>
                                            <button className="ui secondary button" id={`item-${index}`} onClick={onClickEdit}>
                                                <FaEdit/> Edit
                                            </button>
                                            <EditItemPopup item={item} index={`item-${index}`} show={showEdit} callback={onChange}/>
                                        </>
                                    }
                                </Item>
                            )
                        })}
                </ul>
            </div>
        </>
    )
};
