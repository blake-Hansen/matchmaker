
  $.get("/count")
    .then(function(data) {
      $("#show").append(data.length)
    });
