import React, {useState} from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { editItem } from '../features/item/itemSlice'
import { editPledge } from '../features/pledge/pledgeSlice'

export const EditItemPopup = ({ item, index, show, callback }) => {

    const [formData, setFormData] = useState({
        name: item.name,
        total_needed: item.total_needed
    })
    const { name, total_needed } = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newData = {
            id: item._id,
            name: name,
            total_needed: total_needed
        }
        dispatch(editItem(newData))
            .then(()=>callback(e))
    }

    const onClose = (e) => {
        callback(e)
    }

    return (
        <div className={`ui card item fluid edit-item ${show[index] ? 'show' : 'hide'}`}>
            <div>
                <h3>Edit Item<span onClick={onClose} id={index}><FaWindowClose /></span></h3>
            </div>
            <div>
                <form onSubmit={onSubmit} className='ui form'>
                    <div className='form-group edit-form'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Edit Name'
                            onChange={onChange}
                        />
                        <input
                            type='number'
                            className='form-control'
                            id='total_needed'
                            name='total_needed'
                            value={total_needed}
                            placeholder='Edit Total Needed'
                            onChange={onChange}
                        />
                        <button type='submit' id={index} className='ui button primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditItemPopup