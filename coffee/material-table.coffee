$ ->
    chunk = (array, chunk_size) ->
        chunks = []
        n = array.length
        i = 0
        while i < n
            chunks.push array.slice(i, i += chunk_size)
        return chunks

    n_columns = 5
    placeholder = "#materials"
    width = $(placeholder).width() / (n_columns + 1)
    d3.json "data/aggregated.json", (error, data) ->
        console.warn error if error?
        names = data.map (d) -> 
            filename = d.name.toLowerCase().replace /\s+/g, ""
            "images/samples/#{filename}.jpg"

        console.log names
        chunked = chunk(names, n_columns)
        console.log chunked
        table = d3.select placeholder
            .selectAll "table"
            .data [chunked]
            .enter()
            .append "table"
            .append "tbody"

        tr = table
            .selectAll "tr"
            .data (d) -> d
            .enter()
            .append "tr"

        td = tr
            .selectAll "td"
            .data (d) -> d
            .enter()
            .append "td"
            .append "img"
            .attr "src", (d) -> d
            .attr "width", width
