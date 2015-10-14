describe('AddContactController', function() {
  var controller,
  contactServiceMock,
  goPram;
  
  var state = {
	  go: function(state, params) {
		  	goPram = params
		  }
  }
  

  var deferred;
  var promise;

  var contact = {
    displayName : 'John Smith',
    phoneNumber : '+64242222222'
  };
  
 var  expectedContact = {
    displayName : 'John Smith',
    phoneNumbers : [{
      type : 'mobile',
      value : '+64242222222',
      pref : true
    }]
  }
  
  var contactResult = [];

  beforeEach(module('dbt-contact'));

  beforeEach(inject(function($controller, $q) {
	deferred = $q.defer();
	promise = deferred.promise;
	
	spyOn(state, 'go');

	contactServiceMock = {
	  addContact : function(contact) {
		contactResult.push(contact);
		return promise;
	  }
	};

	controller = $controller('AddContactCtr', {
	  'ContactService' : contactServiceMock,
	  '$state': state
	});
  }));


  describe('#addContact', function() {
    var rootScope;
    
    beforeEach(inject(function($rootScope) {
      deferred.resolve(contact);
      rootScope = $rootScope;
    }));
    
    it('should add 1 contact', function() {
      expect(controller.addContact(contact)).toBeUndefined();
      rootScope.$apply();
      expect(contactResult[0]).toEqual(expectedContact);
    });
    
    it('should go home once finished', function() {
      expect(controller.addContact(contact)).toBeUndefined();
      rootScope.$apply();      
      expect(state.go).toHaveBeenCalledWith('home');
      
    });
  });
});