import React, {useState} from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/item/itemSlice'

export const DeletePopup = ({ item, index, show, callback }) => {

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(deleteItem(item._id))
            .then(()=>callback(e))
    }

    const onClose = (e) => {
        callback(e)
    }

    return (
        <div className={`ui card item edit-item ${show[index] ? 'show' : 'hide'}`}>
            <div>
                <h3>Delete?<span onClick={onClose} id={index}><FaWindowClose /></span></h3>
            </div>
            <div>
                <form onSubmit={onSubmit} className='ui form'>
                    <div className='form-group edit-form'>
                        <button type='submit' id={index} className='ui button primary'>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default DeletePopup