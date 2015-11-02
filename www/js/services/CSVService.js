angular.module('dbt')
.factory('CSVService', function() {
	
	var service = {
		convertToCSV : convertToCSV
	}
	
	return service;
	
	function convertToCSV(objArray) {
	
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		
		//Headers
		var line = '';
		for (var index in array[0]) {
			if (line != '') line += ','
				line += index
			}
		str += line + '\r\n';

		//Data
		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ','

				if(index == 'date' || (index == 'date_sent' && array[i][index] != 0) ) {
					line += new Date(array[i][index]);
				} 
				else {
					line += array[i][index];
				}
			}
			str += line + '\r\n';
		}
		return str;
	};

});