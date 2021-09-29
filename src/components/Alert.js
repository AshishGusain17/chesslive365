import React from 'react'

export default function Alert(props) {
    if(props.alertObj == null){
        return null
    }
    else{
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{props.alertObj.msg}</strong>: {props.alertObj.msgText}
            </div>
        )
    }

}