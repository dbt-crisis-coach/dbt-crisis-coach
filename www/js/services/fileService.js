angular.module('dbt')
.factory('FileService', function($ionicPlatform, $cordovaFile) {
	
	var service = {
		save : save
	}
	
	return service;
	
	function save(filename, data) {
		
		return $ionicPlatform.ready().then(function() {
			//Creates file in cache and replaces if filename already exists
			return $cordovaFile.createFile(cordova.file.cacheDirectory, filename, data, true);
		})
		.then(function (success) {
			console.log(success);
		});;
		
	}
	
});