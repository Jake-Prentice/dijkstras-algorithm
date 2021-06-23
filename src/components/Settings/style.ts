import styled, { css } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

export const SetStartPosButton = styled.button<{isSelected: boolean}>`

    cursor: pointer;
    outline: none;
    border: none;
    ${props => props.isSelected && css`
        box-shadow: 0 0 0 2px black;
    `}
    padding: 0.4rem 0.6rem;
    border-radius: 0.4em;

    * {
        font-size: 1.5rem;
    }

    transition: transform 0.3s ease;
    :hover {
        transform: scale(1.05);
    }
`

export const SetStartPosWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(0,0,0,.05);
    padding: 0.6rem 1rem;
`
export const SliderWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
`