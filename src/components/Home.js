import React from 'react';
import { useContext } from 'react';

import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css';
import { Square } from './Square';

export default function Home(props) {
    const pieceStyle = { maxHeight: '100%', maxWidth: '100%', };

    const context = useContext(PositionContext);
    const { allPositions, glowSqs, updateGlowSqs } = context;

    console.log(1, allPositions[1]);
    return (

            < div className="flex-container1">
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={1} />
                    <Square ind={2} />
                    <Square ind={3} />
                    <Square ind={4} />
                    <Square ind={5} />
                    <Square ind={6} />
                    <Square ind={7} />
                    <Square ind={8} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={9} />
                    <Square ind={10} />
                    <Square ind={11} />
                    <Square ind={12} />
                    <Square ind={13} />
                    <Square ind={14} />
                    <Square ind={15} />
                    <Square ind={16} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={17} />
                    <Square ind={18} />
                    <Square ind={19} />
                    <Square ind={20} />
                    <Square ind={21} />
                    <Square ind={22} />
                    <Square ind={23} />
                    <Square ind={24} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={25} />
                    <Square ind={26} />
                    <Square ind={27} />
                    <Square ind={28} />
                    <Square ind={29} />
                    <Square ind={30} />
                    <Square ind={31} />
                    <Square ind={32} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={33} />
                    <Square ind={34} />
                    <Square ind={35} />
                    <Square ind={36} />
                    <Square ind={37} />
                    <Square ind={38} />
                    <Square ind={39} />
                    <Square ind={40} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={41} />
                    <Square ind={42} />
                    <Square ind={43} />
                    <Square ind={44} />
                    <Square ind={45} />
                    <Square ind={46} />
                    <Square ind={47} />
                    <Square ind={48} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={49} />
                    <Square ind={50} />
                    <Square ind={51} />
                    <Square ind={52} />
                    <Square ind={53} />
                    <Square ind={54} />
                    <Square ind={55} />
                    <Square ind={56} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={57} />
                    <Square ind={58} />
                    <Square ind={59} />
                    <Square ind={60} />
                    <Square ind={61} />
                    <Square ind={62} />
                    <Square ind={63} />
                    <Square ind={64} />
                </div>

            </div>

    )
}