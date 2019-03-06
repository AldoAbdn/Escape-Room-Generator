// onEvt → envt
module.exports = function(str, pf){
	return (str.slice(0,pf.length) === pf) ? str.slice(pf.length).toLowerCase() : str;
}