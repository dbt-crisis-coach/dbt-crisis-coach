angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService) {
	
	var contact = ContactService.contact($stateParams.id);
	
	this.title = contact.displayName;
	
});