$(document).ready(function () {
    var lastCol = '';
    var lastElement = '';
    var magic = $('#col-ext-magic-tool');
    var help = $('#col-ext-help');
    var color = $('#col-ext-color-picker');
    var helpCont = $('#col-ext-help-cont');
    var magicCont = $('#col-ext-magic-tool-cont');
    var colorCont = $('#col-ext-color-picker-cont');
    $('#1').click(function () {
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


function backgroundColor(id) {
    switch (id) {
        case '1':
            $('body').fadeOut(100).delay(200).css("ackground-color", 'red');
            break;
        case '2':
            alert('one');
            break;
        case '3':
            alert('one');
            break;
        case '4':
            alert('one');
            break;

        default:
            alert('none');
    }
}