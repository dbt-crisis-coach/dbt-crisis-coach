describe('ContactController', function() {
  var controller,
  contactServiceMock;

  var deferred;
  var promise;

  var contacts = [{
	displayName : 'John Smith',
	phoneNumbers : [{
	  type : 'mobile',
	  value : '+64242222222',
	  pref : true
	}]
  }];

  beforeEach(module('dbt-contact'))

  beforeEach(inject(function($controller, $q) {
	deferred = $q.defer()
	promise = deferred.promise

	contactServiceMock = {
	  contacts : function() {
		return promise
	  }
	};

	controller = $controller('ContactCtr', {
	  'ContactService' : contactServiceMock
	});
  }));


  describe('#getContacts', function() {
	it('should return contacts', inject(function($rootScope) {
	  expect(controller.contacts).toBeUndefined()
	  deferred.resolve(contacts)
	  $rootScope.$apply()
	  expect(controller.contacts).toEqual(contacts);
	}));
  });
});