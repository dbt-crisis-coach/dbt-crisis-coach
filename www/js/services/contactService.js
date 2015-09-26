angular.module('dbt')
.factory('ContactService', function() {

	//would get data from the phone
	var data = [{
		id: 1,
		name: 'Michael'
	},
	{
		id: 2,
		name: 'Jaymesh'
	}];



	var service = {
		//contact passes through the ID
		contact : Contact,
		//contacts returns every contact
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
