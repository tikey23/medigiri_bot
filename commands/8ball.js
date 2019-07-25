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

module.exports.run = async (bot, message, args) => {

	if(!args[2]) return message.reply("Du musst mich schon etwas fragen!");
	let replies = ["Ja", "Nein", "Das weiss ich nicht", "Frag später nochmal", "Mir egal.", "Ich glaube das willst du nicht wissen", "na klar doch.",
	"Nein, Nein, Nein!!!", "Ja. ich bin mir 100% sicher", "Nee, besser nicht.", "Ich bin mir da ziemlich sicher... nein, warte... äh doch nicht.",
	"Auf jeden Fall. Was soll schon schief gehen ;)", "Einen Augenbllick. Ich frage meinen Computer. Computer sagt 'NEIN'",
	"Hast du heute einen Clown gefrühstückt?", "Interessant. Erzähl mir mehr", "So will es die Prophezeiung",
		"Das kann ich dir auch nicht sagen", "Yes", "No", "はい", "いいえ", "Oui",
		"kyllä", "Ay", "Boing Boing Boing", "dog", "Warum fragst du mich das?", "Ja, nein, vielleicht... was fragst du mich?"];


	let result = Math.floor((Math.random() * replies.length));
	let question_words = ['wird', "ist", "darf", "siehst", "sind", "kann", "können", "kannst",
		"willst", "wollen", "hast", "habe", "haben", "funktioniert", "soll", "bin", "sollen", "sollst", "darf", "kommst", "bist", "magst"];
	if(question_words.indexOf(args[0].toLowerCase()) === -1) return message.reply("Ich verstehe dich nicht richtig.");


	if (replies[result] === "dog") {
		let {body} = await superagent.get('https://random.dog/woof.json');
		let embed = new Discord.RichEmbed()
			.setTitle("Wuff :dog:")
			.setColor("#ffcf47")
			.setImage(body.url);

		message.channel.send("Keine Ahnung. aber hier hast du ein witziges Bild.");
		message.channel.send(embed);
	} else {
		message.channel.send(replies[result]);
	}
};

module.exports.help = {
	name: "8ball"
};