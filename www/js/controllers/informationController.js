angular.module('dbt')
.controller('InformationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher) {	
	var self = this;
	
	self.goBack  = goBack;
	
	ContactService.contact($stateParams.contactId).then(function(contact) {
		self.title = contact.name;
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