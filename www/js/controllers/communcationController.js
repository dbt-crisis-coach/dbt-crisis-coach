angular.module('dbt')
.controller('CommunicationCtr',function($stateParams, ContactService, $state, $ionicViewSwitcher, CommunicationsService, CSVService, FileService, EmailService) {	
	var self = this;
	
	self.texts = [];
	self.edit = false;
	
	self.goBack  = goBack;
	self.toggleSummary = toggleSummary;	
	self.finishSummary = finishSummary;
	
	
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
			summaryComplete();
		}
		else {
			self.edit = true;
			self.title = 'SMS to summarise';			
		}
	}
	
	function summaryComplete() {
		self.edit = false;
		self.title = self.contact.name;
		self.texts.forEach(function(element) {
			element.checked = false;
		});
	}
	
	function finishSummary() {
		var csv = CSVService.convertToCSV(self.texts);
		FileService.save('report.csv', csv).then(function(result) {
			return EmailService.emailFile(result.nativeURL);
		})
		.then(function() {
			summaryComplete();
		})
		.catch(function(error) {
			console.log(error);
		})
		.finally(function() {
			//Delete
		});
	}
});