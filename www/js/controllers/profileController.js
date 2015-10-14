angular.module('dbt')
.controller('ProfileCtr', function($stateParams, ContactService, $scope) {
	var self = this;
	
	ContactService.contact($stateParams.ContactId).then(function(contact) {
		self.Name = contact.Name;
	})
	.catch(function(error) {
		console.log(error.message);
		alert('Cannot find that contact');
	});
	
})