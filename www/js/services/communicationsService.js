angular.module('dbt')
.factory('CommunicationsService', function($ionicPlatform, $q) {
	
	var service = {
		readTexts: readTexts
	}
	return service;
	
	function readTexts(contactNumber) {
		
		var filter = {
                box : '',
                address : contactNumber.replace(/[^\d\+]/g,"")
            }
			
		return $ionicPlatform.ready().then(function() {
			return $q(function(resolve, reject) {
				SMS.listSMS(filter, function(data) {
					resolve(data);
				}, function(error) {
					reject(error);
				});
			});
		});
	}
	
});