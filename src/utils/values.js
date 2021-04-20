const fetch = require("node-fetch");

exports.getUserInfo = async function(){
    let ip = await fetch("https://api.myip.com/");
    ip = await ip.json();
    return ip;
}