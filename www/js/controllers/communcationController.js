angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher, CommunicationsService) {	
	var self = this;
	
	self.texts = [];
	self.edit = false;
	
	self.goBack  = goBack;
	self.toggleSummary = toggleSummary;	
	
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.contact = contact;
		return CommunicationsService.readTexts(contact.number);
	})
	.then(function(texts) {
		//stop loading ticker
		self.texts = texts;
	})
	.catch(function(error) {
		console.log(error.message);
		alert('Cannot find that contact');
	});
				
	function goBack() {
		$ionicViewSwitcher.nextDirection('back');
		$state.go('home');
	}
	
	function toggleSummary() {
		if(self.edit) {
			self.edit = false
		}
		else {
			self.edit = true;
		}
	}
});