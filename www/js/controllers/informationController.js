angular.module('dbt')
.controller('InformationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher) {	
	var self = this;
	
	self.goBack  = goBack;
	self.edit = edit;
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.contact = contact;
		self.title = contact.name;
		self.number = contact.number;
		// Mock Details
		self.details = {
			pref: "Asking Michael about it",
			triggers: ["Misunderstanding Angular/Ionic as a combo", "knowing it's nap time but I'm so..close..."],
			extra: "It might be time for bed"
		}
	})
	.catch(function(error) {
		console.log(error.message);
		alert('Cannot find that contact');
	});
	
	function finishEdit() {
		
	}

	function edit() {
		$state.go('profile.edit');
	}




	function goBack() {
		$ionicViewSwitcher.nextDirection('back');
		$state.go('home');
	}
});