$ ->
    plots = [{
        placeholder: "#theoretical"
        graph: d3.chart.scatter()
                .x_title "transmission"
                .y_title "dark field"
                .legend_square_size 24
                .radius 0
                .margin {top: 20, right: 20, bottom: 50, left: 70}
        graph_data: [{name : "theory", values: [[0, 0]]}]
        beta: 0.085
    },
    {
        placeholder: "#fit"
        graph: d3.chart.scatter()
                .x_title "transmission"
                .y_title "dark field"
                .legend_square_size 24
                .radius 3
                .margin {top: 20, right: 20, bottom: 50, left: 70}
        beta: 0.08593
    }
    {
        placeholder: "#fit-low-scattering"
        graph: d3.chart.scatter()
                .x_title "transmission"
                .y_title "dark field"
                .legend_square_size 24
                .radius 3
                .margin {top: 20, right: 20, bottom: 50, left: 70}
        beta: 0.07785
        filter: (d) -> d.scattering != "high"
    }
    ]
    d3.json "data/aggregated.json", (error, data) ->
        for plot in plots
            graph = plot.graph
            factor = 0.6
            width = factor * $(plot.placeholder).width()
            height = 0.618 * width
            graph
                .width width
                .height height
            graph.x_scale()
                .domain [0, 1.2]
            graph.y_scale()
                .domain [0, 1]

            beta = plot.beta
            gamma = (beta) ->
                ((-Math.pow(Math.PI, 3)) / 3) * (beta / (1 - 2 * Math.PI * beta))

            th_dark_field = (absorption) ->
                Math.exp(gamma(beta) * ((1 - absorption) / absorption))

            line = d3.svg.line()
                .x (d) -> graph.x_scale() d.x
                .y (d) -> graph.y_scale() d.y

            line_data = d3.range(0.01, 0.99, 0.01).map (d) ->
                {
                    x: d
                    y: th_dark_field(d)
                }

            if plot.graph_data?
                graph_data = plot.graph_data
            else
                graph_data = data

            if plot.filter
                graph_data = graph_data.filter plot.filter

            d3.select plot.placeholder
                .data [graph_data]
                .call graph

            d3.select plot.placeholder
                .select "svg"
                .select "g"
                .append "path"
                .attr "d", line(line_data)
