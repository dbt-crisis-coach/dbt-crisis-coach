angular.module('dbt')
.controller('ContactCtr', function(ContactService) {
	
	this.contacts = ContactService.contacts();	
});