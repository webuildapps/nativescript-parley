let path = require('path');
let fs = require('fs');

module.exports = function() {
    let podFile = path.join(__dirname, "..", "..", "node_modules", "nativescript-plugin-firebase", "platforms", "ios", "Podfile");
    if (fs.existsSync(podFile)) {
        console.log('Delete nativeScript Firebase plugin Podfile.', podFile);

        fs.unlinkSync(podFile);
    }
};