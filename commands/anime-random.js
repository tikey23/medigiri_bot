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
const anilist = require("../anilist-api/index.js");

module.exports.run = async (bot, message, args) => {

	let randomId  = Math.floor((Math.random() * 3000));

	response = await anilist.search(randomId, "ANIME", 'id');

	if (response.error) {
		message.channel.send(response.error.message);
		return;
	}

	let embed = new Discord.RichEmbed()
		.setTitle("Welcher Anime ist das?")
		.setColor("#ffcf47")
		.setImage(response.thumbnail.url);

	message.channel.send(embed);
};

module.exports.help = {
	name: "anime-random"
};