angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService, $ionicHistory) {	
	var self = this;
	
	self.goBack  = goBack;
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
					self.title = contact.name;
				});
				
	function goBack() {
		$ionicHistory.goBack();
	}
});