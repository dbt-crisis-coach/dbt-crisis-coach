angular.module('dbt')
.controller('ContactCtr', function($ionicPlatform, $cordovaContacts, ContactService) {
	
	this.contacts = ContactService.contacts();	
	
		this.chooseContact = chooseContact;
		
		function chooseContact() {
			$ionicPlatform.ready(function() {
					$cordovaContacts.pickContact().then(function (contactPicked) {
					ContactService.addContact(contactPicked);
				});
			})
			
		}
		
});
		