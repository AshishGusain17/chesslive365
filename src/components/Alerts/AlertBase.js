import React from 'react'

export const AlertBase = (props) => {
    let msg = props.alertObj.msg;
    let msgText = props.alertObj.msgText;
    const alertStyle = {
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        color: 'white',
        padding: '10px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
        fontFamily: 'Arial',
        width: '400px',
        height:'57px',
        boxSizing: 'border-box',
        margin: '0 auto',
        position: 'fixed',
        left: '0',
        right: '0',
        zIndex: 1
    }

    const buttonStyle = {
        marginLeft: '20px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: '#FFFFFF'
    }


    return (
        <div style={{ ...alertStyle }}>
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
                style={{ marginRight: true ? '20px' : '0', minWidth: 24 }}
            >
                {props.children}
            </svg>
            <span style={{ flex: 2 }}>{msg}:{msgText}</span>
            <button onClick={props.nullifyAlert} style={buttonStyle}>
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
                    style={{ marginRight: false ? '20px' : '0', minWidth: 24 }}
                >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
            </button>
        </div>)

}
