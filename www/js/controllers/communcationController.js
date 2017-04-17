angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher, CommunicationsService) {	
	var self = this;
	
	self.texts = [];
	
	self.goBack  = goBack;
	self.toggleSummary = toggleSummary;	
	
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.contact = contact;
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
	
	function toggleSummary() {
		if(self.edit) {
			self.edit = false;
			self.title = self.contact.name;
			self.texts.forEach(function(element) {
				element.checked = false;
			});
		}
		else {
			self.edit = true;
			self.title = 'SMS to summarise';			
		}
	}
});