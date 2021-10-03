import { useContext } from 'react';
import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css'

import br from '../assets/pieces/br.jpg';
import bn from '../assets/pieces/bn.jpg';
import bb from '../assets/pieces/bb.jpg';
import bk from '../assets/pieces/bk.jpg';
import bq from '../assets/pieces/bq.jpg';
import bp from '../assets/pieces/bp.jpg';
import wr from '../assets/pieces/wr.jpg';
import wn from '../assets/pieces/wn.jpg';
import wb from '../assets/pieces/wb.jpg';
import wk from '../assets/pieces/wk.jpg';
import wq from '../assets/pieces/wq.jpg';
import wp from '../assets/pieces/wp.jpg';

export const Square = (props) => {
    const context = useContext(PositionContext);
    const { allPositions, glowSqs } = context;

    const pieceStyle = { maxHeight: '100%', maxWidth: '100%', };


    const renderSwitch = (param) => {
        switch (param) {
            case 'br': return br;
            case 'bn': return bn;
            case 'bb': return bb;
            case 'bk': return bk;
            case 'bq': return bq;
            case 'bp': return bp;
            case 'wr': return wr;
            case 'wn': return wn;
            case 'wb': return wb;
            case 'wk': return wk;
            case 'wq': return wq;
            case 'wp': return wp;
            default: return;
        }
    }

    return (
        <div className={glowSqs[props.ind] ? `${styles.maindiv} ${styles.maindiv2}  ${styles.eachDiv}` : styles.eachDiv}
            onClick={()=>{props.squareClicked(props.ind)}}>
            <img style={pieceStyle} src={renderSwitch(allPositions[props.ind])} alt={allPositions[props.ind]} />
        </div>
    )
}
