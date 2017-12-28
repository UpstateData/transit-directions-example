// Templates for constructing URLs and rendering results.
var url_template = '/directions?origin=%origin%&destination=%destination%';
var result_template = '<div class="card"><h4 class="card-title">Raw Results</h4><pre>%results%</pre></card>';

$(document).ready(function () {

    // Handler for search button click.
    $('#search').click(function () {
        event.preventDefault();
        var origin = $('#origin').val();
        var destination = $('#destination').val();
        var url = url_template.replace('%origin%', origin).replace('%destination%', destination);

        // Append raw JSON results to <div>.
        requestJSON(url, function (json) {
            $("#results").append(result_template.replace('%results%', JSON.stringify(json, null, 2)));
        });
    });
});

// Utility method to make API call.
function requestJSON(url, callback) {
    $.ajax({
        url: url,
        beforeSend: function () {
            $('#results').empty();
            $('.alert-secondary').removeClass('hide');
        },
        complete: function (xhr) {
            $('.alert-secondary').addClass('hide');
            callback.call(null, xhr.responseJSON);
        }
    });
}