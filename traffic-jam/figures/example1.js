#! /usr/bin/env node

import { Jam } from '../js/traffic-jam.js';
import { render_jam } from '../js/jam-renderer.js';

var jam = new Jam(6, 6);

jam.AddVehicle([
    [0, 2],
    [1, 2]
]);
jam.AddVehicle([
    [3, 0],
    [3, 1],
    [3, 2]
]);
jam.AddVehicle([
    [3, 3],
    [4, 3],
    [5, 3]
]);
jam.AddVehicle([
    [2, 3],
    [2, 2]
]);

render_jam('example1', jam);