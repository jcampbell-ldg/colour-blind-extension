$(document).ready(function () {
    var lastCol ='';
    var elementMixer = '';
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


    magic.on('click', function () {
        magic.css('background-color', '#ccccfc');
        if(lastCol === ''){
            magic.css('background-color', '#ccccfc');
        } else {
            $('#'+lastCol).css('background-color', '#e9e9ff');
        }
        lastCol = magic.attr('id');
        showHideTab(lastCol);
    });
    help.on('click', function () {
        help.css('background-color', '#ccccfc');
        showHideTab(help);
        if(lastCol === ''){
            help.css('background-color', '#ccccfc');
        } else {
            $('#'+lastCol).css('background-color', '#e9e9ff');
        }
        lastCol = help.attr('id');
        showHideTab(lastCol);
    });
    color.on('click', function () {
        color.css('background-color', '#ccccfc');
        showHideTab(color);
        if(lastCol === ''){
            color.css('background-color', '#ccccfc');
        } else {
            $('#'+lastCol).css('background-color', '#e9e9ff');
        }
        lastCol = color.attr('id');
        showHideTab(lastCol);
    });

    function showHideTab(id){

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



