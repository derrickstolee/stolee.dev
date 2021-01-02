#! /usr/bin/env node

import { generate_solution_configurations } from '../js/traffic-jam.js';
import { render_jams } from '../js/jam-renderer.js';

let rows = [
    [],
    [3],
    [],
    [],
    [],
    [3, 2],
];
let columns = [
    [2],
    [3],
    [],
    [2, 2],
    [],
    [2],
];

let jams = generate_solution_configurations(rows, columns);

render_jams('example9', jams, 120, 120, 100, 100, 800);