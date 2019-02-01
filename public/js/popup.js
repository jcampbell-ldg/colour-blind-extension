//Main file used within the popup. This file is ran anytime the Extension is opened
$(document).ready(function () {

    //DOM: Can this be removed and put into css?
    $('.contentTabs').hide();

    //Checks if the user is a new user by checking Storage
    chrome.storage.sync.get('new_user', function (items) {
        if (!items['new_user']) {
            firstTimeSetup();
        }
    });


    //Main Extension Tabs controller - Loads and hides pages
    $('.tab').click(function () {
        var contentId = (this.id).slice(0, -4);
        $('.content').hide();
        $('#content_' + contentId).show();
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    //Event listeners
    $('#button_test').on('click', revertChanges);
    $('#colour_changer_options_tabs .config').on('click', previewColours);
    $('#colour_changer_apply').on('click', setColour);
    $('#content_custom_design_settings_configs .config').on('click', loadConfig);
    $('.drop_down_tip').on('click', helpTab);
});

//Function that is used on the help tab to hide/show content
function helpTab() {
    $('.contentTabs').hide();

    if($(this).hasClass('active')){
        $(this).removeClass('active');
    } else {
        $('.drop_down_tip').removeClass('active');
        $(this).addClass('active');
        $(this).parent().find('.contentTabs').show();
    }
}

//Function that is used to get config from storage and load the preview section
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

//Function that is used to execute Content Script
//Chrome functions are Asynchronous therefore functions are called in the callback function
function setColour() {
    var colours = [$('#colour_changer_options_preview_display_background_colour').html(), $('#colour_changer_options_preview_display_font_colour').html()];

    //Chosen Config is first saved in storage
    chrome.storage.sync.set({
        colours: colours
    }, function () {
        //Then Jquery is executed so that the Content Script has jquery
        chrome.tabs.executeScript({
            file: "public/js/jquery-3.3.1.min.js"
        }, function () {
            //Then the Content script is executed
            chrome.tabs.executeScript({
                file: "public/js/content.js"
            });
        });
    });
}

//This function loads the selected config and loads it into the custom design form
function loadConfig() {
    var id = (this.id.substr(-8));
    //Load the custom design form template and set any event listeners
    $('#content_custom_design_settings_form').load('/views/custom_design_form.html', function () {
        $('#custom_design_submit').on('click', saveConfig);

        //Get the chosen config from storage and set the values in the form
        chrome.storage.sync.get(id, function (items) {
            $('#custom_design_id').val(id);
            $('#custom_design_name').val(items[id]['name']);
            $('#custom_design_background_colour').val(items[id]['bgColour']);
            $('#custom_design_font_colour').val(items[id]['fontColour']);
            $('#custom_design_border_colour').val(items[id]['borderColour']);
        });
    });
}

//This function saves the config submitted in the custom design form
function saveConfig() {
    var id = $('#custom_design_id').val();
    var name = $('#custom_design_name').val();
    var background = $('#custom_design_background_colour').val();
    var font = $('#custom_design_font_colour').val();
    var border = $('#custom_design_border_colour').val();

    var config = {};
    config[id] = {name: name, bgColour: background, fontColour: font, borderColour: border};

    //Get current values for config
    chrome.storage.sync.get(id, function (items) {
        if (items[id] != undefined) {
            //Remove current config
            chrome.storage.sync.remove(id, function () {
                //Save new updated config
                chrome.storage.sync.set(config);
            });
        }
    })
}

//First Time Setup - Clears the users storage
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

//Function that executes revert script when the Reset button is selected
function revertChanges()
{
    //Execute Jquery so that it is in the revert script
    chrome.tabs.executeScript({
        file: "public/js/jquery-3.3.1.min.js"
    }, function () {
        //Execute Revert script
        chrome.tabs.executeScript({
            file: "public/js/revert.js"
        });
    });
}