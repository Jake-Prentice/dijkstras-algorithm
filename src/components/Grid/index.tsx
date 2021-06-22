import React, { useEffect, useState } from 'react'
import {useImmer} from "use-immer"
import dijkstrasAlgorithm, { getShortestPathFromNode, ICellPos } from '../../utils/dijkstra';
import {RowWrapper, CellWrapper, StartPosButton, GridWrapper, StartPos, EndPos} from "./style";

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
}


const Grid = ({isChangingEndPos, isChangingStartPos}: IGridProps) => {
    const [grid, setGrid] = useImmer<ICell[][]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startPos, setStartPos] = useState<ICellPos>({row: 0, col: 0})
    const [endPos, setEndPos] = useState<ICellPos>({row: 19, col: 19});

    useEffect(() => {
        setGrid(getInitialGrid({rows: 20, cols: 20}))
    }, [])

  
    const drawWall = (row: number, col: number) => {
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

    const startDijkstra = () => {
        const res = dijkstrasAlgorithm({ gridRef: grid, startPos, endPos })
        const path = res?.shortestPath!;
        
        for (let i=0; i<path.length; i++) {
            setGrid(draft => {
                draft[path[i].row][path[i].col].isInShortestPath = true;
            })
        }
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
        <button onClick={startDijkstra}>Start Dijkstra</button>
       
        </>
    )
}

export default Grid;
