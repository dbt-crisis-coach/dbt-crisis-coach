angular.module('dbt')
.factory('EmailService', function($ionicPlatform, $cordovaEmailComposer) {
	
	var service = {
		emailFile : emailFile
		
	}
	return service;
	
	function emailFile(fileName) {
		return $ionicPlatform.ready().then(function() {
			console.log(fileName);
			return $cordovaEmailComposer.open({
				attachments : [fileName]
			});
		});
	}
});