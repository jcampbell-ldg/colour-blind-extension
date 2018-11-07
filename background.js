$(document).ready(function () {
    var lastCol = '';
    var lastElement = '';
    var magic = $('#col-ext-magic-tool');
    var help = $('#col-ext-help');
    var color = $('#col-ext-color-picker');
    var helpCont = $('#col-ext-help-cont');
    var magicCont = $('#col-ext-magic-tool-cont');
    var colorCont = $('#col-ext-color-picker-cont');

    chrome.storage.sync.get(["colorId"], function (items) {
        if (items['colorId'] !== null) {
            backgroundColor(items['colorId']);
        } else {
            return null;
        }
    });


    $('#col-ext-magic-arrow-cont').click(function () {
        chrome.tabs.executeScript(null, {file: "magicMouse.js"});
    });

    $('#col-ext-color-off').click(function () {
        backgroundColor('5');
    });

    $('#1').click(function () {
        backgroundColor(this.id);
    });
    $('#2').click(function () {
        backgroundColor(this.id);
    });
    $('#3').click(function () {
        backgroundColor(this.id);
    });
    $('#4').click(function () {
        backgroundColor(this.id);
    });
    helpCont.hide();
    magicCont.hide();
    colorCont.hide();

    magic.on('click', function () {
        magic.css('background-color', '#ccccfc');
        if (lastCol === '') {
            magic.css('background-color', '#ccccfc');
        } else {
            if (magic.attr('id') !== lastCol) {
                $('#' + lastCol).css('background-color', '#e9e9ff');
            }
        }
        lastCol = magic.attr('id');
        showHideTab(lastCol);
    });
    help.on('click', function () {
        help.css('background-color', '#ccccfc');
        if (lastCol === '') {
            help.css('background-color', '#ccccfc');
        } else {
            if (help.attr('id') !== lastCol) {
                $('#' + lastCol).css('background-color', '#e9e9ff');
            }
        }
        lastCol = help.attr('id');
        showHideTab(lastCol);
    });
    color.on('click', function () {
        color.css('background-color', '#ccccfc');
        if (lastCol === '') {
            color.css('background-color', '#ccccfc');
        } else {
            if (color.attr('id') !== lastCol) {
                $('#' + lastCol).css('background-color', '#e9e9ff');
            }
        }
        lastCol = color.attr('id');
        showHideTab(lastCol);
    });

//lucys code
    function showHideTab(id) {

        if (lastElement !== '') {
            if (lastElement !== id + '-cont') {
                lastElement.hide();
            }
        }

        switch (id) {
            case 'col-ext-help':
                helpCont.show();
                lastElement = helpCont;
                break;
            case 'col-ext-magic-tool':
                magicCont.show();
                lastElement = magicCont;
                break;
            case 'col-ext-color-picker':
                colorCont.show();
                lastElement = colorCont;
                break;
            default:
                return false;
                break;
        }
    }

});

//dominic's code
function backgroundColor(id) {
    switch (id) {
        case '1':
            chrome.storage.sync.set({"colorId": id});
            chrome.tabs.executeScript(null, {file: "contentChanger.js"});
            break;
        case '2':
            chrome.storage.sync.set({"colorId": id});
            chrome.tabs.executeScript(null, {file: "contentChanger.js"});
            break;
        case '3':
            chrome.storage.sync.set({"colorId": id});
            chrome.tabs.executeScript(null, {file: "contentChanger.js"});
            break;
        case '4':
            chrome.storage.sync.set({"colorId": id});
            chrome.tabs.executeScript(null, {file: "contentChanger.js"});
            break;
        case '5':
            chrome.storage.sync.set({"colorId": id});
            chrome.tabs.executeScript(null, {file: "contentChanger.js"});
            break;
        default:
            break;
    }
}