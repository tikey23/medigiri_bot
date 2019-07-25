<?php
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


$json = file_get_contents('anime_categories_.json');

$data = json_decode($json);
$new_data = clone $data;
unset($new_data->animes);

foreach($data->animes AS $key => $anime) {
	if($anime->count > 6) {
		$new_data->animes[] = $anime;
	}
}

$new_json = json_encode($new_data);
file_put_contents("anime_categories.json", $new_json);