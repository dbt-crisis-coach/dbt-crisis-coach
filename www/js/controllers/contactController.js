angular.module('dbt-contact', [])
.controller('ContactCtr', function(ContactService) {
	self = this;
	
	ContactService.contacts().then( function(contacts) {
		self.contacts = contacts;
	}).catch(function(error) {
		alert('Woops. Looks like we cannot find your contact because of a storage issue');
	});
	
});
		