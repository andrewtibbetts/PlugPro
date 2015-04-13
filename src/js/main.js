
// create global API object
var plugPro = window.plugPro = {};
plugPro.updates = require("./updates");

// Load html templates
var JST = require("./templates");

var Room = require('./Room');
var room = new Room();

room.on("load", function(){

	plugPro.version = $('#plug_pro_chrome_extension_version').val();
	plugPro.id = $('#plug_pro_chrome_extension_id').val();

	var Menu = require('./views/MenuView');
	var ViewButtonsView = require('./views/ViewButtonsView');

	var Toggle = require('./settings/Toggle');
	var AutoWootToggle = require('./settings/AutoWootToggle');
	var ChatImagesToggle = require('./settings/ChatImagesToggle');

	var storage = require('./storage/storage');
	storage.init();

	var userId = API.getUser().id;

	// Autowoot
	var awToggle = new Toggle( true, "autowoot" );
	var autowootToggle = new AutoWootToggle( awToggle, userId );

	// Chat images
	var ciToggle = new Toggle( true, "chatImages" );
	var chatImagesToggle = new ChatImagesToggle( ciToggle, userId );

	// Add PlugPro menu
	var menu = new Menu( {
		toggleSettings: {
			"AutoWoot": autowootToggle,
			"Chat Images": chatImagesToggle
		}
	});
	$('#app-menu').append( menu.$el );
	menu.render();

	plugPro.settings = {
		autowoot: autowootToggle
	}

	var buttonView = new ViewButtonsView();
	$('#room').append( buttonView.el );
	buttonView.render();


	var lastVersionUsed = storage.getVersion();
	if( window.plugPro.updates[ plugPro.version ] && lastVersionUsed !== plugPro.version ){
		var UpdatesModalView = require('./views/UpdatesModalView');
		var updatesModalView = new UpdatesModalView();
		$('body').append( updatesModalView.el );
		updatesModalView.render();
	}
	
	// Mute / Unmute audio via spacebar
	$('body').on('keyup',function(e){
		if ( e.keyCode != 32 || $(e.target).prop('tagName') != 'BODY' ) return true;
		var current_volume = API.getVolume();
		var unmuted_volume = 75;
		if ( $(this).data('volume') ) unmuted_volume = $(this).data('volume');
		if ( current_volume == 0 ) {
			API.setVolume(unmuted_volume);
		} else {
			API.setVolume(0);
			$(this).data('volume',current_volume);
		}
		return true;
	});

});
room.init();
