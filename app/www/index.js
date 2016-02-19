(function () {
    var currentPreset;
    /**
     * Sets image with specified dimension sent from native app, to canva for doing image manipulation on it.
     */
    function setCanvasImage(canvas, ctx, image, config) {
        canvas.width = config.width;
        canvas.height = config.height;
        ctx.drawImage(image, 0, 0, config.width, config.height);
    }
    /**
     * Sets the requested presetMode to the canvas using Caman library and returns promise.
     */
    function setPreset(canvas, ctx, presetMode) {
        currentPreset = presetMode;
        return new Promise(function (resolve) {
            Caman(canvas, function () {
                this.revert(false);
                this[presetMode]();
                this.render(function () {
                    resolve();
                });
            });
        });
    }
    /**
     * Resets the canvas to its original state by removing all the image manipulations.
     */
    function resetImage(canvas, ctx) {
        currentPreset = null;
        return new Promise(function (resolve) {
            Caman(canvas, function () {
                this.revert(false);
                this.render(function () {
                    resolve();
                });
            });
        });
    }
    /**
     * Adjusts brightness of the canvas using Caman library and returns a promise.
     */
    function setBrightness(canvas, ctx, value) {
        return new Promise(function (resolve) {
            Caman(canvas, function () {
                this.revert(false);
                currentPreset && this[currentPreset]();
                this.brightness(value);
                this.render(function () {
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
        var canvasEle = document.getElementById('canvasEle');
        if (window.NSCanvasInterface) {
            var oCanvasInterface = new window.NSCanvasInterface(canvasEle);
            registerNSCanvasReqHandlers(oCanvasInterface);
        }
    }
    /**
     *  Fun starts from here.
     */
    init();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6WyJzZXRDYW52YXNJbWFnZSIsInNldFByZXNldCIsInJlc2V0SW1hZ2UiLCJzZXRCcmlnaHRuZXNzIiwicmVnaXN0ZXJOU0NhbnZhc1JlcUhhbmRsZXJzIiwiaW5pdCJdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQztJQUNHLElBQUksYUFBYSxDQUFDO0lBRWxCOztPQUVHO0lBQ0gsd0JBQXdCLE1BQXlCLEVBQUUsR0FBNkIsRUFBRSxLQUF1QixFQUFFLE1BQVc7UUFDbEhBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQzVCQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUM5QkEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDNURBLENBQUNBO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUIsTUFBeUIsRUFBRSxHQUE2QixFQUFFLFVBQWtCO1FBQzNGQyxhQUFhQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMzQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBU0EsT0FBT0E7WUFDL0IsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDQSxDQUFDQTtJQUNQQSxDQUFDQTtJQUVEOztPQUVHO0lBQ0gsb0JBQW9CLE1BQXlCLEVBQUUsR0FBNkI7UUFDeEVDLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3JCQSxNQUFNQSxDQUFDQSxJQUFJQSxPQUFPQSxDQUFDQSxVQUFTQSxPQUFPQTtZQUMvQixLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFFRDs7T0FFRztJQUNILHVCQUF1QixNQUF5QixFQUFFLEdBQTZCLEVBQUUsS0FBYTtRQUMxRkMsTUFBTUEsQ0FBQ0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBU0EsT0FBT0E7WUFDL0IsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFFRDs7T0FFRztJQUNILHFDQUFxQyxnQkFBZ0I7UUFDakRDLGdCQUFnQkEsQ0FBQ0EsaUJBQWlCQSxHQUFHQTtZQUNqQ0EsY0FBY0EsRUFBRUEsY0FBY0E7WUFDOUJBLFNBQVNBLEVBQUVBLFNBQVNBO1lBQ3BCQSxVQUFVQSxFQUFFQSxVQUFVQTtZQUN0QkEsYUFBYUEsRUFBRUEsYUFBYUE7U0FDL0JBLENBQUNBO0lBQ05BLENBQUNBO0lBRUQ7O09BRUc7SUFDSDtRQUNJQyxJQUFJQSxTQUFTQSxHQUFzQkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDeEVBLEVBQUVBLENBQUFBLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7WUFDekJBLElBQUlBLGdCQUFnQkEsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUMvREEsMkJBQTJCQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUVEOztPQUVHO0lBQ0gsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsRUFBRSxDQUFDIn0=