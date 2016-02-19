(function() {
    var currentPreset;
	   
    /**
     * Sets image with specified dimension sent from native app, to canva for doing image manipulation on it.
     */    
    function setCanvasImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement, config: any) {
        canvas.width = config.width;
        canvas.height = config.height;
        ctx.drawImage(image, 0, 0, config.width, config.height);
    }
	   
    /**
     * Sets the requested presetMode to the canvas using Caman library and returns promise.
     */    
    function setPreset(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, presetMode: string) {
        currentPreset = presetMode;
        return new Promise(function(resolve) {
            Caman(canvas, function() {
                this.revert(false);
                this[presetMode]();
                this.render(function() {
                    resolve();
                });
            });
        });
    }
    
    /**
     * Resets the canvas to its original state by removing all the image manipulations.
     */
    function resetImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        currentPreset = null;
        return new Promise(function(resolve) {
            Caman(canvas, function() {
                this.revert(false);
                this.render(function() {
                    resolve();
                });
            });
        });
    }
    
    /**
     * Adjusts brightness of the canvas using Caman library and returns a promise.
     */
    function setBrightness(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, value: number){
        return new Promise(function(resolve) {
            Caman(canvas, function() {
                this.revert(false);
                currentPreset && this[currentPreset]();
                this.brightness(value);
                this.render(function() {
                    resolve();
                });
            });
        });
    }
    
    /**
     * Registers handlers to handle all the requests raised by native app.
     */
    function registerNSCanvasReqHandlers(oCanvasInterface) {
        oCanvasInterface.canvasReqHandlers = {
            setCanvasImage: setCanvasImage,
            setPreset: setPreset,
            resetImage: resetImage,
            setBrightness: setBrightness
        };
    }
    
    /**
     * Initializes canvas inteface for communication between canvas and native app.
     */
    function init() {
        var canvasEle = <HTMLCanvasElement>document.getElementById('canvasEle');
        if(window.NSCanvasInterface){
            var oCanvasInterface = new window.NSCanvasInterface(canvasEle);
            registerNSCanvasReqHandlers(oCanvasInterface);    
        }
    }
	   
    /**
     *  Fun starts from here.  
     */    
    init();
})();