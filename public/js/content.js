//This file is ran when a new format is selected and the apply button is clicked
$(document).ready(function() {
    //Gets the chosen config
   chrome.storage.sync.get('colours', function(items){
      setColours(items.colours);
      chrome.storage.sync.remove('colours');
   });
});

function setColours(colours)
{
    //Set all elements on page equal to new config
    $('*').css({
        'background-color': colours[0],
        'color': colours[1],
        'border-color': colours[1]
    });
}