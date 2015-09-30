angular.module('dbt')
.controller('ContactCtr', function($ionicPlatform, $cordovaContacts, ContactService) {
	
	this.contacts = ContactService.contacts();	
	
		this.chooseContact = chooseContact;
		
		function chooseContact() {
			$cordovaContacts.pickContact().then(function (contactPicked) {
			ContactService.addContact(contactPicked);
		});
		}
		
});
		