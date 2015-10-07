angular.module('dbt')
.controller('AddContactCtr', function($cordovaContacts, ContactService, $state) {
	
	this.import = importContact;
	this.addContact = addContact;
	
	function importContact() {
		ContactService.importContact()
	}
	
	function addContact(contact) {
		var newContact = {
				displayName : contact.displayName,
				phoneNumbers : [{
					type : 'mobile',
					value : contact.phoneNumber,
					pref : true
				}]
			};
			
		ContactService.addContact(newContact);
		$state.go('home');
	}
})