(function() {
  $(function() {
    var chunk, n_columns, placeholder, width;
    chunk = function(array, chunk_size) {
      var chunks, i, n;
      chunks = [];
      n = array.length;
      i = 0;
      while (i < n) {
        chunks.push(array.slice(i, i += chunk_size));
      }
      return chunks;
    };
    n_columns = 5;
    placeholder = "#materials";
    width = $(placeholder).width() / (n_columns + 1);
    return d3.json("data/aggregated.json", function(error, data) {
      var chunked, names, table, td, tr;
      if (error != null) {
        console.warn(error);
      }
      names = data.map(function(d) {
        var filename;
        filename = d.name.toLowerCase().replace(/\s+/g, "");
        return "images/samples/" + filename + ".jpg";
      });
      console.log(names);
      chunked = chunk(names, n_columns);
      console.log(chunked);
      table = d3.select(placeholder).selectAll("table").data([chunked]).enter().append("table").append("tbody");
      tr = table.selectAll("tr").data(function(d) {
        return d;
      }).enter().append("tr");
      return td = tr.selectAll("td").data(function(d) {
        return d;
      }).enter().append("td").append("img").attr("src", function(d) {
        return d;
      }).attr("width", width);
    });
  });

}).call(this);
