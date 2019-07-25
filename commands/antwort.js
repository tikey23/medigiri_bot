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
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	let currentAnimeFile = './anime-wallpaper/current_anime.json';
	let currentAnime = JSON.parse(fs.readFileSync(currentAnimeFile));

	let coinFile = "./coins.json";
	let coins = JSON.parse(fs.readFileSync(coinFile));

	let answer = args.join(" ");

	console.log(answer);
	console.log(currentAnime.name);

	if(currentAnime.name.toLowerCase() === answer.toLowerCase()) {
		if(!coins[message.author.id]) {
			coins[message.author.id] = 1;
		} else {
			coins[message.author.id] = coins[message.author.id]+1;
		}

		fs.writeFile(coinFile, JSON.stringify(coins), (err) => {
			if(err) console.log(err);
		});

		return message.channel.send(`${answer} ist korrekt. Gratuliere!`);
	} else {
		return message.channel.send(`${answer} ist leider falsch.`);
	}
};

module.exports.help = {
	name: "antwort"
};