describe('ContactController', function() {
	var controller,
		contactServiceMock;
		
	var contacts = [{
		displayName : 'John Smith',
		phoneNumbers : [{
			type : 'mobile',
			value : '+64242222222',
			pref : true
		}]
	}];
			
	beforeEach(module('dbt'));
	
	beforeEach(inject(function($controller) {
		
		contactServiceMock = {
			contacts : function() {
				return contacts
				}
			};
			
			controller = $controller('ContactCtr', {
				'ContactService' : contactServiceMock
			});
		
	}));
	
	
	describe('#getContacts', function() {
		it('should return contacts', function() {
			expect(controller.contacts).toEqual(contacts);
		});
	});
});