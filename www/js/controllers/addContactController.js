angular.module('dbt')
.controller('AddContactCtr', function($cordovaContacts, ContactService) {
	
	this.import = importContact;
	
	function importContact() {
		ContactService.importContact()
	}
})