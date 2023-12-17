import React, {useEffect, useState} from 'react';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import CancelIcon from '@mui/icons-material/Cancel';
const CenteredForm = ({isFormVisible,formPosition,setFormVisibility,setLinkName,setLinkValue, updateLinkArray}) => {

    const handleChange = (e,type) =>{
        type === "name" ? setLinkName(e.target.value) : setLinkValue(e.target.value);
    }

    return (
        <div style={{zIndex:"1000", position:"absolute", textAlign: 'center'}}>
            {isFormVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: formPosition.top,
                        left: formPosition.left,
                        backgroundColor: '#fff',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <CancelIcon style={{position:"absolute",right:'-5%',top:'-5%'}}  onClick={() => setFormVisibility(false)} />
                    <form onSubmit={updateLinkArray}>
                        <MDBInput className='mb-4' type='name' id='form1Example1' label='Name' onChange={(e)=>{handleChange(e,"name")}} />
                        <MDBInput className='mb-4' type='link' id='form1Example2' label='Link' onChange={(e)=>{handleChange(e,"value")}}/>

                        <MDBBtn type='submit' block>
                            Add
                        </MDBBtn>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CenteredForm;
