#! /usr/bin/env node

import { Jam, JamPool, longest_path } from '../js/traffic-jam.js';
import { render_jams } from '../js/jam-renderer.js';

var jam = new Jam(6, 6);

jam.AddVehicle([
    [4, 2],
    [5, 2]
]);
jam.AddVehicle([
    [3, 3],
    [3, 4],
    [3, 5]
]);
jam.AddVehicle([
    [0, 3],
    [1, 3],
    [2, 3]
]);
jam.AddVehicle([
    [2, 1],
    [2, 2]
]);
jam.AddVehicle([
    [0, 0],
    [0, 1],
]);
jam.AddVehicle([
    [0, 4],
    [1, 4],
]);
jam.AddVehicle([
    [4, 4],
    [5, 4],
]);

var pool = new JamPool();
var hashlist = longest_path(jam, pool);

var jams = [];
for (var i = 0; i < hashlist.length; i++) {
    jams.push(pool.GetJam(hashlist[i]));
}

render_jams('example6', jams, 120, 120, 100, 100, 800);