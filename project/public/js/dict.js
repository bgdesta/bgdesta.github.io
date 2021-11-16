$(document).ready(function () {
  let url = "http://localhost:3000/search";

  $("form").on("submit", function (event) {
    let searchItem = $(this).serialize();

    $.ajax(url, {
      type: "POST",
      dataType: "json",
      data: searchItem,
      success: function (result) {
        $("#definition > ol").html("");
        for (let i = 0; i < result.length; i++) {
          let defn = $(
            "<li>(" +
              result[i].wordtype +
              ") :: " +
              result[i].definition +
              "</li>"
          );
          defn.appendTo($("#definition > ol"));
        }
      },
      error: function (err) {
        console.log(err);
      },
    });

    event.preventDefault();
  });
});
