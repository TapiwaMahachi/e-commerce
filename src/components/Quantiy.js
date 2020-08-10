/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useRef, useEffect } from "react";
import { useState } from "react";

function Quantiy({id, quantity}) {
      
    //hook for the focus
      const [isSelected, setSelected] = useState(false)
      //hook for setting the focus
      const qtyRef = useRef(null);
      //hook for getting and setting the value
      const [value, setValue] = useState(1);

      const handleChange =(e) =>{
        setValue(e.target.value);
        quantity(parseInt(e.target.value));
      }
      useEffect(()=>{

      })
      
      useEffect(()=>{
          if(isSelected){
              qtyRef.current.focus()
          }
      },[isSelected])

    return (
        <div className="quantity__container"
        css={css`
        margin-right: .5em;
       `}
        >
        <div className="quantity__dropdownContainer"
            css={css `
            display: flex;
            flex-direction: row;
            background-color: rgb(226, 226, 226);
            border: 4px solid rgb(226, 226, 226);
            border-radius: 4px;
            padding-left: .5em;
            justify-content: center;
            align-items: center;
            width: 70px;
            &:focus{
                outline: 1px solid #886488;  
            }
            `
            }
            ref={qtyRef}
            tabIndex="-1"

            >
                <label className="quantity__label"
                css={css`
                padding: .5em 0;
                padding-bottom: .7em;
                `
                }
                
                >Qty:</label>
                <select 
                    name="quantity"
                    className="quantity__select"
                    css={css`
                        width: 45px;
                        height: 30px;
                        border: 0;
                        background-color: rgb(226, 226, 226);
                        &:focus{
                            outline: none;
                        }
                      `
                    }
                    value={value}
                    onClick={()=>setSelected(!isSelected)}
                    onChange={handleChange}
                >
                    {
                    Array(10).fill().map((_,i) =>(
                        <option className="option" key ={i+1} value={i+1} >
                                {i+1}
                        </option>  
                    ))
                        
                    } 
                </select>
            </div>
        </div>
    )
}

export default Quantiy
