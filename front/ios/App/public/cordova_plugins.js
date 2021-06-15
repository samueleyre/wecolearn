
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "ionic-plugin-deeplinks.deeplink",
          "file": "plugins/ionic-plugin-deeplinks/www/deeplink.js",
          "pluginId": "ionic-plugin-deeplinks",
        "clobbers": [
          "IonicDeeplink"
        ],
        "runs": true
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "ionic-plugin-deeplinks": "1.0.19"
    };
    // BOTTOM OF METADATA
    });
    