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

const api = require("./api.js");
const query_search = require("./query-search.js");
const query_id = require("./query-id.js");
const discordMessage = require("../discord-helper/discordMessage.js");

const capitalize = str =>
	str
		.split("_")
		.map(
			word =>
				word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
		)
		.join(" ");

const search = async (searchArg, type, searchType) => {

	let response;

	if(searchType === 'id') {
		response = await api(query_id, {
			id: searchArg,
			type
		});
	} else {
		response = await api(query_search, {
			search: searchArg[0],
			type
		});
	}

	if (response.error) {
		return response;
	}

	const data = response.Media;
	const { averageScore: score, status } = data;

	const scoreString = score != null ? `Score: ${score}%` : "";
	const statusString = status != null ? `Status: ${capitalize(status)}` : "";

	let footer = "";
	// Use the en quad space after score to not get stripped by Discord
	if (score) footer += scoreString + "??";
	if (status) footer += statusString;

	return discordMessage({
		name: data.title.romaji,
		url: data.siteUrl,
		imageUrl: data.coverImage.large,
		description: data.description,
		footer: footer
	});
};

module.exports = {
	search
};