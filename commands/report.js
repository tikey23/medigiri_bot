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

module.exports.run = async (bot, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Konnte username nicht finden.");
	let reason = args.join(" ").slice(22);
	let botIcon = message.guild.iconURL;

	let reportEmbed = new Discord.RichEmbed()
		.setThumbnail(botIcon)
		.setDescription("Report")
		.setColor("#00ff00")
		.addField("Reported user", `${rUser} mit Id ${rUser.id}`)
		.addField("Reported by", `${message.author} mit Id ${message.author.id}`)
		.addField("Channel", message.channel)
		.addField("Zeit", message.createdAt)
		.addField("Grund", reason);

	let reportchannel = message.guild.channels.find("name", "zoo");
	if(!reportchannel) return message.channels.send("Konnte Report-Channel nicht finden");

	message.delete().catch(O_o=>{});
	reportchannel.send(reportEmbed);
};

module.exports.help = {
	name: "report"
};