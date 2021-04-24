const fetch = require("node-fetch");

exports.getUserInfo = async function(){
    let ip = await fetch("https://api.myip.com/");
    ip = await ip.json();
    return ip;
}

exports.generateApikey = function()
{
	let d = new Date().getTime();
	
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		let r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

return uuid;
}