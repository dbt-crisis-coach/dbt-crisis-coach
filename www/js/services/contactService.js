angular.module('dbt-contact')
.factory('ContactService', function($ionicPlatform, $cordovaContacts, $q, $cordovaSQLite) {

  //would get data from the phone
  var data = []

  var service = {
	//contact passes through the ID
	contact : Contact,
	//contacts returns every contact
	contacts : Contacts,
	//adds choosen contact to data
	addContact : insertContact,
	//import contact from phone contacts
	importContact: importContact

  }
  return service;

  function Contact(id) {
	var query = "SELECT * FROM Contacts WHERE ContactId = ?";
	console.log('id = ' + id);
	return $cordovaSQLite.execute(db, query, [id]).then(function(result) {
	  return(result.rows.item(0));
	});
  }

  function Contacts() {
	return $ionicPlatform.ready().then(function() {
	  var query = "SELECT * FROM Contacts";
	  return $cordovaSQLite.execute(db, query, []).then(function(result) {
		var contacts = [];
		for(var i = 0; i < result.rows.length; i++) {
		  contacts.push(result.rows.item(i));
		}
		return contacts;
	  });
	});
  }

  function importContact() {
	return $ionicPlatform.ready().then(function() {
	  return $cordovaContacts.pickContact().then(function (contactPicked) {
		return insertContact(contactPicked);
	  });
	});
  }

  function insertContact(contact) {

	var query = "INSERT INTO Contacts (Name, ImportId) VALUES (?,?)";

	return $cordovaSQLite.execute(db, query, [contact.displayName, contact.id]).then(function(res) {
	  return insertNumbers(res.insertId, contact.phoneNumbers);
	});

  }

  function insertNumbers(contactId, phoneNumbers) {
	var insertNumberWorkers = [];
	phoneNumbers.forEach(function(element) {
	  var query = "INSERT INTO Numbers (ContactId, Type, Number, Pref) VALUES (?,?,?,?)";
	  insertNumberWorkers.push($cordovaSQLite.execute(db, query, [contactId, element.type, element.value, element.pref]));
	});

	return $q.all(insertNumberWorkers);
  }
});