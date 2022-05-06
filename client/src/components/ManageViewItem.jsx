import React from 'react'
import { FaMinusCircle, FaCheckCircle } from 'react-icons/fa'

export const ManageViewItem = ({ data, children}) => {
    return (
        <>
            { 
                data.isHeading 
                ? 
                    <h2 className="item-heading">{data.name}</h2>
                :
                    <div className="ui">
                        <div className="item">
                            <div className="item-name">
                                <p>{data.name}: 
                                    
                                </p>
                            </div>
                            <div className="options-section">
                                <div className="options">
                                <div className="status">
                                    ({data.total_pledged}/{data.total_needed})
                                    <span>
                                        {
                                            data.total_pledged === data.total_needed
                                                ?
                                                <FaCheckCircle style={{color: 'green'}} />
                                                :
                                                <FaMinusCircle style={{color: 'orange'}}/>
                                        }
                                    </span>
                                </div>
                                {children}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
export default ManageViewItem