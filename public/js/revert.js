//This file reverts any changes that the extension makes, returning the page to its previous state.
$(document).ready(function() {
    $('*').css({
        'background-color': '',
        'color': '',
        'border-color': ''
    });
});