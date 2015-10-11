angular.module('dbt')
.factory('ContactService', function($ionicPlatform, $cordovaContacts, $q) {

	//would get data from the phone
	var data = []

	var service = {
		//contact passes through the ID
		contact : Contact,
		//contacts returns every contact
		contacts : Contacts,
		//adds choosen contact to data
		addContact : addContact,
		//import contact from phone contacts
		importContact: importContact
		
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
		return $q(promise); 
		
		function promise(resolve, reject) {
			try {
				data.push(contact);	
				resolve(contact.id);						
			} catch(error) {
				reject(error);
			}
		}
	}
	
	function importContact() {
		return $ionicPlatform.ready().then(function() {
			return $cordovaContacts.pickContact().then(function (contactPicked) {
				return addContact(contactPicked);
			});
		});
	}
});