angular.module('dbt-contact')
.factory('ContactService', function($ionicPlatform, $cordovaContacts, $q, $cordovaSQLite) {

  var service = {
	contact : Contact,
	contacts : Contacts,
	addContact : InsertContact,
	importContact: ImportContact

  }
  return service;

  function Contact(id) {
	var query = "SELECT * FROM Contacts C JOIN Numbers AS N ON C.contactId= N.contactId WHERE C.contactId = ?";
	return $cordovaSQLite.execute(db, query, [id]).then(function(result) {
	  return(result.rows.item(0));
	});
  }

  function Contacts() {
	return $ionicPlatform.ready().then(function() {
	  var query = "SELECT * FROM Contacts";
	  return $cordovaSQLite.execute(db, query, []);
	})
	.then(function(result) {
		var contacts = [];
		for(var i = 0; i < result.rows.length; i++) {
		  contacts.push(result.rows.item(i));
		}
		return contacts;
	  });
  }

  function ImportContact() {
	return $ionicPlatform.ready()
	  .then(function() {
		return $cordovaContacts.pickContact();
	  })
	  .then(function (contactPicked) {
		return InsertContact(contactPicked);
	  })
  }

  function InsertContact(contact) {

	var query = "INSERT INTO Contacts (name, importId) VALUES (?,?)";

	return $cordovaSQLite.execute(db, query, [contact.displayName, contact.id]).then(function(res) {
	  return InsertNumbers(res.insertId, contact.phoneNumbers);
	});

  }

  function InsertNumbers(contactId, phoneNumbers) {
	var insertNumberWorkers = [];
	phoneNumbers.forEach(function(element) {
	  var query = "INSERT INTO Numbers (contactId, type, number, pref) VALUES (?,?,?,?)";
	  insertNumberWorkers.push($cordovaSQLite.execute(db, query, [contactId, element.type, element.value.replace(/[^\d\+]/g,""), element.pref]));
	});

	return $q.all(insertNumberWorkers);
  }
});