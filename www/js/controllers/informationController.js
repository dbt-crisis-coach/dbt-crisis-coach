angular.module('dbt')
.controller('InformationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher) {	
	var self = this;
	self.editing = false;
	self.newTrigger = false;
	
	self.goBack  = 	function() {
		$ionicViewSwitcher.nextDirection('back');
		$state.go('home');
	};
	self.edit = function() {
		self.editing = true
	};
	self.finishEdit = function() {
		self.editing = false
	};


	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.title = contact.name;
		// Mock Details
		self.contact = {
			mobile: contact.number,
			address: "275 Cuba Street, Te Aro, Wellington",
			pref: "Asking Michael about it",
			triggers: ["Misunderstanding Angular/Ionic as a combo", "knowing it's nap time but I'm so..close..."],
			extra: "It might be time for bed"
		
		}
	})
	.catch(function(error) {
		console.log(error.message);
		alert('Cannot find that contact');
	});
});