angular.module('dbt')
.factory('ContactService', function() {
	
	var data = [{
		id: 1,
		name: 'Michael'
	}];
	
	var service = {
		getContact : getContact
	}
	
	return service;
	
	function getContact(id) {
		data.forEach(function(contact) {
			if(contact.id == id) {
				return contact;
			}
		});
	}
});
