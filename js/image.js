(function() {
  if (d3.chart == null) {
    d3.chart = {};
  }

  d3.chart.image = function() {
    var chart, color, color_value, dispatch, dx, dy, margin, pixel_height, pixel_width;
    pixel_height = 8;
    pixel_width = 1;
    margin = {
      top: 5,
      right: 0,
      bottom: 20,
      left: 20
    };
    dx = void 0;
    dy = void 0;
    color = d3.scale.linear();
    color_value = function(d) {
      return d[0];
    };
    dispatch = d3.dispatch("line_over", "line_out");
    chart = function(selection) {
      return selection.each(function(data) {
        var canvas, draw_image, flattened, g_enter, get_mouse_position, height, max_scale, min_scale, sorted, width;
        data = data.map(function(d) {
          return d.map(color_value);
        });
        dx = data[0].length;
        dy = data.length;
        height = pixel_height * dy;
        width = pixel_width * dx;
        canvas = d3.select(this).selectAll("canvas").data([data]);
        g_enter = canvas.enter().append("canvas");
        canvas.attr("width", dx).attr("height", dy).style("width", width + "px").style("height", height + "px").style("margin-top", margin.top + "px").style("margin-left", margin.left + "px").style("margin-bottom", margin.bottom + "px").style("margin-right", margin.right + "px");
        get_mouse_position = function(event) {
          var position, rect;
          rect = canvas.node().getBoundingClientRect();
          position = {
            col: Math.floor((event.clientX - rect.left) / pixel_width),
            row: Math.floor((event.clientY - rect.top) / pixel_height)
          };
          return position;
        };
        canvas.on("mousemove", function() {
          var position;
          position = get_mouse_position(d3.event);
          position.values = data[position.row];
          return dispatch.line_over(position);
        });
        flattened = data.reduce(function(a, b) {
          return a.concat(b);
        });
        sorted = flattened.sort(d3.ascending);
        min_scale = d3.quantile(sorted, 0.05);
        max_scale = d3.quantile(sorted, 0.95);
        color.domain([min_scale, max_scale]).nice().range(["white", "black"]);
        draw_image = function(canvas) {
          var c, context, image, p, pixel, row, _i, _j, _len, _len1;
          context = canvas.node().getContext("2d");
          image = context.createImageData(dx, dy);
          p = -1;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            row = data[_i];
            for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
              pixel = row[_j];
              c = d3.rgb(color(pixel));
              image.data[++p] = c.r;
              image.data[++p] = c.g;
              image.data[++p] = c.b;
              image.data[++p] = 255;
            }
          }
          context.imageSmoothingEnabled = false;
          return context.putImageData(image, 0, 0);
        };
        return canvas.call(draw_image);
      });
    };
    chart.pixel_width = function(value) {
      if (!arguments.length) {
        return pixel_width;
      }
      pixel_width = value;
      return chart;
    };
    chart.pixel_height = function(value) {
      if (!arguments.length) {
        return pixel_height;
      }
      pixel_height = value;
      return chart;
    };
    chart.key = function(value) {
      var key;
      if (!arguments.length) {
        return key;
      }
      key = value;
      return chart;
    };
    chart.color = function(value) {
      if (!arguments.length) {
        return color;
      }
      color = value;
      return chart;
    };
    chart.height = function() {
      return dy * pixel_height;
    };
    chart.width = function() {
      return dx * pixel_width;
    };
    chart.color_value = function(value) {
      if (!arguments.length) {
        return color_value;
      }
      color_value = value;
      return chart;
    };
    chart.margin = function(value) {
      if (!arguments.length) {
        return margin;
      }
      margin = value;
      return chart;
    };
    chart.color_value = function(value) {
      if (!arguments.length) {
        return color_value;
      }
      color_value = value;
      return chart;
    };
    d3.rebind(chart, dispatch, "on");
    return chart;
  };

}).call(this);
