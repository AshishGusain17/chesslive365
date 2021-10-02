import React from 'react'

export const square = () => {
    return (
        <div className={glowSqs[1] ? `${styles.maindiv} ${styles.maindiv2}  ${styles.eachDiv}` : styles.eachDiv} >
            <img style={pieceStyle} src={renderSwitch(allPositions[1])} alt={allPositions[1]} />
        </div>
    )
}
