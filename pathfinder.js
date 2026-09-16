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

    grid[startY][startX] = 0;

    let walls = [];
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    if (gridSize > 1) {
        // seed the cells touching the start corner
        if (startX > 0) walls.push([startX - 1, startY]);
        if (startX < gridSize - 1) walls.push([startX + 1, startY]);
        if (startY > 0) walls.push([startX, startY - 1]);
        if (startY < gridSize - 1) walls.push([startX, startY + 1]);
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
    grid[exitY][exitX] = 0;

if (gridSize > 1) {
    if (exitY < gridSize - 1) {
        grid[exitY + 1][exitX] = 0;
    } else {
        grid[exitY - 1][exitX] = 0;
    }
}
    }
function isSolvable(grid, size) {
    let visited = Array.from({ length: size }, () =>
        Array(size).fill(false)
    );

    let queue = [{ x: startX, y: startY }];
    visited[startY][startX] = true;

    const dirs = [
        [1,0], [-1,0], [0,1], [0,-1]
    ];

    while (queue.length) {
        let { x, y } = queue.shift();

        if (x === exitX && y === exitY) return true;

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

    return false;
}