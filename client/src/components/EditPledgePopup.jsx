import React, {useState} from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { editPledge, createPledge } from '../features/pledge/pledgeSlice'

export const EditPledgePopup = ({ title, item, index, show, isNew, callback }) => {

    const [formData, setFormData] = useState({
        newPledge: item.amount || 0,
    })
    const { newPledge } = formData
    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value < 0 ? 0 : e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        

        if (isNew) {
            const newPledgeData = {
                amount: newPledge,
                item: item._id // new pledges has the item as item prop
            }
            dispatch(createPledge(newPledgeData))
                .then(()=>callback(e))
        }
        else{
            const newPledgeData = {
                id: item.id, // existing pledges has the pledge as item prop
                amount: newPledge,
            }
            dispatch(editPledge(newPledgeData))
                .then(()=>callback(e))
        }
    }

    const onClose = (e) => {
        callback(e)
    }

    return (
        <div className={`ui card item edit-item ${show[index] ? 'show' : 'hide'}`}>
            <div>
                <h3>{title ? title : 'Edit your pledge'} <span onClick={onClose}><FaWindowClose /></span></h3>
            </div>
            <div>
                <form onSubmit={onSubmit} className='ui form'>
                    <div className='form-group edit-form'>
                        <input
                            type='number'
                            className='form-control'
                            id='newPledge'
                            name='newPledge'
                            value={newPledge}
                            placeholder='New pledge'
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
export default EditPledgePopup