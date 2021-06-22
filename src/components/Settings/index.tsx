import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { ICellPos } from '../../utils/dijkstra';
import { SetStartPosButton, SetStartPosWrapper, SliderWrapper } from './style';
import { Margin } from '../shared/spacing';
import Slider, {Range} from "rc-slider";
import 'rc-slider/assets/index.css'


interface ISettingsProps {
    setIsChangingStartPos: React.Dispatch<React.SetStateAction<boolean>>;
    setIsChangingEndPos: React.Dispatch<React.SetStateAction<boolean>>;
    isChangingEndPos: boolean;
    isChangingStartPos: boolean;
    pathSpeed: number;
    setPathSpeed: React.Dispatch<React.SetStateAction<number>>
}

const Settings = ({ 
    setIsChangingStartPos,
    setIsChangingEndPos,
    isChangingEndPos,
    isChangingStartPos,
    setPathSpeed,
    pathSpeed
}: ISettingsProps) => {

   

    return (
        <>
            <SetStartPosWrapper>
                Start Position
                <Margin right={"1rem"} />
                <SetStartPosButton 
                    onClick={() =>{
                        setIsChangingStartPos(prev => !prev)
                        setIsChangingEndPos(false);  
                    }}
                    isSelected={isChangingStartPos}
                >
                    <FontAwesomeIcon icon={faBullseye} />
                </SetStartPosButton>
            </SetStartPosWrapper>
            <Margin right={"4rem"} />
            <SetStartPosWrapper>
                End Position
                <Margin right={"1rem"} />
                <SetStartPosButton 
                    onClick={() => {
                        setIsChangingEndPos(prev => !prev)
                        setIsChangingStartPos(false);
                    }}
                    isSelected={isChangingEndPos}
                >
                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                </SetStartPosButton>
            </SetStartPosWrapper>
            <Margin left={"2rem"} />
            <SliderWrapper>
                <div>
                    Path Speed (ms)
                    <Slider onChange={value => setPathSpeed(value)} style={{width: "200px"}} min={0} max={1000}/>
                </div>
                {pathSpeed}
            </SliderWrapper>
        </>
    )
}

export default Settings;
