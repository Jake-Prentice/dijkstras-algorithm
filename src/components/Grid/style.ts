import styled, { css } from "styled-components";
import { ICell } from ".";
import { faBullseye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RowWrapper = styled.div`
    display: flex;
    height: 30px;
    border-bottom: 2px solid grey;

    :first-child {
        background-color: red;
    }
`


export const CellWrapper = styled.button<Partial<ICell>>`
    width: 30px;
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