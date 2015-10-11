angular.module('dbt')
.controller('AddContactCtr', function($cordovaContacts, ContactService, $state) {
	
	this.import = importContact;
	this.addContact = addContact;
	
	function importContact() {
		ContactService.importContact().then(function() {
			$state.go('home');
		}).catch(function(error) {
			console.log(error);
			alert('Woops. It looks like the contact import failed. Try adding a contact manually');
		});
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
			
		ContactService.addContact(newContact).then(function() {
			$state.go('home');
		}).catch(function(error) {	
			console.log(error);
			alert('Woops. It looks like adding a contact because of a storage issue.');
		});
	}
})