import React, { useEffect, useState } from 'react';
import Grid from "./Grid";
import {GlobalStyle, MainLayout, TopLayout} from "./App.style";
import Settings from './Settings';
import { ICellPos } from '../utils/dijkstra';

function App() {

  const [isChangingStartPos, setIsChangingStartPos] = useState(false);
  const [isChangingEndPos, setIsChangingEndPos] = useState(false);

  const [pathSpeed, setPathSpeed] = useState(200);

  return (
    <>
        <GlobalStyle />
        <TopLayout>
            <Settings 
                setIsChangingEndPos={setIsChangingEndPos}
                setIsChangingStartPos={setIsChangingStartPos}
                isChangingStartPos={isChangingStartPos}
                isChangingEndPos={isChangingEndPos}
                setPathSpeed={setPathSpeed}
                pathSpeed={pathSpeed}
            />
        </TopLayout>
        <MainLayout>
            <Grid 
               isChangingStartPos={isChangingStartPos}
               isChangingEndPos={isChangingEndPos}
               pathSpeed={pathSpeed}
            />
        </MainLayout>
    </>
  )
}

export default App;
