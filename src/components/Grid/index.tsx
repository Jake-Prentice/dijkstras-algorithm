import React, { useEffect, useState } from 'react'
import {useImmer} from "use-immer"
import dijkstrasAlgorithm, { getShortestPathFromNode, ICellPos } from '../../utils/dijkstra';
import { Margin } from '../shared/spacing';
import {RowWrapper, CellWrapper, StartPosButton, GridWrapper, StartPos, EndPos, StartButton} from "./style";

export interface ICell {
    isWall: boolean;
    distToStart: number;
    row: number;
    col: number;
    isVisited: boolean;
    previousNode?: ICell;
    isInShortestPath: boolean;
    isStartPos: boolean;
    isEndPos: boolean;
}


const getInitialGrid = (
    {rows, cols}: 
    {rows: number; cols: number;}
) => {    
    const grid: ICell[][] = [];
    for (let row=0; row < rows; row++) {
        grid[row] = [];
        for (let col=0; col < cols; col++) {
            grid[row][col] = {
                isWall: false,
                distToStart: Infinity,
                row,
                col,
                isVisited: false,
                isInShortestPath: false,
                isStartPos: false,
                isEndPos: false
            };
        }
    }
    return grid;
}



interface IGridProps {
    isChangingStartPos: boolean;
    isChangingEndPos: boolean;
    pathSpeed: number;
    showVisitedNodes: boolean;
}


const Grid = ({isChangingEndPos, isChangingStartPos, pathSpeed, showVisitedNodes}: IGridProps) => {
    const [grid, setGrid] = useImmer<ICell[][]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startPos, setStartPos] = useState<ICellPos>({row: 0, col: 0})
    const [endPos, setEndPos] = useState<ICellPos>({row: 19, col: 19});

    const [shortestPath, setShortestPath] = useState<ICell[]>([]);
    const [visitedNodes, setVisitedNodes] = useState<ICell[]>([]);

    const startDijkstra = () => {
        const res = dijkstrasAlgorithm({
            gridRef: grid,
            startPos,
            endPos
        })
        
        if (!res) return;

        if (showVisitedNodes) setVisitedNodes(res.visitedNodes); 
        setShortestPath(res.shortestPath);
    }


    useEffect(() => {
        if (!!shortestPath.length && visitedNodes.length === 0) {
            setTimeout(() => {
                const row = shortestPath[0].row;
                const col = shortestPath[0].col;
                
                const cell: HTMLButtonElement = document.querySelector(`.cell-${row}-${col}`)! ;
                const style ={background: "yellow"}


                Object.assign(cell.style, style);

                setShortestPath(prev => prev.slice(1)) 
            }, pathSpeed)
        }
    }, [shortestPath, pathSpeed, visitedNodes])


    useEffect(() => {
        if (!!visitedNodes.length) {

            setTimeout(() => {
                const row = visitedNodes[0].row;
                const col = visitedNodes[0].col;
                
                const cell: HTMLButtonElement = document.querySelector(`.cell-${row}-${col}`)! ;
                const style ={background: "purple"}
                
                Object.assign(cell.style, style); 

                setVisitedNodes(prev => prev.slice(1)) 
            }, 0)
        }
    }, [visitedNodes, pathSpeed])



    useEffect(() => {
        setGrid(getInitialGrid({rows: 20, cols: 20}))
    }, [])

  
    const drawWall = (row: number, col: number) => {
        if (!!shortestPath.length) return;
        setGrid(draft => {draft[row][col].isWall = true})
    }

    const OnClickCell = (row: number, col: number) => {
       if (isChangingStartPos) {
            setStartPos({row, col})
            return;
       }

       if (isChangingEndPos) {
           setEndPos({row, col})
           return;
       }
       drawWall(row, col); 
    }

   
    return (
        <>
        <GridWrapper
            onMouseDown={() => setIsMouseDown(true)} 
            onMouseUp={() => setIsMouseDown(false)}
        >
            {grid.map((r, rIndex) => (
                <RowWrapper key={rIndex}>
                    {r.map((c, cIndex) => {
                        const isStartPos = startPos.row === rIndex && startPos.col === cIndex;
                        const isEndPos = endPos.row === rIndex && endPos.col === cIndex;

                        return (
                            <CellWrapper 
                                className={`cell-${rIndex}-${cIndex}`}
                                key={cIndex}
                                onMouseOver={() => isMouseDown && drawWall(rIndex, cIndex)}
                                onClick={() => OnClickCell(rIndex, cIndex)}
                                isWall={c.isWall}
                                isInShortestPath={c.isInShortestPath}
                            >
                                {isStartPos && (
                                    <StartPos />
                                )}

                                {isEndPos && (
                                    <EndPos />
                                )}
                            </CellWrapper>
                        )
                    })}
                </RowWrapper>
            ))}
        </GridWrapper>
        <Margin bottom={"2rem"} />
        <StartButton onClick={startDijkstra}>Start Dijkstra</StartButton>
        
        </>
    )
}

export default Grid;
