let fs = require('fs');

module.exports = function (logger, platformsData, projectData, hookArgs) {
    let platform = hookArgs.platform.toLowerCase();

    if (platform === 'ios') {
        let sourceMapLocation = '/node_modules/nativescript-parley/platforms/ios/module.modulemap';
        let targetMapLocation = '/platforms/ios/Pods/IrisChatLibrary/IrisChatLib/IrisChatLib.framework/Modules/module.modulemap';
        let modulesMapLocation = '/platforms/ios/Pods/IrisChatLibrary/IrisChatLib/IrisChatLib.framework/Modules';
        let targetMapFolder = projectData.projectDir + modulesMapLocation;
        if (!fs.existsSync(targetMapFolder)) {
            fs.mkdirSync(targetMapFolder);
        }

        return fs.copyFileSync(projectData.projectDir + sourceMapLocation, projectData.projectDir + targetMapLocation);
    }

    logger.info('Only iOS');
    return Promise.resolve();
};