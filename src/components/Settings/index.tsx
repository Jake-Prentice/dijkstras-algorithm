import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { ICellPos } from '../../utils/dijkstra';
import { CheckBoxWrapper, SetStartPosButton, SetStartPosWrapper, SliderWrapper } from './style';
import { Margin } from '../shared/spacing';
import Slider, {Range} from "rc-slider";
import 'rc-slider/assets/index.css'


interface ISettingsProps {
    setIsChangingStartPos: React.Dispatch<React.SetStateAction<boolean>>;
    setIsChangingEndPos: React.Dispatch<React.SetStateAction<boolean>>;
    isChangingEndPos: boolean;
    isChangingStartPos: boolean;
    pathSpeed: number;
    setPathSpeed: React.Dispatch<React.SetStateAction<number>>;
    setShowVisitedNodes: React.Dispatch<React.SetStateAction<boolean>>;
    showVisitedNodes: boolean
}

const Settings = ({ 
    setIsChangingStartPos,
    setIsChangingEndPos,
    isChangingEndPos,
    isChangingStartPos,
    setPathSpeed,
    pathSpeed,
    setShowVisitedNodes,
    showVisitedNodes
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
            <Margin left={"3rem"} />
            <SliderWrapper>
                <div>
                    Path Speed (ms)
                    <Slider onChange={value => setPathSpeed(value)} style={{width: "200px"}} min={0} max={1000}/>
                </div>
                {pathSpeed}
            </SliderWrapper>
            <Margin right={"3rem"} /> 
            <CheckBoxWrapper>     
                Show Visited Nodes
                <Margin right={"1rem"} />
                <input onChange={e => setShowVisitedNodes(e.target.checked)} checked={showVisitedNodes} type="checkbox" />
            </CheckBoxWrapper>
        </>
    )
}

export default Settings;
