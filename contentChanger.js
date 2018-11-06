$(document).ready(function () {
    var colorId = '';

    chrome.storage.sync.get(["colorId"], function (items) {
        colorId = items["colorId"];
        setBackgroundColor(colorId);
    });

});

function setBackgroundColor(colorId)
{
    var color1 = '';
    var color2 = '';

    switch (colorId) {
        case '1':
            color1 = 'black';
            color2 = 'white';
            break;
        case '2':
            color1 = 'white';
            color2 = 'black';
            break;
        case '3':
            color1 = 'white';
            color2 = 'black';
            break;
        case '4':
            color1 = 'blue';
            color2 = 'black';
            break;
        case '5':
            chrome.storage.sync.remove('colorId', function (data) {
                if(data === true){
                    alert('Data removed');
                } else {
                    console.log(data);
                }
            });
            break;
    }

    var elements = document.querySelectorAll('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.tagName === 'A' || node.tagName === 'STRONG' || node.tagName === 'LI' || node.tagName === 'UL' || node.tagName === 'DIV' || node.tagName === 'H1' || node.tagName === 'H2' || node.tagName === 'H3' || node.tagName === 'H4' || node.tagName === 'H5' || node.tagName === 'NAV' || node.tagName === 'BUTTON' || node.tagName === 'SPAN' || node.tagName === 'P') {
                $(node).css('color', color2);
            }
            $(node).css('background-color', color1);

        }

    }
}