let fs = require('fs');

function getPlatformFromPrepareHookArgs(hookArgs) {
    const platform = (hookArgs && (hookArgs.platform || (hookArgs.prepareData && hookArgs.prepareData.platform)) || '').toLowerCase();
    return platform;
}

function getProjectData($injector, hookArgs) {
    if (hookArgs && hookArgs.projectData) {
        // CLI 5.4.x or older
        return hookArgs.projectData;
    }

    // CLI 6.0.0 and later
    const projectDir = hookArgs && hookArgs.prepareData && hookArgs.prepareData.projectDir;
    const $projectDataService = $injector.resolve('projectDataService')
    const projectData = $projectDataService.getProjectData(projectDir);
    return projectData;
}

module.exports = function ($injector, logger, hookArgs) {
    let platform = getPlatformFromPrepareHookArgs(hookArgs);

    if (platform === 'ios') {
        const projectData = getProjectData($injector, hookArgs);
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
};