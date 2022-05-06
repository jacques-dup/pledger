import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getItems } from "../features/item/itemSlice";
import { ManageViewItem, EditItemPopup, DeletePopup, BulkUploader } from '../components'

export const ManageItemList = () => {

    const [ showEdit, setShowEdit ] = useState({})

    const dispatch = useDispatch()
    
    const { items } = useSelector((state) => state.items)

    const onClick = (e) => {
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
    }, [showEdit])

    if (!items.length > 0) {
        return <p>Empty</p>
    }

    return (
        <div>
            <div className="bulk-tools">
                {/* <BulkUploader /> */}
            </div>
            <div className="manage-item-list">
                <h2>All Items</h2>
                <ul>
                {
                    items.map( (item, index) => {
                        return (
                            <li key={item.name}>
                                <ManageViewItem data={item}>
                                    <button className="ui primary button" id={`edit-${index}`} onClick={onClick}>
                                        Edit
                                    </button>
                                    <button className="ui secondary button" id={`delete-${index}`} onClick={onClick}>
                                        Delete
                                    </button>
                                    <EditItemPopup item={item} index={`edit-${index}`} show={showEdit} callback={onChange}/>
                                    <DeletePopup item={item} index={`delete-${index}`} show={showEdit} callback={onChange}/>
                                </ManageViewItem>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
};
