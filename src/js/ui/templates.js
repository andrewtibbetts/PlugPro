this["JST"] = this["JST"] || {};

this["JST"]["src/html_templates/menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="inner-pro-menu">\n\t<img src="' +
((__t = ( chromeDir )) == null ? '' : __t) +
'/images/logo_large.png" alt="PlugPro" class="pro-logo">\n\t<ul id="pro-toggle-settings" class="inner-pro-menu">\n\t\t\n\t</lu>\n</div>\n';

}
return __p
};

this["JST"]["src/html_templates/toggle_setting.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="setting-title">' +
((__t = ( title )) == null ? '' : __t) +
'</div>\n<div class="toggle-button">\n\t<input type="checkbox">\n</div>\n';

}
return __p
};