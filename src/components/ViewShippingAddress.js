import React from 'react'


function ViewShippingAddress({info}) {
       
    return (
        <div 
          className="viewShipping" 
          style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
        >
            <div  className="info" style={{ display:'flex',flexDirection:'column' }} >
                <label  style={{ fontSize: '1.5rem', }} >
                    {`${info.firstname} ${info.lastname}`}
                </label>
                <label> {`${info.addressline1} ${info.addressline2}`}</label>
                <label> {`${info.city} ${info.state} `} </label>
                <label>{` ${info.country} ${info.zip_code}`} </label>
            </div>
            
        </div>
    )
}

export default ViewShippingAddress
