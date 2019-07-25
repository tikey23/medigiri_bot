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

const toMarkdown = require("to-markdown");
const anilistLogo = "https://anilist.co/img/logo_al.png";

const pipe = (op1, op2) => arg => op2(op1(arg));

const removeSpoilers = str => str.replace(/<span[^>]*>.*<\/span>/g, "");

const shorten = str => {
	const markdown = toMarkdown(str);
	if (markdown.length > 400) {
		return markdown.substring(0, 400) + "...";
	} else {
		return markdown;
	}
};

const discordMessage = ({
	name,
	url,
	imageUrl,
	description,
	footer,
	title
} = {}) => {
	return {
		title: title,
		author: {
			name: name,
			url: url,
			icon_url: anilistLogo
		},
		thumbnail: {
			url: imageUrl
		},
		description: pipe(removeSpoilers, shorten)(description),
		footer: {
			text: footer
		}
	};
};

module.exports = discordMessage;