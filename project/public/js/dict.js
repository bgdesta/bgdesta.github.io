$(document).ready(function () {
  let url = "http://localhost:3000/search";

  $("form").on("submit", function (event) {
    let searchItem = $(this).serialize();

    $.ajax(url, {
      type: "POST",
      dataType: "json",
      data: searchItem,
      success: function (result) {
        $("#definition").html("");
        if (result.length === 0) {
          let notFound = $(
            "<div><p>Sorry, the term you searched for was not found in our Dictionary!</p></div>"
          );
          notFound.css({
            color: "red",
            "font-family": " monospace",
            "font-size": "16px",
            "margin-top": "15px",
          });
          // $("#definition > div").remove();
          $("#definition").prepend(notFound);
        }
        $("#definition").append($("<ol></ol>"));
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
