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

const { GraphQLClient } = require("graphql-request");

const client = new GraphQLClient("https://graphql.anilist.co", {
	redirect: "follow"
});

const fetch = (query, variables) =>
	client
		.request(query, variables)
		.then(data => data)
		.catch(error => ({
			error: error.response.errors[0] || "Unknown Error"
		}));

module.exports = fetch;