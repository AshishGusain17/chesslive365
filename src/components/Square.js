import { useContext } from 'react';
import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css'

import br1 from '../assets/pieces/gothic/br.png';
import bn1 from '../assets/pieces/gothic/bn.png';
import bb1 from '../assets/pieces/gothic/bb.png';
import bk1 from '../assets/pieces/gothic/bk.png';
import bq1 from '../assets/pieces/gothic/bq.png';
import bp1 from '../assets/pieces/gothic/bp.png';
import wr1 from '../assets/pieces/gothic/wr.png';
import wn1 from '../assets/pieces/gothic/wn.png';
import wb1 from '../assets/pieces/gothic/wb.png';
import wk1 from '../assets/pieces/gothic/wk.png';
import wq1 from '../assets/pieces/gothic/wq.png';
import wp1 from '../assets/pieces/gothic/wp.png';

import br2 from '../assets/pieces/graffiti/br.png';
import bn2 from '../assets/pieces/graffiti/bn.png';
import bb2 from '../assets/pieces/graffiti/bb.png';
import bk2 from '../assets/pieces/graffiti/bk.png';
import bq2 from '../assets/pieces/graffiti/bq.png';
import bp2 from '../assets/pieces/graffiti/bp.png';
import wr2 from '../assets/pieces/graffiti/wr.png';
import wn2 from '../assets/pieces/graffiti/wn.png';
import wb2 from '../assets/pieces/graffiti/wb.png';
import wk2 from '../assets/pieces/graffiti/wk.png';
import wq2 from '../assets/pieces/graffiti/wq.png';
import wp2 from '../assets/pieces/graffiti/wp.png';

import br3 from '../assets/pieces/lolz/br.png';
import bn3 from '../assets/pieces/lolz/bn.png';
import bb3 from '../assets/pieces/lolz/bb.png';
import bk3 from '../assets/pieces/lolz/bk.png';
import bq3 from '../assets/pieces/lolz/bq.png';
import bp3 from '../assets/pieces/lolz/bp.png';
import wr3 from '../assets/pieces/lolz/wr.png';
import wn3 from '../assets/pieces/lolz/wn.png';
import wb3 from '../assets/pieces/lolz/wb.png';
import wk3 from '../assets/pieces/lolz/wk.png';
import wq3 from '../assets/pieces/lolz/wq.png';
import wp3 from '../assets/pieces/lolz/wp.png';

import br4 from '../assets/pieces/metal/br.png';
import bn4 from '../assets/pieces/metal/bn.png';
import bb4 from '../assets/pieces/metal/bb.png';
import bk4 from '../assets/pieces/metal/bk.png';
import bq4 from '../assets/pieces/metal/bq.png';
import bp4 from '../assets/pieces/metal/bp.png';
import wr4 from '../assets/pieces/metal/wr.png';
import wn4 from '../assets/pieces/metal/wn.png';
import wb4 from '../assets/pieces/metal/wb.png';
import wk4 from '../assets/pieces/metal/wk.png';
import wq4 from '../assets/pieces/metal/wq.png';
import wp4 from '../assets/pieces/metal/wp.png';

import br5 from '../assets/pieces/neo/br.png';
import bn5 from '../assets/pieces/neo/bn.png';
import bb5 from '../assets/pieces/neo/bb.png';
import bk5 from '../assets/pieces/neo/bk.png';
import bq5 from '../assets/pieces/neo/bq.png';
import bp5 from '../assets/pieces/neo/bp.png';
import wr5 from '../assets/pieces/neo/wr.png';
import wn5 from '../assets/pieces/neo/wn.png';
import wb5 from '../assets/pieces/neo/wb.png';
import wk5 from '../assets/pieces/neo/wk.png';
import wq5 from '../assets/pieces/neo/wq.png';
import wp5 from '../assets/pieces/neo/wp.png';



export const Square = (props) => {
    const context = useContext(PositionContext);
    const { allPositions1, glowSqs1, allPositions2, glowSqs2 } = context;



    let allPositions, glowSqs;
    if (props.home_1_or_live_2 === 1) {
        allPositions = allPositions1;
        glowSqs = glowSqs1;
    }
    else {
        allPositions = allPositions2;
        glowSqs = glowSqs2;
    }


    const pieceStyle = { maxHeight: '100%', maxWidth: '100%', };

    const renderSwitch = (param) => {
        if (props.chessSet.ind === 1) {
            switch (param) {
                case 'br': return br1;
                case 'bn': return bn1;
                case 'bb': return bb1;
                case 'bk': return bk1;
                case 'bq': return bq1;
                case 'bp': return bp1;
                case 'wr': return wr1;
                case 'wn': return wn1;
                case 'wb': return wb1;
                case 'wk': return wk1;
                case 'wq': return wq1;
                case 'wp': return wp1;
                default: return;
            }
        }
        else if (props.chessSet.ind === 2) {
            switch (param) {
                case 'br': return br2;
                case 'bn': return bn2;
                case 'bb': return bb2;
                case 'bk': return bk2;
                case 'bq': return bq2;
                case 'bp': return bp2;
                case 'wr': return wr2;
                case 'wn': return wn2;
                case 'wb': return wb2;
                case 'wk': return wk2;
                case 'wq': return wq2;
                case 'wp': return wp2;
                default: return;
            }
        }
        else if (props.chessSet.ind === 3) {
            switch (param) {
                case 'br': return br3;
                case 'bn': return bn3;
                case 'bb': return bb3;
                case 'bk': return bk3;
                case 'bq': return bq3;
                case 'bp': return bp3;
                case 'wr': return wr3;
                case 'wn': return wn3;
                case 'wb': return wb3;
                case 'wk': return wk3;
                case 'wq': return wq3;
                case 'wp': return wp3;
                default: return;
            }
        }
        else if (props.chessSet.ind === 4) {
            switch (param) {
                case 'br': return br4;
                case 'bn': return bn4;
                case 'bb': return bb4;
                case 'bk': return bk4;
                case 'bq': return bq4;
                case 'bp': return bp4;
                case 'wr': return wr4;
                case 'wn': return wn4;
                case 'wb': return wb4;
                case 'wk': return wk4;
                case 'wq': return wq4;
                case 'wp': return wp4;
                default: return;
            }
        }
        else if (props.chessSet.ind === 5) {
            switch (param) {
                case 'br': return br5;
                case 'bn': return bn5;
                case 'bb': return bb5;
                case 'bk': return bk5;
                case 'bq': return bq5;
                case 'bp': return bp5;
                case 'wr': return wr5;
                case 'wn': return wn5;
                case 'wb': return wb5;
                case 'wk': return wk5;
                case 'wq': return wq5;
                case 'wp': return wp5;
                default: return;
            }
        }
    }
    
    let col = 1;
    switch (props.sqCol) {
        case 1: col = styles.col1; break;
        case 2: col = styles.col2; break;
        case 3: col = styles.col3; break;
        case 4: col = styles.col4; break;
        case 5: col = styles.col5; break;
        default: col = styles.col1; break;
    }

    return (
        <div className={glowSqs[props.ind] ? `${styles.maindiv} ${styles.eachDiv} ${col}` : `${styles.eachDiv} ${col}`}
            onClick={() => { props.squareClicked(props.ind) }}>
            <img style={pieceStyle} src={renderSwitch(allPositions[props.ind])} alt={allPositions[props.ind]} />
            <div className={styles.centered}>{props.ind}</div>
        </div>
    )
}
