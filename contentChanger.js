$(document).ready(function () {
    // chrome.storage.sync.get("colorId", function (obj) {
    //     alert(obj.colorId)
    // });


    var elements = document.querySelectorAll('*');

    for(var i = 0; i < elements.length; i++){
        var element = elements[i];

        for(var j = 0; j < element.childNodes.length; j++){
            var node = element.childNodes[j];
            // console.log(node.nodeType);
            $(node).css('background-color', 'red');
        }

    }


});