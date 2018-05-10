(function() {
  $(function() {
    var factor, graph, height, placeholder, width, width_factor;
    placeholder = "#df-absorption";
    factor = 0.618;
    width_factor = 0.8;
    width = width_factor * $(placeholder).width();
    height = factor * width;
    graph = d3.chart.scatter().width(width).height(height).x_title("transmission").y_title("residual visibility").legend_square_size(24).y_value(function(d) {
      return d[1];
    });
    graph.x_scale().domain([0, 1]);
    graph.y_scale().domain([0, 1]);
    return d3.json("data/aggregated.json", function(error, data) {
      return d3.select(placeholder).data([data]).call(graph);
    });
  });

}).call(this);
