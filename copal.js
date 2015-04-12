"use strict";

var path = require( "path" );
var app = require( "app" );
var CopalCore = require( "copal-core" );

app.on( "ready", function() {

	var appDataDir = process.env.APPDATA || ( process.platform === "darwin" ? process.env.HOME + "Library/Preference" : "/var/local" );
	var defaultProfileDir = path.join( appDataDir, "copal" );

  CopalCore.run( defaultProfileDir ).then( function() {
    console.log( "CoPal initialized" );
  } );
});
