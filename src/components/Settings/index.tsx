import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { ICellPos } from '../../utils/dijkstra';
import { SetStartPosButton, SetStartPosWrapper } from './style';
import { Margin } from '../shared/spacing';



interface ISettingsProps {
    setIsChangingStartPos: React.Dispatch<React.SetStateAction<boolean>>;
    setIsChangingEndPos: React.Dispatch<React.SetStateAction<boolean>>;
    isChangingEndPos: boolean;
    isChangingStartPos: boolean;
}

const Settings = ({
    setIsChangingStartPos,
    setIsChangingEndPos,
    isChangingEndPos,
    isChangingStartPos
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
        </>
    )
}

export default Settings;
