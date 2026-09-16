function safeGet(y, x) {
    return grid[y] && grid[y][x];
}

function generateMaze() {

    grid = [];

for (let y = 0; y < gridSize; y++) {
    grid[y] = [];
    for (let x = 0; x < gridSize; x++) {
        grid[y][x] = 1; // ALL WALLS FIRST
    }
}

    grid[0][0] = 0;

    let walls = [];
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    if (gridSize > 1) {
        walls.push([1, 0]);
        walls.push([0, 1]);
    }

    while (walls.length > 0) {

        let randIndex = Math.floor(Math.random() * walls.length);
        let [x, y] = walls.splice(randIndex, 1)[0];

        let paths = 0;

        for (let [dx, dy] of dirs) {
            let nx = x + dx;
            let ny = y + dy;

            if (
                nx >= 0 && ny >= 0 &&
                nx < gridSize && ny < gridSize &&
                safeGet(ny, nx) === 0
            ) {
                paths++;
            }
        }

        if (paths === 1) {

            grid[y][x] = 0;

            for (let [dx, dy] of dirs) {
                let nx = x + dx;
                let ny = y + dy;

                if (
                    nx >= 0 && ny >= 0 &&
                    nx < gridSize && ny < gridSize &&
                    safeGet(ny, nx) === 1
                ) {
                    walls.push([nx, ny]);
                }
            }
        }
    }

    // FINAL EXIT FIX (important)
    grid[gridSize - 1][gridSize - 1] = 0;

if (gridSize > 1) {
    grid[gridSize - 2][gridSize - 1] = 0;
}
    }
function isSolvable(grid, size) {
    let visited = Array.from({ length: size }, () =>
        Array(size).fill(false)
    );

    let queue = [{ x: 0, y: 0 }];
    visited[0][0] = true;

    const dirs = [
        [1,0], [-1,0], [0,1], [0,-1]
    ];

    while (queue.length) {
        let { x, y } = queue.shift();

        if (x === size - 1 && y === size - 1) return true;

        for (let [dx, dy] of dirs) {
            let nx = x + dx;
            let ny = y + dy;

            if (
                nx >= 0 && ny >= 0 &&
                nx < size && ny < size &&
                !visited[ny][nx] &&
                grid[ny][nx] === 0
            ) {
                visited[ny][nx] = true;
                queue.push({ x: nx, y: ny });
            }
        }
    }
return false
}

function solveUsingArrowKeys(){
    
}