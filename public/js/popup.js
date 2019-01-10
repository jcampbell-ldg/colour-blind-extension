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

    $('.colour_changer_options_tab').click(function(){
        $('.colour_active').removeClass('colour_active');
        $(this).addClass('colour_active');

        previewColours(this.id);
    });

    $('#colour_changer_apply').click(function(){
        setColour();
    });

    $('.config').on('click', loadConfig);

    loadOptions();
    // setData();
    // console.log(getConfig());
});

function previewColours(id)
{
    var element = $('#'+id);
    var backgroundColour = element.data('background');
    var fontColour = element.data('font');
    var borderColour = element.data('border');
    console.log(element.data());
    $('#colour_changer_options_preview').css({
        'background-color': backgroundColour,
        'color': fontColour,
        'border-color': borderColour
    });

    $('#colour_changer_options_preview_message').hide();
    $('#colour_changer_options_preview_display').show();
    $('#colour_changer_options_preview_display_background_colour').html(backgroundColour);
    $('#colour_changer_options_preview_display_font_colour').html(fontColour);
    $('#colour_changer_options_preview_display_border_colour').html(borderColour);
}

function setColour() {
    var colours = [$('#colour_changer_options_preview_display_background_colour').html(), $('#colour_changer_options_preview_display_font_colour').html()];

    chrome.storage.sync.set({
        colours: colours
    }, function () {
        chrome.tabs.executeScript({
            file: "public/js/jquery-3.3.1.min.js"
        }, function () {
            chrome.tabs.executeScript({
                file: "public/js/content.js"
            })
        })
    })
}

function loadOptions()
{
    var div;
    chrome.storage.sync.get(null, function (items) {
        for (key in items) {
            if (key.substr(0, 6) == 'config') {
                div = $('#colour_changer_options_tabs').find('.colour_changer_options_tab:empty:first');
                div.html(items[key]['name']);
                div.data('background', items[key]['bgColour']);
                div.data('font', items[key]['fontColour']);
                div.data('border', items[key]['borderColour']);
            }
        }
    });
}

function loadConfig()
{
    var id = (this.id.substr(-8));
    $('#content_custom_design_settings_form').load('/views/custom_design_form.html', function(){
        $('#custom_design_submit').click(function(){
            saveConfig();
        });

        chrome.storage.sync.get(id, function (items) {
            $('#custom_design_id').val(id);
            $('#custom_design_name').val(items[id]['name']);
            $('#custom_design_background_colour').val(items[id]['bgColour']);
            $('#custom_design_font_colour').val(items[id]['fontColour']);
            $('#custom_design_border_colour').val(items[id]['borderColour']);
        });
    });
}

function saveConfig()
{
    var id = $('#custom_design_id').val();
    var name = $('#custom_design_name').val();
    var background = $('#custom_design_background_colour').val();
    var font = $('#custom_design_font_colour').val();
    var border = $('#custom_design_border_colour').val();

    var config = {};
    config[id] = {name: name, bgColour: background, fontColour: font, borderColour: border};

    chrome.storage.sync.get(id, function(items){
        if(items[id] != undefined){
            chrome.storage.sync.remove(id, function(){
                chrome.storage.sync.set(config, function(){
                    //SET SUCCESS MESSAGE
                    console.log('Successfully Saved');
                });
            });
        }
    })
}

// function setData()
// {
//     chrome.storage.sync.set({
//         config_1: {name: 'Config One', bgColour: 'white', fontColour: 'black', borderColour: 'black'},
//         config_2: {name: 'Config Two', bgColour: 'white', fontColour: 'black', borderColour: 'black'},
//         config_3: {name: 'Config Three', bgColour: 'white', fontColour: 'black', borderColour: 'black'},
//         config_4: {name: 'Config Four', bgColour: 'white', fontColour: 'black', borderColour: 'black'},
//         config_5: {name: 'Config Five', bgColour: 'white', fontColour: 'black', borderColour: 'black'}
//     });
// }