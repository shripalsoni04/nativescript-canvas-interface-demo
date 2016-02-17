import {Page, WebView, Image, GridLayout, ImageFormat} from 'ui';
import {screen} from 'platform';
import observableModule = require("data/observable");
import {path, knownFolders} from 'file-system';
var vmModule = require('./main-view-model');
var _ = require('lodash');
var nsCanvasInterfaceModule = require('nativescript-canvas-interface');
var oNSCanvasInterface;
var imageView: Image;
var page;

/**
 * Function to be executed on Page Load. 
 */
export function pageLoaded(args) {
    page = <Page>args.object;
    var webView = <WebView>page.getViewById('webView');
    imageView = <Image>page.getViewById('img');
    initCanvasInterface(webView);
    setBindingContext();
}

/**
 * Initializes canvas interface plugin and sets image to canvas, once webview is loaded.
 */
function initCanvasInterface(webView: WebView) {
    oNSCanvasInterface = new nsCanvasInterfaceModule.NativescriptCanvasInterface(webView, 'canvas');
    webView.on('loadFinished', (args) => {
        if (!args.error) {
            var width = screen.mainScreen.widthDIPs;
            var aspectRatio = imageView.imageSource.width / imageView.imageSource.height;
            var height = width / aspectRatio;
            oNSCanvasInterface.setImage('setCanvasImage', imageView.imageSource, [{ width: width, height: height }]);
        }
    })
}

/**
 * Sets Page binding context for two way data binding.
 */
function setBindingContext() {
    var context = new observableModule.Observable();
    context.set('brightness', 0); 
    
    // Adjusting image brightness, once the brightness slider position is changed.
    context.on('propertyChange', _.debounce(function(data){
        var brightnessValue = data.object.get('brightness');
        setBrightness(brightnessValue);
    }, 100));
    page.bindingContext = context;
}

/**
 * Performs image manipulation on canvas in webview, and renders the returned image in Image element.
 */
function performCanvasMainpulation(fnName: string, args?: any[]){
    imageView.animate({
        opacity: 0.5,
        duration: 150
    });
    oNSCanvasInterface.createImage(fnName, args).then(function(result) {
        imageView.imageSource = result.image;
        imageView.animate({
            opacity: 1,
            duration: 150
        });
    }, function(error){
        console.log('error', error);
    });
}

/**
 * Adjusts brighness of the image.
 */
function setBrightness(value) {
    performCanvasMainpulation('setBrightness', [value]);
}

/**
 * Resets brightness on reset image operation.
 */
function resetBrightness(){
    page.bindingContext.set('brightness', 0);
}

/**
 * Applies preset selected by user to the image. 
 */
export function setPreset(args) {
    var presetId = args.object.id;
    resetBrightness();
    performCanvasMainpulation('setPreset', [presetId]);
}

/**
 * Resets image to the its initial state.
 */
export function resetImage() {
    resetBrightness();
    performCanvasMainpulation('resetImage');
}

// TODO: Add provision to download the edited image
// export function downloadImage(){
//     var gallaryPath;
//     if(android){
//         gallaryPath = path.join(android.os.Environment.getExternalStorageDirectory()+'', ''+android.os.Environment.DIRECTORY_PICTURES, 'demo.png');
//         console.log('gallary path is1 ', gallaryPath);
//         var folder = knownFolders.documents();
//         var fullPath = path.join(folder.path, "Test.png");
//         try{
//             imageView.imageSource.saveToFile(fullPath, ImageFormat.png);    
//         }catch(e){
//             console.log('error is === ', e);
//         }   
//     }
// }