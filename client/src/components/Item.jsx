import React from 'react'
import { ProgressBar } from './ProgressBar'

export const Item = ({ data, tagLine, children}) => {
    return (
        <>
            { 
                data.isHeading 
                ? 
                    <h2 className="item-heading">{data.name}</h2>
                :
                    <li className="ui card fluid item">
                        <div className="item">
                            <div className="item-name">
                                <h3>{data.name} <p>{ tagLine }</p></h3>
                            </div>
                            <div className="item-pledge">
                                <ProgressBar current={data.total_pledged} total={data.total_needed}/>
                                <div className="buttons">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </li>
            }
        </>
    )
}
export default Item