import React from 'react'
import { AlertBase } from './AlertBase';

export default function Alert(props) {

    if (props.alertObj == null) {
        return null
    }
    else {
        let msg = props.alertObj.msg;
        return (
            <>
                {(msg === 'Check') ?
                    (<AlertBase alertObj={props.alertObj} nullifyAlert={props.nullifyAlert}>
                        <circle cx='12' cy='12' r='10' />
                        <line x1='12' y1='16' x2='12' y2='12' />
                        <line x1='12' y1='8' x2='12' y2='8' />
                    </AlertBase>)
                    :
                    (<AlertBase alertObj={props.alertObj} nullifyAlert={props.nullifyAlert}>
                        <circle cx='12' cy='12' r='10' />
                        <line x1='12' y1='8' x2='12' y2='12' />
                        <line x1='12' y1='16' x2='12' y2='16' />
                    </AlertBase>)

                }
            </>

        )
    }

}

