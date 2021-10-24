import React from 'react'
import alertStyles from '../../css/alerts.module.css';

export const AlertBase = (props) => {
    let msg = props.alertObj.msg;
    let msgText = props.alertObj.msgText;

    return (
        <div className={alertStyles.alertStyle1}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#2E9AFE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                {props.children}
            </svg>
            <span className={alertStyles.spanText}>{msg}:{msgText}</span>
            <button onClick={props.nullifyAlert} className={alertStyles.buttonStyle1}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
            </button>
        </div>)

}
