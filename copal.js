"use strict";

var app = require( "app" );
var CopalCore = require( "copal-core" );

app.on( "ready", function() {
  CopalCore.run().then( function() {
    console.log( "CoPal initialized" );
  } );
});
