import React from 'react';
import { useState, useContext } from 'react';

import br from '../assets/pieces/br.jpg';
import bg from '../assets/pieces/bg.jpg';
import bb from '../assets/pieces/bb.jpg';
import bk from '../assets/pieces/bk.jpg';
import bq from '../assets/pieces/bq.jpg';
import bp from '../assets/pieces/bp.jpg';
import wr from '../assets/pieces/wr.jpg';
import wg from '../assets/pieces/wg.jpg';
import wb from '../assets/pieces/wb.jpg';
import wk from '../assets/pieces/wk.jpg';
import wq from '../assets/pieces/wq.jpg';
import wp from '../assets/pieces/wp.jpg';
 
import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css';

export default function Home(props) {
    const pieceStyle = { maxHeight: '100%', maxWidth: '100%', };

    const context = useContext(PositionContext);
    const { allPositions,  glowSqs, updateGlowSqs} = context;

    console.log(1, allPositions[1]);


    const renderSwitch = (param) => {
        switch (param) {
            case 'br': return br;
            case 'bg': return bg;
            case 'bb': return bb;
            case 'bk': return bk;
            case 'bq': return bq;
            case 'bp': return bp;
            case 'wr': return wr;
            case 'wg': return wg;
            case 'wb': return wb;
            case 'wk': return wk;
            case 'wq': return wq;
            case 'wp': return wp;
        }
    }
    // glowSqs, updateGlowSqs

    return (

        <>


            <div className={styles.wrappper}>
                <div className={`${styles.maindiv} ${styles.maindiv2}`} >
                    <h1>Every</h1>
                </div>
            </div>



            <div className="flex-container1">
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <div className={glowSqs[1]?`${styles.maindiv} ${styles.maindiv2}  ${styles.eachDiv}`:styles.eachDiv} >
                        <img style={pieceStyle} src={renderSwitch(allPositions[1])} alt={allPositions[1]} />
                    </div>
                    <div className={glowSqs[2]?`${styles.maindiv} ${styles.maindiv2}  ${styles.eachDiv}`:styles.eachDiv} >
                        <img style={pieceStyle} src={renderSwitch(allPositions[2])} alt={allPositions[2]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[3])} alt={allPositions[3]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[4])} alt={allPositions[4]} />
                    </div>
                    <div className={`${styles.maindiv} ${styles.maindiv2}  ${styles.eachDiv}`} >
                        <img style={pieceStyle} src={renderSwitch(allPositions[5])} alt={allPositions[5]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[6])} alt={allPositions[6]} />
                    </div>
                    <div className={`${styles.maindiv} ${styles.maindiv2}  ${styles.eachDiv}`} >
                        <img style={pieceStyle} src={renderSwitch(allPositions[7])} alt={allPositions[7]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[8])} alt={allPositions[8]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[9])} alt={allPositions[9]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[10])} alt={allPositions[10]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[11])} alt={allPositions[11]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[12])} alt={allPositions[12]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[13])} alt={allPositions[13]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[14])} alt={allPositions[14]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[15])} alt={allPositions[15]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[16])} alt={allPositions[16]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[17])} alt={allPositions[17]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[18])} alt={allPositions[18]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[19])} alt={allPositions[19]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[20])} alt={allPositions[20]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[21])} alt={allPositions[21]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[22])} alt={allPositions[22]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[23])} alt={allPositions[23]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[24])} alt={allPositions[24]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[25])} alt={allPositions[25]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[26])} alt={allPositions[26]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[27])} alt={allPositions[27]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[28])} alt={allPositions[28]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[29])} alt={allPositions[29]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[30])} alt={allPositions[30]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[31])} alt={allPositions[31]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[32])} alt={allPositions[32]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[33])} alt={allPositions[33]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[34])} alt={allPositions[34]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[35])} alt={allPositions[35]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[36])} alt={allPositions[36]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[37])} alt={allPositions[37]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[38])} alt={allPositions[38]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[39])} alt={allPositions[39]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[40])} alt={allPositions[40]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[41])} alt={allPositions[41]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[42])} alt={allPositions[42]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[43])} alt={allPositions[43]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[44])} alt={allPositions[44]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[45])} alt={allPositions[45]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[46])} alt={allPositions[46]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[47])} alt={allPositions[47]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[48])} alt={allPositions[48]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[49])} alt={allPositions[49]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[50])} alt={allPositions[50]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[51])} alt={allPositions[51]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[52])} alt={allPositions[52]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[53])} alt={allPositions[53]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[54])} alt={allPositions[54]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[55])} alt={allPositions[55]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[56])} alt={allPositions[56]} />
                    </div>
                </div>

                <div className="flex-container2">
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[57])} alt={allPositions[57]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[58])} alt={allPositions[58]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[59])} alt={allPositions[59]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[60])} alt={allPositions[60]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[61])} alt={allPositions[61]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[62])} alt={allPositions[62]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[63])} alt={allPositions[63]} />
                    </div>
                    <div className="eachDiv">
                        <img style={pieceStyle} src={renderSwitch(allPositions[64])} alt={allPositions[64]} />
                    </div>
                </div>
            </div>

        </>
    )
}