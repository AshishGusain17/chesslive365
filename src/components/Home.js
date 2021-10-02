import React from 'react';
import { useContext } from 'react';

import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css';
import { Square } from './Square';

export default function Home(props) {

    const context = useContext(PositionContext);
    const { glowSqs, updateGlowSqs } = context;

    const squareClicked = (square_id)=>{
        console.log("clicked square ", square_id)
        const copyGlowSqs = {...glowSqs};
        copyGlowSqs[square_id] = 1;
        // console.log(copyGlowSqs);
        updateGlowSqs(copyGlowSqs);
    }

    return (
            < div className="flex-container1">
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={1} squareClicked = {squareClicked}/>
                    <Square ind={2} squareClicked = {squareClicked} />
                    <Square ind={3} squareClicked = {squareClicked} />
                    <Square ind={4} squareClicked = {squareClicked} />
                    <Square ind={5} squareClicked = {squareClicked} />
                    <Square ind={6} squareClicked = {squareClicked} />
                    <Square ind={7} squareClicked = {squareClicked} />
                    <Square ind={8} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={9} squareClicked = {squareClicked} />
                    <Square ind={10} squareClicked = {squareClicked} />
                    <Square ind={11} squareClicked = {squareClicked} />
                    <Square ind={12} squareClicked = {squareClicked} />
                    <Square ind={13} squareClicked = {squareClicked} />
                    <Square ind={14} squareClicked = {squareClicked} />
                    <Square ind={15} squareClicked = {squareClicked} />
                    <Square ind={16} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={17} squareClicked = {squareClicked} />
                    <Square ind={18} squareClicked = {squareClicked} />
                    <Square ind={19} squareClicked = {squareClicked} />
                    <Square ind={20} squareClicked = {squareClicked} />
                    <Square ind={21} squareClicked = {squareClicked} />
                    <Square ind={22} squareClicked = {squareClicked} />
                    <Square ind={23} squareClicked = {squareClicked} />
                    <Square ind={24} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={25} squareClicked = {squareClicked} />
                    <Square ind={26} squareClicked = {squareClicked} />
                    <Square ind={27} squareClicked = {squareClicked} />
                    <Square ind={28} squareClicked = {squareClicked} />
                    <Square ind={29} squareClicked = {squareClicked} />
                    <Square ind={30} squareClicked = {squareClicked} />
                    <Square ind={31} squareClicked = {squareClicked} />
                    <Square ind={32} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={33} squareClicked = {squareClicked} />
                    <Square ind={34} squareClicked = {squareClicked} />
                    <Square ind={35} squareClicked = {squareClicked} />
                    <Square ind={36} squareClicked = {squareClicked} />
                    <Square ind={37} squareClicked = {squareClicked} />
                    <Square ind={38} squareClicked = {squareClicked} />
                    <Square ind={39} squareClicked = {squareClicked} />
                    <Square ind={40} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={41} squareClicked = {squareClicked} />
                    <Square ind={42} squareClicked = {squareClicked} />
                    <Square ind={43} squareClicked = {squareClicked} />
                    <Square ind={44} squareClicked = {squareClicked} />
                    <Square ind={45} squareClicked = {squareClicked} />
                    <Square ind={46} squareClicked = {squareClicked} />
                    <Square ind={47} squareClicked = {squareClicked} />
                    <Square ind={48} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={49} squareClicked = {squareClicked} />
                    <Square ind={50} squareClicked = {squareClicked} />
                    <Square ind={51} squareClicked = {squareClicked} />
                    <Square ind={52} squareClicked = {squareClicked} />
                    <Square ind={53} squareClicked = {squareClicked} />
                    <Square ind={54} squareClicked = {squareClicked} />
                    <Square ind={55} squareClicked = {squareClicked} />
                    <Square ind={56} squareClicked = {squareClicked} />
                </div>
                <div className={`flex-container2 ${styles.wrappper}`}>
                    <Square ind={57} squareClicked = {squareClicked} />
                    <Square ind={58} squareClicked = {squareClicked} />
                    <Square ind={59} squareClicked = {squareClicked} />
                    <Square ind={60} squareClicked = {squareClicked} />
                    <Square ind={61} squareClicked = {squareClicked} />
                    <Square ind={62} squareClicked = {squareClicked} />
                    <Square ind={63} squareClicked = {squareClicked} />
                    <Square ind={64} squareClicked = {squareClicked} />
                </div>

            </div>

    )
}