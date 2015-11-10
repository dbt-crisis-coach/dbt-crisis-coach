angular.module('dbt')
.factory('FileService', function($ionicPlatform, $cordovaFile) {
	
	var service = {
		save : save,
		remove : remove
		
	}
	
	return service;
	
	function save(filename, data) {
		
		return $ionicPlatform.ready().then(function() {
			//Creates file in cache and replaces if filename already exists
			return $cordovaFile.createFile(cordova.file.externalCacheDirectory, filename, data, true);
		});
		
	}
	
	function remove(fileName) {
		return $cordovaFile.removeFile(cordova.file.externalCacheDirectory, fileName);
	}
});