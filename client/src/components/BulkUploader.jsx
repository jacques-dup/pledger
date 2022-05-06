import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../features/item/itemSlice'

export const BulkUploader = ({ callback }) => {

    const [formData, setFormData] = useState({
        data: ''
    })
    const { data } = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const makeBulkRequestObjects = (data) => {

    }

    const onSubmit = (e) => {
        e.preventDefault()

        const uploads = makeBulkRequestObjects(data)
        const newData = {
            
        }
        dispatch(createItem(newData))
            .then(() => callback(e))
    }

    return (
        <div className="bulk-loader">
            <h2>Bulk Upload</h2>
            <p>Enter comma separated lines into the text box to do quick uploads.</p>
            <form onSubmit={onSubmit} className='ui form'>
                <div className='form-group edit-form'>
                    <input
                        type='text'
                        className='form-control'
                        id='data'
                        name='data'
                        value={data}
                        placeholder='CSV data here: Item, Category, Quantity'
                        onChange={onChange}
                    />
                    <button type='submit' className='ui button primary'>
                        Upload
                    </button>
                </div>
            </form>
        </div>
    )
}
export default BulkUploader