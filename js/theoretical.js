(function() {
  $(function() {
    var plots;
    plots = [
      {
        placeholder: "#theoretical",
        graph: d3.chart.scatter().x_title("transmission").y_title("dark field").legend_square_size(24).radius(0).margin({
          top: 20,
          right: 20,
          bottom: 50,
          left: 70
        }),
        graph_data: [
          {
            name: "theory",
            values: [[0, 0]]
          }
        ],
        beta: 0.085
      }, {
        placeholder: "#fit",
        graph: d3.chart.scatter().x_title("transmission").y_title("dark field").legend_square_size(24).radius(3).margin({
          top: 20,
          right: 20,
          bottom: 50,
          left: 70
        }),
        beta: 0.08593
      }, {
        placeholder: "#fit-low-scattering",
        graph: d3.chart.scatter().x_title("transmission").y_title("dark field").legend_square_size(24).radius(3).margin({
          top: 20,
          right: 20,
          bottom: 50,
          left: 70
        }),
        beta: 0.07785,
        filter: function(d) {
          return d.scattering !== "high";
        }
      }
    ];
    return d3.json("data/aggregated.json", function(error, data) {
      var beta, factor, gamma, graph, graph_data, height, line, line_data, plot, th_dark_field, width, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = plots.length; _i < _len; _i++) {
        plot = plots[_i];
        graph = plot.graph;
        factor = 0.6;
        width = factor * $(plot.placeholder).width();
        height = 0.618 * width;
        graph.width(width).height(height);
        graph.x_scale().domain([0, 1.2]);
        graph.y_scale().domain([0, 1]);
        beta = plot.beta;
        gamma = function(beta) {
          return ((-Math.pow(Math.PI, 3)) / 3) * (beta / (1 - 2 * Math.PI * beta));
        };
        th_dark_field = function(absorption) {
          return Math.exp(gamma(beta) * ((1 - absorption) / absorption));
        };
        line = d3.svg.line().x(function(d) {
          return graph.x_scale()(d.x);
        }).y(function(d) {
          return graph.y_scale()(d.y);
        });
        line_data = d3.range(0.01, 0.99, 0.01).map(function(d) {
          return {
            x: d,
            y: th_dark_field(d)
          };
        });
        if (plot.graph_data != null) {
          graph_data = plot.graph_data;
        } else {
          graph_data = data;
        }
        if (plot.filter) {
          graph_data = graph_data.filter(plot.filter);
        }
        d3.select(plot.placeholder).data([graph_data]).call(graph);
        _results.push(d3.select(plot.placeholder).select("svg").select("g").append("path").attr("d", line(line_data)));
      }
      return _results;
    });
  });

}).call(this);
