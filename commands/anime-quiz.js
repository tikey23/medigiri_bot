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
const https = require('https');
const fs = require("fs");
const superagent = require("superagent");
const list = require("../anime-wallpaper/anime_categories.json");
const Jimp = require('jimp');

module.exports.run = async (bot, message, args) => {
	if(message.author.username !== "Aijou") return message.channel.send("Nur Aijou kann das Quiz starten.");

	let id = Math.floor((Math.random() * list.animes.length));
	let url = `https://wall.alphacoders.com/api2.0/get.php?auth=ab87255012c1087a8d5f2b7a554ad9da&method=sub_category&id=${list.animes[id].id}`;
	let {body} = await superagent.get(url);
	let wallpaper_id = -1;

	let currentAnimeFile = './anime-wallpaper/current_anime.json';
	fs.writeFile(currentAnimeFile, JSON.stringify(list.animes[id]), (err) => {
		if(err) console.log(err);
	});

	let embed = new Discord.RichEmbed()
		.setTitle("Medigiri-Quiz")
		.setColor("#ffcf47")
		.setDescription("Es ist wieder Zeit für ein Quiz.\nWer es errät, bekommt ein unsichtbares Einhorn.\nAntwort an Medigiri mit '!antwort TITEL'\n\nDIES IST NOCH EINE BETA-VERSION. Fehler können passieren.");

	message.channel.send(embed);
	showImage(message);
	setTimeout(showImage, 300000, message); // alle 5 Minuten

	function showImage(message) {

		if(body.wallpapers.length === wallpaper_id) {
			message.channel.send(`Die Lösung lautet: ${list.animes[id].name} ... Na? Wer hat es gewusst? :)`);
			return;
		}

		wallpaper_id++;
		console.log(body.wallpapers[wallpaper_id].url_thumb);

		let fileExtention = body.wallpapers[wallpaper_id].url_thumb.substr(body.wallpapers[wallpaper_id].url_thumb.lastIndexOf(".")+1);
		let imageFile = `${list.animes[id].id}-${wallpaper_id}.${fileExtention}`;
		let file = fs.createWriteStream(`../happysoft/site/temp/anime-quiz/${imageFile}`);
		let imageUrl = `https://www.happy-soft.ch/temp/anime-quiz/${imageFile}`;

		var request = https.get(body.wallpapers[wallpaper_id].url_thumb, function(response) {
			response.pipe(file);
			if(wallpaper_id===0) {
				response.on("end", () => setTimeout(postImageBox, 2000, imageUrl, message));
			} else {
			response.on("end", () => setTimeout(postImageBox, 300000, imageUrl, message));
			}
		});
	}

	function postImageBox(imageUrl, message) {
		let embed = new Discord.RichEmbed()
			.setTitle(`Wie heisst dieser Anime?`)
			.setColor("#ffcf47")
			.setImage(imageUrl);
		message.channel.send(embed);
		setTimeout(showImage, 5000, message);
	}
};

module.exports.help = {
	name: "anime-quiz"
};