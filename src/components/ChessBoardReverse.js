import React from 'react'
import styles from '../css/squares.module.css';
import { Square } from './Square';

export const ChessBoardReverse = (props) => {
    const squareClicked = props.squareClicked;
    const home_1_or_live_2 = props.home_1_or_live_2;

    return (
        < div className="flex-container1">
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={64} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={63} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={62} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={61} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={60} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={59} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={58} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={57} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={56} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={55} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={54} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={53} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={52} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={51} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={50} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={49} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={48} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={47} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={46} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={45} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={44} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={43} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={42} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={41} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={40} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={39} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={38} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={37} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={36} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={35} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={34} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={33} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={32} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={31} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={30} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={29} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={28} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={27} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={26} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={25} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={24} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={23} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={22} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={21} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={20} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={19} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={18} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={17} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={16} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={15} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={14} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={13} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={12} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={11} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={10} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={9} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={8} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={7} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={6} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={5} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={4} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={3} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={2} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
                <Square ind={1} home_1_or_live_2={home_1_or_live_2} squareClicked={squareClicked} chessSet = {props.chessSet} />
            </div>

        </div>

    )
}

