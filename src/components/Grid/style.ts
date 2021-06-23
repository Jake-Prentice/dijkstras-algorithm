import styled, { css } from "styled-components";
import { ICell } from ".";
import { faBullseye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cellSize = "30px";

export const RowWrapper = styled.div`
    display: flex;
    height: ${cellSize};
    border-bottom: 2px solid grey;

    :first-child {
        background-color: red;
    }
`


export const CellWrapper = styled.button<Partial<ICell>>`
    width: ${cellSize};
    cursor: pointer;
    border: none;
    border-right: 2px solid grey;
    position: relative;
    ${props => props.isWall && css`
        background: black
    `}

    ${props => props.isInShortestPath && css`
        background: red;
    `}
`

export const StartPosButton = styled.button``


export const GridWrapper = styled.div`
    border-top: 2px solid grey;
    border-left: 2px solid grey;
`

export const StartPos = styled(FontAwesomeIcon).attrs({
    icon: faBullseye
})`

    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    font-size: 1.3rem;

`

export const EndPos = styled(FontAwesomeIcon).attrs({
    icon: faMapMarkerAlt
})`

    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    font-size: 1.3rem;
`

export const PositionWrapper = styled.div`
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    font-size: 1.3rem;
`

export const StartButton = styled.button`
    padding: 1em 1em;
    border-radius: 7px;
    border: none;
    background: #8998ff;
    color: white;
    cursor: pointer;

    transition: transform 0.3s ease;
    :hover {
        transform: scale(1.05);
    }
`