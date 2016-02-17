var platform_1 = require('platform');
var observableModule = require("data/observable");
var vmModule = require('./main-view-model');
var _ = require('lodash');
var nsCanvasInterfaceModule = require('nativescript-canvas-interface');
var oNSCanvasInterface;
var imageView;
var page;
/**
 * Function to be executed on Page Load.
 */
function pageLoaded(args) {
    page = args.object;
    var webView = page.getViewById('webView');
    imageView = page.getViewById('img');
    initCanvasInterface(webView);
    setBindingContext();
}
exports.pageLoaded = pageLoaded;
/**
 * Initializes canvas interface plugin and sets image to canvas, once webview is loaded.
 */
function initCanvasInterface(webView) {
    oNSCanvasInterface = new nsCanvasInterfaceModule.NativescriptCanvasInterface(webView, 'canvas');
    webView.on('loadFinished', function (args) {
        if (!args.error) {
            var width = platform_1.screen.mainScreen.widthDIPs;
            var aspectRatio = imageView.imageSource.width / imageView.imageSource.height;
            var height = width / aspectRatio;
            oNSCanvasInterface.setImage('setCanvasImage', imageView.imageSource, [{ width: width, height: height }]);
        }
    });
}
/**
 * Sets Page binding context for two way data binding.
 */
function setBindingContext() {
    var context = new observableModule.Observable();
    context.set('brightness', 0);
    // Adjusting image brightness, once the brightness slider position is changed.
    context.on('propertyChange', _.debounce(function (data) {
        var brightnessValue = data.object.get('brightness');
        setBrightness(brightnessValue);
    }, 100));
    page.bindingContext = context;
}
/**
 * Performs image manipulation on canvas in webview, and renders the returned image in Image element.
 */
function performCanvasMainpulation(fnName, args) {
    imageView.animate({
        opacity: 0.5,
        duration: 150
    });
    oNSCanvasInterface.createImage(fnName, args).then(function (result) {
        imageView.imageSource = result.image;
        imageView.animate({
            opacity: 1,
            duration: 150
        });
    }, function (error) {
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
function resetBrightness() {
    page.bindingContext.set('brightness', 0);
}
/**
 * Applies preset selected by user to the image.
 */
function setPreset(args) {
    var presetId = args.object.id;
    resetBrightness();
    performCanvasMainpulation('setPreset', [presetId]);
}
exports.setPreset = setPreset;
/**
 * Resets image to the its initial state.
 */
function resetImage() {
    resetBrightness();
    performCanvasMainpulation('resetImage');
}
exports.resetImage = resetImage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbInBhZ2VMb2FkZWQiLCJpbml0Q2FudmFzSW50ZXJmYWNlIiwic2V0QmluZGluZ0NvbnRleHQiLCJwZXJmb3JtQ2FudmFzTWFpbnB1bGF0aW9uIiwic2V0QnJpZ2h0bmVzcyIsInJlc2V0QnJpZ2h0bmVzcyIsInNldFByZXNldCIsInJlc2V0SW1hZ2UiXSwibWFwcGluZ3MiOiJBQUNBLHlCQUFxQixVQUFVLENBQUMsQ0FBQTtBQUNoQyxJQUFPLGdCQUFnQixXQUFXLGlCQUFpQixDQUFDLENBQUM7QUFFckQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDNUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksdUJBQXVCLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDdkUsSUFBSSxrQkFBa0IsQ0FBQztBQUN2QixJQUFJLFNBQWdCLENBQUM7QUFDckIsSUFBSSxJQUFJLENBQUM7QUFFVDs7R0FFRztBQUNILG9CQUEyQixJQUFJO0lBQzNCQSxJQUFJQSxHQUFTQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUN6QkEsSUFBSUEsT0FBT0EsR0FBWUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDbkRBLFNBQVNBLEdBQVVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzNDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQzdCQSxpQkFBaUJBLEVBQUVBLENBQUNBO0FBQ3hCQSxDQUFDQTtBQU5lLGtCQUFVLGFBTXpCLENBQUE7QUFFRDs7R0FFRztBQUNILDZCQUE2QixPQUFnQjtJQUN6Q0Msa0JBQWtCQSxHQUFHQSxJQUFJQSx1QkFBdUJBLENBQUNBLDJCQUEyQkEsQ0FB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