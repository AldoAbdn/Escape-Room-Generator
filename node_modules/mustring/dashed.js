//CamelCase → camel-case
module.exports = function(str){
	return str && str.replace(/[A-Z]/g, function(match, position){
		return (position ? '-' : '') + match.toLowerCase();
	});
};