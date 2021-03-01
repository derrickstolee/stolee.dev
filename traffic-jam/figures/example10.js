#! /usr/bin/env node

import { JamPool, longest_path_from_multi, generate_solution_configurations } from '../js/traffic-jam.js';
import { render_jams } from '../js/jam-renderer.js';
import { click_to_render } from '../js/click-to-render.js';

function render_example10()
{
        let rows = [
                [2],
                [3],
                [],
                [],
                [2],
                [],
        ];
        let columns = [
                [2],
                [],
                [3],
                [2, 2],
                [],
                [2],
        ];

        let jams = generate_solution_configurations(rows, columns);

        var pool = new JamPool();
        var hashlist = longest_path_from_multi(jams, pool);

        var path = [];
        for (var i = 0; i < hashlist.length; i++) {
                path.push(pool.GetJam(hashlist[i]));
        }

        render_jams('example10', path, 120, 120, 100, 100, 800);
}

var example10 = document.getElementById('example10');
click_to_render(example10);

example10.addEventListener("click", function() {
        render_example10();
});
