#! /usr/bin/env node

export class Jam {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = {};

        for (var x = 0; x < width; x++) {
            this.grid[x] = {};
            for (var y = 0; y < height; y++) {
                this.grid[x][y] = -1;
            }
        }

        this.vehicles = [];
    }

    AddVehicle(squares) {
        var i = this.vehicles.length;

        this.vehicles.push(squares);

        for (var j = 0; j < squares.length; j++) {
            var pos = squares[j];

            this.grid[pos[0]][pos[1]] = i;
        }
    }
}