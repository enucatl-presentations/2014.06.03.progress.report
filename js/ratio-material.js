(function() {
  $(function() {
    var factor, graphs, width_factor;
    graphs = [
      {
        placeholder: "#ratio-abs",
        graph: d3.chart.scatter().x_title("transmission").y_title("log ratio").legend_square_size(24).y_value(function(d) {
          return d[2];
        }),
        y_domain: [0, 5]
      }, {
        placeholder: "#df-absorption",
        graph: d3.chart.scatter().x_title("transmission").y_title("dark field").legend_square_size(24).y_value(function(d) {
          return d[1];
        }),
        y_domain: [0, 1]
      }, {
        placeholder: "#ratio-df",
        graph: d3.chart.scatter().x_title("dark field").y_title("log ratio").legend_square_size(24).x_value(function(d) {
          return d[1];
        }).y_value(function(d) {
          return d[2];
        }),
        y_domain: [0, 5]
      }
    ];
    factor = 0.618;
    width_factor = 0.6;
    return d3.json("data/aggregated.json", function(error, data) {
      var graph, height, width, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = graphs.length; _i < _len; _i++) {
        graph = graphs[_i];
        width = width_factor * $(graph.placeholder).width();
        height = factor * width;
        graph.graph.width(width).height(height);
        graph.graph.x_scale().domain([0, 1.2]);
        graph.graph.y_scale().domain(graph.y_domain);
        _results.push(d3.select(graph.placeholder).data([data]).call(graph.graph));
      }
      return _results;
    });
  });

}).call(this);
