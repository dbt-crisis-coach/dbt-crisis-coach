angular.module('dbt')
.controller('ContactCtr', function($ionicPlatform, $cordovaContacts, ContactService) {
	
	this.contacts = ContactService.contacts();	
		
});
		