import React, { useEffect, useState } from 'react';
import Grid from "./Grid";
import {GlobalStyle, MainLayout, TopLayout} from "./App.style";
import Settings from './Settings';
import { ICellPos } from '../utils/dijkstra';

function App() {

  const [isChangingStartPos, setIsChangingStartPos] = useState(false);
  const [isChangingEndPos, setIsChangingEndPos] = useState(false);

  return (
    <>
        <GlobalStyle />
        <TopLayout>
            <Settings 
                setIsChangingEndPos={setIsChangingEndPos}
                setIsChangingStartPos={setIsChangingStartPos}
                isChangingStartPos={isChangingStartPos}
                isChangingEndPos={isChangingEndPos}
            />
        </TopLayout>
        <MainLayout>
            <Grid 
               isChangingStartPos={isChangingStartPos}
               isChangingEndPos={isChangingEndPos}
            />
        </MainLayout>
    </>
  )
}

export default App;
