import { ICell } from "../components/Grid";
import cloneDeep from "lodash.clonedeep";

export interface ICellPos {row: number; col: number;}

interface IDijkstrasAlgorithm {
    gridRef: ICell[][];
    startPos: ICellPos;
    endPos: ICellPos; 
}


const dijkstrasAlgorithm = ({gridRef, startPos, endPos}: IDijkstrasAlgorithm) => {
    
    //copy
    const grid: ICell[][] = cloneDeep(gridRef);

    grid[startPos.row][startPos.col].distToStart = 0;

    const visitedNodes: ICell[] = [];
    const unvisitedNodes = grid.flat();

    //keep going until no more unvisited nodes
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        //closest element to the starting position
        const closestNode = unvisitedNodes.shift();

        if (!closestNode) break;

        if (closestNode.isWall) continue;
        
        //reaches the end
        if (closestNode === grid[endPos.row][endPos.col]) break

        const neighborNodes = getUnvisitedNeighbors(closestNode, grid);

        for (let neighbor of neighborNodes) {

            const distFromClosestNode = ((neighbor.col - closestNode.col)**2 + (neighbor.row - closestNode.row)**2)**0.5;
            const neighborNewDistToStart = closestNode.distToStart + distFromClosestNode;
            
            if (neighbor.distToStart > neighborNewDistToStart) {

                neighbor.distToStart = neighborNewDistToStart;
                neighbor.previousNode = closestNode;
            }
            
        }

        //once all the neighbor node's distToStarts have been updated, the node has been visited
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
    }

    const shortestPath = getShortestPathFromNode(grid[endPos.row][endPos.col])

    return {grid, visitedNodes, shortestPath}
}


const sortNodesByDistance = (nodes: ICell[]) => {
    nodes.sort((nodeA, nodeB) => nodeA.distToStart - nodeB.distToStart);
}

const getUnvisitedNeighbors = (node: ICell, grid: ICell[][]) => {
    const neighbors = [];
    const {col, row} = node;
    //node above
    if (row > 0) neighbors.push(grid[row - 1][col]);
    //node below
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    //node left
    if (col > 0) neighbors.push(grid[row][col - 1]);
    //node right
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    //diagonals:
    //bottom-right
    if (row < grid.length - 1 && col < grid[0].length - 1) neighbors.push(grid[row + 1][col + 1])
    //bottom-left
    if (row < grid.length - 1 && col > 0 ) neighbors.push(grid[row + 1][col - 1])
    //top-right
    if (row > 0 && col < grid[0].length - 1) neighbors.push(grid[row - 1][col + 1])
    //top-left
    if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1])

    return neighbors.filter(neighbor => !neighbor.isVisited);
}


export const getShortestPathFromNode = (endNode: ICell) => {
    const path: ICell[] = [];
    let currentNode: ICell = endNode;

    while (currentNode.previousNode) {
        //unshift adds to the beginning of the array
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    //the starting position
    path.unshift(currentNode);

    return path;
}

export default dijkstrasAlgorithm;