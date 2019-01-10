$(document).ready(function() {
   chrome.storage.sync.get('colours', function(items){
      setColours(items.colours);
      chrome.storage.sync.remove('colours');
   });
});

function setColours(colours)
{
    $('*').css({
        'background-color': colours[0],
        'color': colours[1],
        'border-color': colours[1]
    });
}