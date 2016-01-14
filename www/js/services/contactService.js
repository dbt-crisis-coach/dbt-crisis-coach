angular.module('dbt-contact')
.factory('ContactService', function($ionicPlatform, $cordovaContacts, $q, $cordovaSQLite) {

  var service = {
	contact : Contact,
	contacts : Contacts,
	addContact : InsertContact,
	importContact: ImportContact,
	updateContact: UpdateContact,
	getTriggers: GetTriggers,
	newTrigger: NewTrigger

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
	  insertNumberWorkers.push($cordovaSQLite.execute(db, query, [contactId, element.type, element.value, element.pref]));
	});

	return $q.all(insertNumberWorkers);
  }
  function UpdateContact(id, contact) { 
  	var query = 'UPDATE Numbers SET number=? WHERE contactId=?;' 
  	// var query = 'UPDATE Numbers SET number=? WHERE contactId=?;' +
  	// 	' UPDATE Contacts SET skillPref=?, address=?, extra=? WHERE contactId=?;'
  	$cordovaSQLite.execute(db, query, [contact.mobile, id]
  		// , contact.pref, contact.address, contact.extra, id]
  	);
  }
  function GetTriggers(contactId){
  	var table = "Triggers_" + contactId;
  	var triggers = [];
  	var query = 'CREATE TABLE IF NOT EXISTS '+ table + ' (TriggerId integer primary key, description text);'+
	 	'INSERT INTO ' + table + ' (description) VALUES ("I am a trigger");'
 	$cordovaSQLite.execute(db, query);
 	query = 'SELECT * FROM ' + table;
  	return $cordovaSQLite.execute(db, query).then(function(result) {
  		for (var i=0; i<result.rows.length; i++){
  			triggers.push(result.rows.item(i).description)
  		}
  		return triggers
	});
  }
  function NewTrigger(contactId, trigger){
  	var table = "Triggers_" + contactId; 
  	var query = 'INSERT INTO ' + table + ' (description) VALUES ("' + trigger + '");'
  	$cordovaSQLite.execute(db, query)
  }
});