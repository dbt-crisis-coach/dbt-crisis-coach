angular.module('dbt')
.factory('ContactService', function() {

	//would get data from the phone
	var data = [];



	var service = {
		//contact passes through the ID
		contact : Contact,
		//contacts returns every contact
		contacts : Contacts,
		//adds choosen contact to data
		addContact : addContact
		
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
	
	function addContact(contact) {
		data.push(contact);
	}
});
