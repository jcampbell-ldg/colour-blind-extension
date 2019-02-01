$(document).ready(function () {

    $('.contentTabs').hide();

    chrome.storage.sync.get('new_user', function (items) {
        if (!items['new_user']) {
            firstTimeSetup();
        }
    });

    $('#button_test').on('click', revertChanges);

    $('.tab').click(function () {
        var contentId = (this.id).slice(0, -4);
        $('.content').hide();
        $('#content_' + contentId).show();
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#colour_changer_options_tabs .config').on('click', previewColours);

    $('#colour_changer_apply').on('click', function () {
        setColour();
    });

    $('#content_custom_design_settings_configs .config').on('click', loadConfig);

    $('.drop_down_tip').on('click', helpTab);
});

function helpTab() {
    $('.contentTabs').hide();

    if($(this).hasClass('active')){
        alert('test');
        $(this).removeClass('active');
    } else {
        $('.drop_down_tip').removeClass('active');
        $(this).addClass('active');
        $(this).parent().find('.contentTabs').show();
    }
}

function previewColours() {
    var id = (this.id).substr(-1);
    var name = 'config_' + id;
    chrome.storage.sync.get(name, function(items){
        $('#colour_changer_options_preview').css({
            'background-color': items[name]['bgColour'],
            'color': items[name]['fontColour'],
            'border-color': items[name]['borderColour']
        });
        $('#colour_changer_options_preview_message').hide();
        $('#colour_changer_options_preview_display').show();
        $('#colour_changer_options_preview_display_title').html(items[name]['name']);
        $('#colour_changer_options_preview_display_background_colour').html(items[name]['bgColour']);
        $('#colour_changer_options_preview_display_font_colour').html(items[name]['fontColour']);
        $('#colour_changer_options_preview_display_border_colour').html(items[name]['borderColour']);
    });
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
            });
        });
    });
}

function loadConfig() {
    var id = (this.id.substr(-8));
    $('#content_custom_design_settings_form').load('/views/custom_design_form.html', function () {
        $('#custom_design_submit').click(function () {
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

function saveConfig() {
    var id = $('#custom_design_id').val();
    var name = $('#custom_design_name').val();
    var background = $('#custom_design_background_colour').val();
    var font = $('#custom_design_font_colour').val();
    var border = $('#custom_design_border_colour').val();

    var config = {};
    config[id] = {name: name, bgColour: background, fontColour: font, borderColour: border};

    chrome.storage.sync.get(id, function (items) {
        if (items[id] != undefined) {
            chrome.storage.sync.remove(id, function () {
                chrome.storage.sync.set(config, function () {
                    //SET SUCCESS MESSAGE
                    console.log('Successfully Saved');
                });
            });
        }
    })
}

function checkForNewUser() {


}

//First Time Setup
function firstTimeSetup() {
    chrome.storage.sync.clear();
    setConfigs();
}

//Sets the predefined configs
function setConfigs() {
    chrome.storage.sync.set({
        config_0: {name: 'Deuteranopia', bgColour: '#efefff', fontColour: '#252525', borderColour: '#252525'},
        config_1: {name: 'Protanopia', bgColour: '#e8e8db', fontColour: '#3d3d9b', borderColour: '#3d3d9b'},
        config_2: {name: 'Tritanopia', bgColour: '#fbdee2', fontColour: '#252525', borderColour: '#252525'},
        config_3: {name: 'Protanopia/Tritanopia', bgColour: '#b6b690', fontColour: '#3d3d9b', borderColour: '#3d3d9b'},
        config_4: {
            name: 'Deuteranopia/Tritanopia',
            bgColour: '#edf3f7',
            fontColour: '#a60037',
            borderColour: '#a60037'
        },
        new_user: true
    });
}

function revertChanges()
{
    chrome.tabs.executeScript({
        file: "public/js/jquery-3.3.1.min.js"
    }, function () {
        chrome.tabs.executeScript({
            file: "public/js/revert.js"
        });
    });
}