#! /usr/bin/env node

import { Jam } from '../js/traffic-jam.js';
import { render_jams } from '../js/jam-renderer.js';

var jams = [];

jams.push(new Jam(6, 6));

jams[0].AddVehicle([
    [0, 2],
    [1, 2]
]);
jams[0].AddVehicle([
    [3, 0],
    [3, 1],
    [3, 2]
]);
jams[0].AddVehicle([
    [3, 3],
    [4, 3],
    [5, 3]
]);
jams[0].AddVehicle([
    [2, 3],
    [2, 2]
]);

jams.push(new Jam(6, 6));

jams[1].AddVehicle([
    [0, 2],
    [1, 2]
]);
jams[1].AddVehicle([
    [3, 0],
    [3, 1],
    [3, 2]
]);
jams[1].AddVehicle([
    [3, 3],
    [4, 3],
    [5, 3]
]);
jams[1].AddVehicle([
    [2, 1],
    [2, 0]
]);

jams.push(new Jam(6, 6));

jams[2].AddVehicle([
    [0, 2],
    [1, 2]
]);
jams[2].AddVehicle([
    [3, 0],
    [3, 1],
    [3, 2]
]);
jams[2].AddVehicle([
    [0, 3],
    [1, 3],
    [2, 3]
]);
jams[2].AddVehicle([
    [2, 1],
    [2, 0]
]);

jams.push(new Jam(6, 6));

jams[3].AddVehicle([
    [0, 2],
    [1, 2]
]);
jams[3].AddVehicle([
    [3, 3],
    [3, 4],
    [3, 5]
]);
jams[3].AddVehicle([
    [0, 3],
    [1, 3],
    [2, 3]
]);
jams[3].AddVehicle([
    [2, 1],
    [2, 0]
]);

jams.push(new Jam(6, 6));

jams[4].AddVehicle([
    [4, 2],
    [5, 2]
]);
jams[4].AddVehicle([
    [3, 3],
    [3, 4],
    [3, 5]
]);
jams[4].AddVehicle([
    [0, 3],
    [1, 3],
    [2, 3]
]);
jams[4].AddVehicle([
    [2, 1],
    [2, 0]
]);

render_jams('example2', jams, 140, 0, 120, 120);