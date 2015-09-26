angular.module('dbt')
.factory('ContactService', function() {
	
	var data = [{
		id: 1,
		name: 'Michael'
	},
	{
		id: 2,
		name: 'Jaymesh'
	}];
	
	var service = {
		contact : Contact,
		contacts : Contacts
	}
	
	return service;

	function Contact(id) {
		var contactResult
		data.forEach(function(contact) {
			if(contact.id == id) {
				contactResult = contact;
				return;
			}
		});
		return contactResult;
	}
	
	function Contacts() {
		return data;
	}
});
