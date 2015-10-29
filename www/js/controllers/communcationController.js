angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher, CommunicationsService) {	
	var self = this;
	
	self.goBack  = goBack;
	self.texts = [];
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.title = contact.name;
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
});