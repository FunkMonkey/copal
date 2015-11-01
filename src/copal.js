require('source-map-support').install();

import path from "path";
import fs from "fs-extra";
import app from "app";
import cliArgs from "command-line-args";
import CopalCore from "copal-core";

const appDataDir = process.env.APPDATA || ( process.platform === "darwin" ? process.env.HOME + "Library/Preference" : "/var/local" );
const defaultProfileDir = path.join( appDataDir, "copal" );

const cli = cliArgs([
    { name: "profile-dir", type: String, alias: "p", description: "Set the profile directory", value: defaultProfileDir },
    { name: "help", type: Boolean, description: "Print usage instructions" },
    { name: "files", type: Array, defaultOption: true, description: "The input files" }
]);

app.on( "ready", () => {

  const startupArgs = cli.parse();

  // making profile-dir absolute
  startupArgs["profile-dir"] = path.resolve( startupArgs["profile-dir"] );

  console.log( startupArgs );

  // starts Copal
  function run ( ) {
    CopalCore.run( startupArgs ).then( () => {
      console.log( "CoPal initialized" );
    } );
  }

  // if there is no `settings.json`, we'll copy our starter kit configuration from
  // `first-run-profile`
  // - enter callback hell
  fs.exists( path.join( startupArgs["profile-dir"], "settings.json" ), fileExists => {
    if( fileExists ) {
      run();
    } else {
      fs.copy( path.join( __dirname, "..", "first-run-profile"), startupArgs["profile-dir"], (err) => {
        if( err )
          console.log( err );
        else {
          console.log( "Initialized starter kit configuration" );
          run();
        }
      } );
    }
  } );
});
