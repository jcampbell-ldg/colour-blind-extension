$(document).ready(function(){
    $('.tab').click(function(){
        var contentId = (this.id).slice(0, -4);
        $('.content').hide();
        $('#content_'+contentId).show();
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.colour_changer_options_tab:lt(3)').show();

    $('#colour_changer_tab_left').click(function(){
        var id = $('#colour_changer_tab_left').nextAll('.colour_changer_options_tab:visible').attr('id');
        var id_count = parseInt(id.slice(-1));
        var total_count = $('.colour_changer_options_tab').length;

        if(id_count > 0){
            $('.colour_changer_options_tab').hide();
            $('.colour_changer_options_tab').slice(id_count - 1, id_count + 2).show();
        }
    });

    $('#colour_changer_tab_right').click(function(){
        var id = $('#colour_changer_tab_left').nextAll('.colour_changer_options_tab:visible').attr('id');
        var id_count = parseInt(id.slice(-1));
        var total_count = $('.colour_changer_options_tab').length;

        if(id_count < (total_count - 3)){
            $('.colour_changer_options_tab').hide();
            $('.colour_changer_options_tab').slice(id_count + 1, id_count + 4).show();
        }
    });
});

