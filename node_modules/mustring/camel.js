//camel-case → CamelCase
module.exports = function(str){
	return str && str.replace(/-[a-z]/g, function(match, position){
		return match[1].toUpperCase();
	})
}