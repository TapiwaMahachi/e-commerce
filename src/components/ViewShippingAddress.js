import React from 'react'


function ViewShippingAddress(props) {
       const shipping = props.shipping;
       console.table(shipping)
    return (
        <div 
          className="viewShipping" 
          style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
        >
            <div  className="info" style={{ display:'flex',flexDirection:'column' }} >
                <label  style={{ fontSize: '1.5rem', }} >
                    {`${shipping.name}`}
                </label>
                <label> {`${shipping.addressline1} ${shipping.addressline2}`}</label>
                <label> {`${shipping.city} ${shipping.state} `} </label>
                <label>{` ${shipping.country} ${shipping.zip_code}`} </label> 
            </div>
            
        </div>
    )
}

export default ViewShippingAddress
