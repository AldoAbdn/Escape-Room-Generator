//aaa → Aaa
module.exports = function(str){
	str+='';
	if (!str) return str;
	return str[0].toUpperCase() + str.slice(1);
};