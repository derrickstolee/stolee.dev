#! /usr/bin/env node

class JamRenderer {
    constructor(jam, canvas, renderX = 0, renderY = 0, renderW = 400, renderH = 400) {
        this.jam = jam;
        this.canvas = canvas;

        var wFactor = renderW / (jam.width);
        var hFactor = renderH / (jam.height);
        this.scaleFactor = Math.min(wFactor, hFactor);

        this.colors = [
            "white",
            "yellow",
            "red",
            "orange",
            "purple",
            "brown",
            "pink",
            "blue",
            "black",
            "green",
            "light green",
            "light blue",
        ];

        var polygon = new fabric.Rect({
            left: renderX,
            top: renderY,
            width: this.scaleFactor * this.jam.width,
            height: this.scaleFactor * this.jam.height,
            angle: 0,
            fill: 'gray',
            strokeLineJoin: 'round',
            stroke: 'black',
            strokeWidth: 1,
            hasControls: false,
            selectable: false,
            reference: false,
        });
        canvas.add(polygon);

        for (var x = 0; x < this.jam.width; x++) {
            for (var y = 0; y < this.jam.height; y++) {
                var color = "gray";
                if (this.jam.grid[x][y] >= 0) {
                    color = this.colors[this.jam.grid[x][y]];
                }
                var polygon = new fabric.Rect({
                    left: renderX + this.scaleFactor * x,
                    top: renderY + this.scaleFactor * y,
                    width: this.scaleFactor,
                    height: this.scaleFactor,
                    angle: 0,
                    fill: color,
                    strokeLineJoin: 'round',
                    stroke: 'black',
                    strokeWidth: 1,
                    hasControls: false,
                    selectable: false,
                    reference: false,
                });
                canvas.add(polygon);
            }
        }
    }
}

export function render_jam(id, jam, renderX = 0, renderY = 0, renderW = 400, renderH = 400) {
    var canvas = new fabric.Canvas(id);
    var renderer = new JamRenderer(jam, canvas, renderX, renderY, renderW, renderH);
    canvas.renderAll();
    return renderer;
}

export function render_jams(id, jams, renderX = 120, renderY = 0, renderW = 100, renderH = 100, maxWidth = 800) {
    var canvas = new fabric.Canvas(id);
    var renderers = [];

    var column = 0;
    var row = 0;
    for (var i = 0; i < jams.length; i++) {
        if (column * renderX + renderW > maxWidth) {
            row++;
            column = 0;
        }
        renderers.push(new JamRenderer(jams[i], canvas, column * renderX, row * renderY, renderW, renderH));
        column++;
    }
    canvas.renderAll();
}