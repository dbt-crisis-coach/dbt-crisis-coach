angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService, $scope) {	
	var self = this;
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
					self.title = contact.name;
				});
});