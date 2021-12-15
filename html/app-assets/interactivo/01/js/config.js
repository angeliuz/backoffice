$(document).ready(function () {
	var cfg = {
		sizeMode: 1,
		audios: [],
		autoEvaluate: true,
		platform: "Infantil",
		enunciado: cadenas.enun,
		backgroundImage: { id:"fondo", x: -4, y: 84},
		buttonRepeat: { x:849, y:493, width:100, textId:cadenas.empty },
		audioEnunciado: audios.sinAudio,
		audioOK: audios.audio_ok,
		audioKO: audios.audio_ko,
		audioFinal: audios.audio_FXAPLAUSOS,
		successes: 7,
		groups: [ 
			{ id: "arbol", successes: 1, },
			{ id: "campanario", successes: 1, },
			{ id: "nube", successes: 1, },
			{ id: "pelota", successes: 1, },
			{ id: "reloj", successes: 1, },
			{ id: "pies", successes: 1, },
			{ id: "ventana", successes: 1, },
			{ id: "perro", successes: 1, },
		],
		imageObjects: [ 
			{ id: "noperro", x: 836, y: 329, imageId: "noperro", valid: true, groupId: "perro", imagen_dragdrop: "ok_2", imagen_dragdropX: 823, imagen_dragdropY: 313, },
			{ id: "nonube", x: 593, y: 212, imageId: "nonube", valid: true, groupId: "pelota", imagen_dragdrop: "ok_2", imagen_dragdropX: 592, imagen_dragdropY: 197, },
			{ id: "nopies", x: 623, y: 382, imageId: "nopies", valid: true, groupId: "pies", imagen_dragdrop: "ok_2", imagen_dragdropX: 618, imagen_dragdropY: 371, },
			{ id: "nopelota", x: 505, y: 410, imageId: "nopelota", valid: true, groupId: "nube", imagen_dragdrop: "ok_2", imagen_dragdropX: 500, imagen_dragdropY: 396, },
			{ id: "noarbol", x: 579, y: 293, imageId: "noarbol", valid: true, groupId: "arbol", imagen_dragdrop: "ok_2", imagen_dragdropX: 577, imagen_dragdropY: 283, },
			{ id: "noreloj", x: 809, y: 206, imageId: "noreloj", valid: true, groupId: "reloj", imagen_dragdrop: "ok_2", imagen_dragdropX: 809, imagen_dragdropY: 198, },
			{ id: "nocampanario", x: 520, y: 173, imageId: "nocampanario", valid: true, groupId: "campanario", imagen_dragdrop: "ok_2", imagen_dragdropX: 507, imagen_dragdropY: 158, },
		],
		animation: {confettiColors:[["#FF0054","#E500FF"],["#00FF00","#0000FF"],["#00FFFF","#FF0000"],["#FFFF00","#B06C00"]],backgroundColor:"#000000",backgroundOpacity:0.7,confettiRibbonCount:7,confettiPaperCount:100,pauseToEnd:1500,soundId:audios.audio_FXAPLAUSOS},
	};
	var animation = new sm.ConfettiAnimation(cfg);
	var engine = new sm.SelectEngine("html5Canvas", cfg, animation);
	if (!browserDetect.isIOS && !browserDetect.isAndroid && !browserDetect.isChrome) {
	    engine.run();
	} else {
	    var startLayer = document.getElementById("startLayer");
	    startLayer.style.backgroundColor = styles.headerSM.backgroundColor;
	    startLayer.style.backgroundImage = "url(" + styles.icons.Adelante.src.replace(/_/g, "/") + ")";
	    var gameLayer = document.getElementById("gameLayer");
	    gameLayer.style.display = "none";
	    startLayer.style.display = "block";
	    startLayer.engine = engine;
	    startLayer.onclick = function () {
	        var startLayer = document.getElementById("startLayer");
	        var gameLayer = document.getElementById("gameLayer");
	        gameLayer.style.display = "block";
	        startLayer.style.display = "none";
	        this.engine.playAudio("no-audio");
	        this.engine.run();
	    }
	    var resizeStartLayer = function() {
	        var insideIframe = window.top !== window.self;
	        if (!insideIframe) {
	            windowWidth = window.innerWidth;
	            windowHeight = window.innerHeight;
	        }
	        var startLayer = document.getElementById("startLayer");
	        //var html5Canvas = document.getElementById("html5Canvas");
	        //var originalWidth = html5Canvas.width;
	        //var originalHeight = html5Canvas.height;
	        var vw = windowWidth;
	        var vh = windowHeight;
	        if (!insideIframe && browserDetect.isAndroid) {
	            vw = window.outerWidth;
	            vh = window.outerHeight;
	        }
	        switch (cfg.sizeMode) {
	            case 0: // Tamaño original.
	                startLayer.style.width = originalWidth + "px";
	                startLayer.style.height = originalHeight + "px";
	                break;
	            case 1: // FullScreen manteniendo proporciones. 
	                if (!insideIframe) {
	                    var factorW = vw / originalWidth;
	                    var factorH = vh / originalHeight;
	                    if (factorW <= factorH) {
	                        startLayer.style.width = vw + "px";
	                        startLayer.style.height = (originalHeight * vw / originalWidth) + "px";
	                    } else {
	                        startLayer.style.width = (originalWidth * vh / originalHeight) + "px";
	                        startLayer.style.height = vh + "px";
	                    }
	                } else {
	                    startLayer.style.width = "100%";
	                    var width = startLayer.offsetWidth;
	                    startLayer.style.height = (originalHeight * width / originalWidth) + "px";
	                }
	                break;
	            case 2: // FullScreen ajustando a pantalla. 
	                if (!insideIframe) {
	                    startLayer.style.width = vw + "px";
	                    startLayer.style.height = vh + "px";
	                } else {
	                    startLayer.style.width = "100%";
	                    startLayer.style.height = vh + "px";
	                }
	                break;
	        }
	        document.body.style.width = startLayer.style.width;
	    };
	    window.onresize = resizeStartLayer;
	    resizeStartLayer();
	}
});
