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

        for (var i = 0; i < shape.length; i++) {
            var p = shape[i];

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
        var list = [];
        if (this.direction == 'y') {
            var local_min_y = this.minY;
            var local_max_y = this.maxY + 1;

            for (var y = this.minY - 1; y >= 0; y--) {
                if (jam.grid[this.minX][y] >= 0) {
                    break;
                }
                local_min_y = y;
            }
            for (var y = this.maxY + 1; y < jam.width; y++) {
                if (jam.grid[this.minX][y] >= 0) {
                    break;
                }
                local_max_y = y + 1;
            }

            for (var y = local_min_y; y < local_max_y - (this.maxY - this.minY); y++) {
                if (y == this.minY) {
                    continue;
                }

                var vehicle = [];
                for (var i = 0; i <= this.maxY - this.minY; i++) {
                    vehicle.push([this.minX, y + i]);
                }
                list.push(vehicle);
            }
        } else {
            var local_min_x = this.minX;
            var local_max_x = this.maxX + 1;

            for (var x = this.minX - 1; x >= 0; x--) {
                if (jam.grid[x][this.minY] >= 0) {
                    break;
                }
                local_min_x = x;
            }
            for (var x = this.maxX + 1; x < jam.width; x++) {
                if (jam.grid[x][this.minY] >= 0) {
                    break;
                }
                local_max_x = x + 1;
            }
            for (var x = local_min_x; x < local_max_x - (this.maxX - this.minX); x++) {
                if (x == this.minX) {
                    continue;
                }

                var vehicle = [];
                for (var i = 0; i <= this.maxX - this.minX; i++) {
                    vehicle.push([x + i, this.minY]);
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
        this.string = null;
        this.hash = null;

        for (var x = 0; x < width; x++) {
            this.grid[x] = {};
            for (var y = 0; y < height; y++) {
                this.grid[x][y] = -1;
            }
        }

        this.vehicles = [];
    }

    GetHash() {
        if (this.string != null) {
            return this.hash;
        }

        this.string = "";
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.string += this.grid[x][y] + " ";
            }
            this.string += "\n";
        }

        this.hash = sha1(this.string);
        return this.hash;
    }

    AddVehicle(squares) {
        var i = this.vehicles.length;

        this.string = null;
        this.vehicles.push(new Vehicle(squares));

        for (var j = 0; j < squares.length; j++) {
            var pos = squares[j];

            this.grid[pos[0]][pos[1]] = i;
        }
    }

    GetNeighbors(pool) {
        var hashlist = [];

        for (var i = 0; i < this.vehicles.length; i++) {
            var moves = this.vehicles[i].GetPossiblePositions(this);

            for (var j = 0; j < moves.length; j++) {
                var jam = new Jam(this.width, this.height);

                for (var ii = 0; ii < this.vehicles.length; ii++) {
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
    var visited = {};
    visited[jam.GetHash()] = [0, null];

    var queue = [jam.GetHash()];
    var maxDist = 0;
    var maxStart = null;

    pool.AddJam(jam);

    while (queue.length > 0) {
        var qhash = queue.shift();
        var distance = visited[qhash][0];

        if (distance > maxDist) {
            maxDist = distance;
            maxStart = qhash;
        }

        var qjam = pool.GetJam(qhash);
        var neighbors = qjam.GetNeighbors(pool);

        for (var i = 0; i < neighbors.length; i++) {
            var nhash = neighbors[i];

            if (nhash in visited) {
                continue;
            }

            queue.push(nhash);
            visited[nhash] = [distance + 1, qhash];
        }
    }

    var path = [];
    var cur = maxStart;

    while (cur != null) {
        path.push(cur);
        cur = visited[cur][1];
    }

    return path;
}