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

const anilist = require("../anilist-api/index.js");

module.exports.run = async (bot, message, args) => {
	response = await anilist.search(args, "ANIME", 'search');

	if (response.error) {
		message.channel.send(response.error.message);
		return;
	}

	if (response.author.url) {
		message.channel.send(`<${response.author.url}>`);
	}

	message.channel.send({
		embed: {
			...response,
			color: 3447003
		}
	});
};

module.exports.help = {
	name: "anime-search"
};