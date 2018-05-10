$ ->
    graphs = [
        {
            placeholder: "#ratio-abs"
            graph: d3.chart.scatter()
                .x_title "transmission"
                .y_title "log ratio"
                .legend_square_size 24
                .y_value (d) -> d[2]
            y_domain: [0, 5]
        },
        {
            placeholder: "#df-absorption"
            graph: d3.chart.scatter()
                .x_title "transmission"
                .y_title "dark field"
                .legend_square_size 24
                .y_value (d) -> d[1]
            y_domain: [0, 1]
        },
        {
            placeholder: "#ratio-df"
            graph: d3.chart.scatter()
                .x_title "dark field"
                .y_title "log ratio"
                .legend_square_size 24
                .x_value (d) -> d[1]
                .y_value (d) -> d[2]
            y_domain: [0, 5]
        },
    ]

    factor = 0.618
    width_factor = 0.6

    d3.json "data/aggregated.json", (error, data) ->
        for graph in graphs
            width = width_factor * $(graph.placeholder).width()
            height = factor * width
            graph.graph
                .width width
                .height height
            graph.graph.x_scale()
                .domain [0, 1.2]
            graph.graph.y_scale()
                .domain graph.y_domain
            d3.select graph.placeholder
                .data [data]
                .call graph.graph
