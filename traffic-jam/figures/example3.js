#! /usr/bin/env node

import { Jam, JamPool } from '../js/traffic-jam.js';
import { render_jams } from '../js/jam-renderer.js';

var jams = [];

jams.push(new Jam(6, 6));

jams[0].AddVehicle([
    [4, 2],
    [5, 2]
]);
jams[0].AddVehicle([
    [3, 3],
    [3, 4],
    [3, 5]
]);
jams[0].AddVehicle([
    [0, 3],
    [1, 3],
    [2, 3]
]);
jams[0].AddVehicle([
    [2, 1],
    [2, 0]
]);

var pool = new JamPool();
var hashlist = jams[0].GetNeighbors(pool);

for (var i = 0; i < hashlist.length; i++) {
    jams.push(pool.GetJam(hashlist[i]));
}

render_jams('example3', jams, 140, 140, 120, 120, 800);