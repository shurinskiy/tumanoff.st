@echo off
mkdir .\src\js\
mkdir .\src\scss\
mkdir .\src\scss\lib
mkdir .\src\fonts\
mkdir .\src\images\ 
mkdir .\src\blocks\
mkdir .\src\templates\ 
rem ====================================================================
cd .\src\scss\
echo ^@import "lib/additional.scss"; <NUL>>style.scss
echo ^@import "lib/smart-grid.scss"; <NUL>>style.scss
echo ^@include reset(); <NUL>>style.scss
rem ====================================================================
cd .\lib\
echo $basesize: 16; <NUL>>additional.scss
echo $image_path: "images/"; <NUL>>additional.scss
echo.  	<NUL>>additional.scss
echo /*подключить шрифт*/ <NUL>>additional.scss
echo ^@mixin font-face($file, $family, $folder: false) { <NUL>>additional.scss
		^$path: "./fonts/#{$file}" !default; <NUL>>additional.scss
		^@if $folder { $path: "#{$folder}"; } <NUL>>additional.scss
echo 	^@font-face { <NUL>>additional.scss
echo 		font-family: $family; <NUL>>additional.scss
echo 		src: url("#{$folder}#{$file}.eot?#iefix") format('embedded-opentype'), <NUL>>additional.scss
echo 			url("#{$folder}#{$file}.woff") format('woff'), <NUL>>additional.scss
echo 			url("#{$folder}#{$file}.ttf")  format('truetype'), <NUL>>additional.scss
echo 			url("#{$folder}#{$file}.svg##{$file}") format('svg'); <NUL>>additional.scss
echo 		font-weight: normal; <NUL>>additional.scss
echo 		font-style: normal; <NUL>>additional.scss
echo 	} <NUL>>additional.scss
echo } <NUL>>additional.scss
echo.  	<NUL>>additional.scss
rem ====================================================================
echo /*вставить символ псевдографики*/ <NUL>>additional.scss
echo ^@mixin inssymbol( $font,$symbol: '\0000',$pseudo: "after") { <NUL>>additional.scss
echo 	^&:#{$pseudo} { <NUL>>additional.scss
echo 		content: "#{$symbol}"; <NUL>>additional.scss
echo 		font-family: $font; <NUL>>additional.scss
echo 		vertical-align: middle; <NUL>>additional.scss
echo 		^@content; <NUL>>additional.scss
echo 	} <NUL>>additional.scss
echo } <NUL>>additional.scss
echo.  	<NUL>>additional.scss
rem ====================================================================
echo /*заполнить родительский блок*/ <NUL>>additional.scss
echo ^@mixin fill($spacing: 0, $index: 0) { <NUL>>additional.scss
echo 	position: absolute; <NUL>>additional.scss
echo 	display: block; <NUL>>additional.scss
echo 	box-sizing: border-box; <NUL>>additional.scss
echo 	top: $spacing; bottom: $spacing; <NUL>>additional.scss
echo 	left: $spacing; right: $spacing; <NUL>>additional.scss
echo 	z-index: $index; <NUL>>additional.scss
echo } <NUL>>additional.scss
echo.  	<NUL>>additional.scss
rem ====================================================================
echo /*сохранять пропрорции*/ <NUL>>additional.scss
echo ^@mixin aspect-ratio($w, $h) { <NUL>>additional.scss
echo 	display: block; <NUL>>additional.scss
echo 	position: relative; <NUL>>additional.scss
echo 	$ratio: ($h / $w); <NUL>>additional.scss
echo 	^&:before { <NUL>>additional.scss
echo 		content: ''; <NUL>>additional.scss
echo 		display: block; <NUL>>additional.scss
echo 		padding-top: (100%% * $ratio); <NUL>>additional.scss
echo 	} <NUL>>additional.scss
echo 	^> * { ^@include fill(); } <NUL>>additional.scss
echo } <NUL>>additional.scss
echo.  	<NUL>>additional.scss
rem ====================================================================
echo ^@mixin outline() { <NUL>>additional.scss
echo 	outline: 1px dotted grey; <NUL>>additional.scss
echo } <NUL>>additional.scss
rem ====================================================================
cd..\..\..\
cd .\src\js\
echo import jQuery from "jquery"; <NUL>>index.js
echo if (typeof jQuery !== "undefined") { <NUL>>index.js
echo 	(function($, undefined) { <NUL>>index.js
echo 		$(function() { <NUL>>index.js
echo. 			<NUL>>index.js
echo 		}); <NUL>>index.js
echo 	})(jQuery); <NUL>>index.js
echo } <NUL>>index.js
rem ====================================================================
cd..\..\
cd .\src\templates\ 
echo ^<!DOCTYPE html^> <NUL>>header.html
echo ^<html lang="ru"^> <NUL>>header.html
echo ^<head^> <NUL>>header.html
echo 	^<meta charset="UTF-8"^> <NUL>>header.html
echo 	^<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"^> <NUL>>header.html
echo 	^<link rel="shortcut icon" href="images/favicon.ico"^> <NUL>>header.html
echo 	^<link rel="stylesheet" href="css/style.css"^> <NUL>>header.html
echo 	^<title^>^<%%=title%%^>^</title^> <NUL>>header.html
echo ^</head^> <NUL>>header.html
echo ^<body^> <NUL>>header.html
echo ^<header^> <NUL>>header.html
echo.  	<NUL>>header.html
echo ^</header^> <NUL>>header.html
rem ====================================================================
echo ^<footer^> <NUL>>footer.html
echo.  <NUL>>footer.html
echo ^</footer^> <NUL>>footer.html
echo ^<script src="js/common.js"^>^</script^> <NUL>>footer.html
echo ^</body^> <NUL>>footer.html
echo ^</html^> <NUL>>footer.html
rem ====================================================================
cd..\
echo ^<%% var data = { title: "Заголовок | Проект", }; %%^> <NUL>>index.html
echo ^<%%= _.template(require("./templates/header.html"))(data) %%^> <NUL>>index.html
echo ^<div class="container"^> <NUL>>index.html
echo. 	<NUL>>index.html
echo ^</div^> <NUL>>index.html
echo ^<%%= _.template(require("./templates/footer.html"))(data) %%^> <NUL>>index.html




















