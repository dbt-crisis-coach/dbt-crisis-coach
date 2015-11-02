angular.module('dbt')
.factory('EmailService', function($ionicPlatform, $cordovaEmailComposer) {
	
	var service = {
		emailFile : emailFile
		
	}
	return service;
	
	function emailFile(fileName) {
		return $ionicPlatform.ready().then(function() {
			var email = {
				attachments : ['file:' + fileName]
			}
			return $cordovaEmailComposer.open(email);
		});
	}
});