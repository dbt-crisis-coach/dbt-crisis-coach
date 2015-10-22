angular.module('dbt')
.controller('ProfileCtr', function($stateParams) {
	
	this.contactId = $stateParams.contactId;
});