import styled, {createGlobalStyle} from "styled-components";


export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    } 

    html {
        font-size: 16px;
    }

    body {
        font-family: sans-serif;
    }
    
    body, html, #root {
        height: 100%;    
        width: 100%;
    }

`

export const TopLayout = styled.div`
    height: 100px;
    box-shadow: 0 0 20px rgba(0,0,0,.2);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const MainLayout = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4rem 0;
`