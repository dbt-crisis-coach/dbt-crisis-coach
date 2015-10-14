angular.module('dbt')
.controller('ProfileCtr', function($stateParams, ContactService, $scope) {
	var self = this;
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.name = contact.name;
	})
	.catch(function(error) {
		console.log(error.message);
		alert('Cannot find that contact');
	});
	
})