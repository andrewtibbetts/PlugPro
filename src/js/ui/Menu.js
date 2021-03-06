/**
 * UI for the PlugPro Menu
 * @module settings/AutoWootToggle
 */

/**
 * Menu UI constructor
 * @constructor
 * @param {object} JST - Javascript HTML templates
 * @param {object} toggleSettings - List of settings and their corresponding togglers
 */
function Menu( JST, toggleSettings ){
	this.$parent = $('#app-menu');
	this.visible = false;

	// Load menu template
	var menuHTML = JST['src/html_templates/menu.html']({
		chromeDir: 'chrome-extension://' + $('#plug_pro_chrome_extension_id').val()
	});
	this.$parent.append( menuHTML );

	// Add all toggle settings
	var setting;
	for( setting in toggleSettings ){
		this.detectCheckboxChanges( setting, toggleSettings[setting] );
	}

	this.initializeEvents();
	
}

/**
 * Adds change events to menu items
 */
Menu.prototype.initializeEvents = function(){
	// Detect Plug.DJ menu animations to trigger Pro menu open/close
	this.$parent.find('.list')[0].addEventListener(
		this.getTransitionEvent(),
		this.toggle.bind(this),
		false
	);

	// Prevent menu from closing when clicking in the Pro Menu
	document.addEventListener("mousedown", function(event){
		var target = $(event.target);
		if(
			event.target.id === "plugpro-menu" ||
			target.parents('#plugpro-menu').length > 0
		){
			event.stopPropagation();
		}
	}, true);
};

/**
 * Makes toggle checkboxes functional
 */
Menu.prototype.detectCheckboxChanges = function( settingName, setting ){
	var $toggleSettingsUL = this.$parent.find('#pro-toggle-settings');

	// Add setting HTML
	var toggleSettingHTML = JST['src/html_templates/toggle_setting.html']({
		title: settingName
	});
	var $toggleSettingElement = $($.parseHTML( toggleSettingHTML ));
	$toggleSettingsUL.append( $toggleSettingElement );

	// Link checkbox to toggler
	$toggleSettingElement.find('.'+settingName.toLowerCase()+'-setting').change(function(){
		setting.toggler.toggle.apply(setting.toggler);
	});
};

/**
 * Toggle Pro menu visibility
 */
Menu.prototype.toggle = function(){
	var left = this.$parent.find('.list').css("left");
	if( left === "0px" ){
		this.show();
	}else{
		this.hide();
	}
};

/**
 * Make Pro menu visible
 */
Menu.prototype.show = function(){
	$('#plugpro-menu').addClass("expanded");
	this.visible = true;
};

/**
 * Make Pro menu hidden
 */
Menu.prototype.hide = function(){
	$('#plugpro-menu').removeClass("expanded");
	this.visible = false;
};

/**
 * Determine correct transition event name
 * @returns {string} The name of the transition event used by the user's browser
 */
Menu.prototype.getTransitionEvent = function( el ){
	var el = el || document.createElement('div');
	var animations = {
		'animation':'transitionend',
		'OAnimation':'oTransitionEnd',
		'MozAnimation':'transitionend',
		'WebkitAnimation':'webkitTransitionEnd'
	};

	for(var t in animations){
		if( el.style[t] !== undefined ){
			return animations[t];
		}
	}
};

module.exports = Menu;