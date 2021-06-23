import React, { useEffect, useState } from 'react';
import Grid from "./Grid";
import {GlobalStyle, MainLayout, TopLayout} from "./App.style";
import Settings from './Settings';
import { ICellPos } from '../utils/dijkstra';

function App() {

  const [isChangingStartPos, setIsChangingStartPos] = useState(false);
  const [isChangingEndPos, setIsChangingEndPos] = useState(false);

  const [pathSpeed, setPathSpeed] = useState(50);
  const [showVisitedNodes, setShowVisitedNodes] = useState(false);

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
                setShowVisitedNodes={setShowVisitedNodes}
                showVisitedNodes={showVisitedNodes}
            />
        </TopLayout>
        <MainLayout>
            <Grid 
               isChangingStartPos={isChangingStartPos}
               isChangingEndPos={isChangingEndPos}
               pathSpeed={pathSpeed}
               showVisitedNodes={showVisitedNodes}
            />
        </MainLayout>
    </>
  )
}

export default App;
