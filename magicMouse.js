$(document).ready(function () {
alert('hl');
    $('*').hover(

        function () {
            if($(this).css("background-color") === 'P'){

            }
        },
        function () { $(this).addClass('highlight') },
        function () { $(this).removeClass('highlight') },
        function () { $(this).siblings.removeClass('highlight') }
    );

});