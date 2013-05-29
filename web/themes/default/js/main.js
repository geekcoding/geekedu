define(function(require, exports) {
  exports.init = function() {
  	var $ = require('jquery');
  	$(function(){
  		require('bootstrap');
  		require('less');
  		require('mediaelement');
  		$('audio,video').mediaelementplayer({
          success: function(player, node) {
              $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
          }
      });
  	});
  	localStorage.clear();
  };
});