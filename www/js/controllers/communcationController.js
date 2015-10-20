angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService) {
	
	var contact = ContactService.contact($stateParams.contactId);
	
	this.title = contact.displayName;
	
});