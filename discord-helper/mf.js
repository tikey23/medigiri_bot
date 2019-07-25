/***************************************************************
 *  Copyright notice
 *
 *  (c) Patrick Astor (support@happy-soft.de)
 *  All rights reserved
 *
 *  This is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  A copy is found in the textfile GPL.txt and important notices to the license
 *  from the author is found in LICENSE.txt distributed with these scripts.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

const Discord = require("discord.js");
const superagent = require("superagent");
const fs = require("fs");

mf = async (bot) => {
	let lastcallFile = './discord-helper/mf.json';
	let lastcall = fs.readFileSync(lastcallFile);
	let nextcall = Math.round(new Date().getTime()/1000);
	fs.writeFile(lastcallFile, nextcall, (err) => {
		if(err) console.log(err);
	});

	let {body} = await superagent.get('https://www.mangaforum.org/api/updates.php?time=' + lastcall);

	if(body === "" || body === null) return;

	body.newposts.forEach(function (item) {
		let embed = new Discord.RichEmbed()
			.setTitle("Neuer Beitrag")
			.setColor("#ffcf47")
			.setDescription("Hallo, ss wurde ein neuer Beitrag im Forum verfasst.")
			.addField("Thema", item.title)
			.addField("Autor", item.author)
			.addField("Link", item.link);

		let reportchannel = bot.channels.find("name", "mangaforum");
		reportchannel.send(embed);
	});

};

module.exports = mf;