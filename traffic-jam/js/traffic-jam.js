#! /usr/bin/env node

import { sha1 } from './sha1.js'

export class JamPool {
    constructor() {
        this.pool = {};
    }

    AddJam(jam) {
        this.pool[jam.GetHash()] = jam;
    }

    GetJam(hash) {
        if (hash in this.pool) {
            return this.pool[hash];
        }

        return null;
    }
}

export class Vehicle {
    constructor(shape) {
        this.shape = shape;

        this.maxX = -1;
        this.minX = 10000;
        this.maxY = -1;
        this.minY = 10000;

        for (let i = 0; i < shape.length; i++) {
            let p = shape[i];

            if (p[0] < this.minX) {
                this.minX = p[0];
            }
            if (p[0] > this.maxX) {
                this.maxX = p[0];
            }
            if (p[1] < this.minY) {
                this.minY = p[1];
            }
            if (p[1] > this.maxY) {
                this.maxY = p[1];
            }
        }

        if (this.maxX == this.minX) {
            this.direction = 'y';
        } else if (this.maxY == this.minY) {
            this.direction = 'x';
        } else {
            throw "expect one movable direction";
        }
    }

    GetPossiblePositions(jam) {
        let list = [];

        if (this.direction == 'y') {
            let x = this.minX;
            let l = this.maxY - this.minY + 1;

            let y_range_low = this.minY;
            let y_range_high = this.minY + 1;

            for (let y = y_range_low - 1; y >= 0; y--) {
                if (jam.grid[x][y] >= 0) {
                    break;
                }
                y_range_low = y;
            }
            for (let y = y_range_high; y + l <= jam.height; y++) {
                if (jam.grid[x][y + l - 1] >= 0) {
                    break;
                }
                y_range_high = y + 1;
            }

            for (let y = y_range_low; y < y_range_high; y++) {
                if (y == this.minY) {
                    continue;
                }

                let vehicle = [];
                for (let yy = 0; yy < l; yy++) {
                    vehicle.push([x, y + yy]);
                }
                list.push(vehicle);
            }
        } else {
            let y = this.minY;
            let l = this.maxX - this.minX + 1;

            let x_range_low = this.minX;
            let x_range_high = this.minX + 1;

            for (let x = x_range_low - 1; x >= 0; x--) {
                if (jam.grid[x][y] >= 0) {
                    break;
                }
                x_range_low = x;
            }
            for (let x = x_range_high; x + l <= jam.width; x++) {
                if (jam.grid[x + l - 1][y] >= 0) {
                    break;
                }
                x_range_high = x + 1;
            }

            for (let x = x_range_low; x < x_range_high; x++) {
                if (x == this.minX) {
                    continue;
                }

                let vehicle = [];
                for (let xx = 0; xx < l; xx++) {
                    vehicle.push([x + xx, y]);
                }
                list.push(vehicle);
            }
        }

        return list;
    }
}

export class Jam {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = {};
        this.descriptor = null;
        this.hash = null;

        for (let x = 0; x < width; x++) {
            this.grid[x] = {};
            for (let y = 0; y < height; y++) {
                this.grid[x][y] = -1;
            }
        }

        this.vehicles = [];
    }

    GetHash() {
        if (this.descriptor != null) {
            return this.descriptor;
        }

        this.descriptor = new String("");
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.descriptor += this.grid[x][y] + " ";
            }
            this.descriptor += "\n";
        }

        this.hash = sha1(this.descriptor);
        return this.descriptor;
    }

    IsSolution() {
        if (this.grid[this.width - 1][Math.floor((this.height - 1) / 2)] == 0) {
            return true;
        } else {
            return false;
        }
    }

    AddVehicle(squares) {
        let i = this.vehicles.length;

        this.descriptor = null;

        for (let j = 0; j < squares.length; j++) {
            let pos = squares[j];

            if (this.grid[pos[0]][pos[1]] >= 0) {
                // unroll, return false
                for (let k = 0; k < j; k++) {
                    pos = squares[k];
                    this.grid[pos[0]][pos[1]] = -1;
                }
                return false;
            }

            this.grid[pos[0]][pos[1]] = i;
        }

        this.vehicles.push(new Vehicle(squares));
        return true;
    }

    PopVehicle() {
        let i = this.vehicles.length - 1;

        if (i < 0) {
            return false;
        }

        let squares = this.vehicles[i].shape;

        for (let j = 0; j < squares.length; j++) {
            let pos = squares[j];
            this.grid[pos[0]][pos[1]] = -1;
        }

        this.vehicles.pop();
        return true;
    }

    GetNeighbors(pool) {
        let hashlist = [];

        for (let i = 0; i < this.vehicles.length; i++) {
            let moves = this.vehicles[i].GetPossiblePositions(this);

            for (let j = 0; j < moves.length; j++) {
                let jam = new Jam(this.width, this.height);

                for (let ii = 0; ii < this.vehicles.length; ii++) {
                    if (ii == i) {
                        jam.AddVehicle(moves[j]);
                    } else {
                        jam.AddVehicle(this.vehicles[ii].shape);
                    }
                }

                pool.AddJam(jam);
                hashlist.push(jam.GetHash());
            }
        }

        return hashlist;
    }
}

export function longest_path(jam, pool) {
    let visited = {};
    visited[jam.GetHash()] = [0, null];

    let queue = [jam.GetHash()];
    let maxDist = 0;
    let maxStart = null;

    pool.AddJam(jam);

    while (queue.length > 0) {
        let qhash = queue.shift();
        let distance = visited[qhash][0];

        if (distance > maxDist) {
            maxDist = distance;
            maxStart = qhash;
        }

        let qjam = pool.GetJam(qhash);
        let neighbors = qjam.GetNeighbors(pool);

        for (let i = 0; i < neighbors.length; i++) {
            let nhash = neighbors[i];

            if (nhash in visited) {
                continue;
            }

            queue.push(nhash);
            visited[nhash] = [distance + 1, qhash];
        }
    }

    let path = [];
    let cur = maxStart;

    while (cur != null) {
        path.push(cur);
        cur = visited[cur][1];
    }

    return path;
}

export function distance_to_solution(jam) {
    let pool = new JamPool();
    let visited = {};

    visited[jam.GetHash()] = [0, null];

    let queue = [jam.GetHash()];

    pool.AddJam(jam);

    while (queue.length > 0) {
        let qhash = queue.shift();
        let distance = visited[qhash][0];

        let qjam = pool.GetJam(qhash);

        if (qjam.IsSolution()) {
            return distance;
        }

        let neighbors = qjam.GetNeighbors(pool);

        for (let i = 0; i < neighbors.length; i++) {
            let nhash = neighbors[i];

            if (nhash in visited) {
                continue;
            }

            queue.push(nhash);
            visited[nhash] = [distance + 1, qhash];
        }
    }

    return -1;
}

export function longest_interesting_path(jam, pool) {
    let visited = {};
    visited[jam.GetHash()] = [0, null];

    let queue = [jam.GetHash()];
    let maxDist = 0;
    let maxStart = null;

    pool.AddJam(jam);

    while (queue.length > 0) {
        let qhash = queue.shift();
        let distance = visited[qhash][0];

        let qjam = pool.GetJam(qhash);

        let min_dist = distance_to_solution(qjam);

        if (min_dist < distance) {
            continue;
        }
        if (distance > maxDist) {
            maxDist = distance;
            maxStart = qhash;
        }

        let neighbors = qjam.GetNeighbors(pool);

        for (let i = 0; i < neighbors.length; i++) {
            let nhash = neighbors[i];

            if (nhash in visited) {
                continue;
            }

            queue.push(nhash);
            visited[nhash] = [distance + 1, qhash];
        }
    }

    let path = [];
    let cur = maxStart;

    while (cur != null) {
        path.push(cur);
        cur = visited[cur][1];
    }

    return path;
}

function generate_partitions_rec(sizes, total, list, progress, depth) {
    let min = 0;

    if (depth >= sizes.length) {
        let final = [];

        for (let i = 0; i < progress.length; i++) {
            final.push(progress[i]);
        }

        list.push(final);
        return;
    }

    if (progress.length > 0) {
        let piece = progress[progress.length - 1];
        let max = piece[piece.length - 1];
        min = max + 1;
    }

    let l = sizes[depth];
    for (let start = min; start <= total - l; start++) {
        let piece = [];
        for (let j = 0; j < l; j++) {
            piece.push(start + j);
        }
        progress.push(piece);
        generate_partitions_rec(sizes, total, list, progress, depth + 1);
        progress.pop();
    }
}

function generate_partitions(sizes, total) {
    let list = [];

    generate_partitions_rec(sizes, total, list, [], 0);

    return list;
}

function generate_solution_configurations_recursive(rows, columns, configurations, jam, i) {
    if (i >= rows.length + columns.length) {
        let complete_jam = new Jam(columns.length, rows.length);

        for (let j = 0; j < jam.vehicles.length; j++) {
            complete_jam.AddVehicle(jam.vehicles[j].shape);
        }

        configurations.push(complete_jam);
        return;
    }

    if (i < rows.length) {
        if (rows[i].length == 0) {
            return generate_solution_configurations_recursive(rows, columns, configurations, jam, i + 1);
        }

        let options = generate_partitions(rows[i], columns.length);

        for (let j = 0; j < options.length; j++) {
            let option = options[j];

            let works = true;

            for (let k = 0; works && k < option.length; k++) {
                let shape = [];
                for (let m = 0; m < option[k].length; m++) {
                    shape.push([option[k][m], i]);
                }

                if (!jam.AddVehicle(shape)) {
                    works = false;
                    for (let m = k - 1; m >= 0; m--) {
                        jam.PopVehicle();
                    }
                }
            }

            if (works) {
                generate_solution_configurations_recursive(rows, columns, configurations, jam, i + 1);

                for (let k = 0; k < option.length; k++) {
                    jam.PopVehicle();
                }
            }
        }
    } else {
        let col = i - rows.length;
        if (columns[col].length == 0) {
            return generate_solution_configurations_recursive(rows, columns, configurations, jam, i + 1);
        }

        let options = generate_partitions(columns[col], rows.length);

        for (let j = 0; j < options.length; j++) {
            let option = options[j];

            let works = true;

            for (let k = 0; works && k < option.length; k++) {
                let shape = [];
                for (let m = 0; m < option[k].length; m++) {
                    shape.push([col, option[k][m]]);
                }

                if (!jam.AddVehicle(shape)) {
                    works = false;
                    for (let m = k - 1; m >= 0; m--) {
                        jam.PopVehicle();
                    }
                }
            }

            if (works) {
                generate_solution_configurations_recursive(rows, columns, configurations, jam, i + 1);

                for (let k = 0; k < option.length; k++) {
                    jam.PopVehicle();
                }
            }
        }
    }
}

export function generate_solution_configurations(rows, columns) {
    let configurations = [];

    let jam = new Jam(columns.length, rows.length);

    let goal_piece = [
        [columns.length - 2, Math.floor((rows.length - 1) / 2)],
        [columns.length - 1, Math.floor((rows.length - 1) / 2)],
    ];
    jam.AddVehicle(goal_piece);

    generate_solution_configurations_recursive(rows, columns, configurations, jam, 0);

    return configurations;
}