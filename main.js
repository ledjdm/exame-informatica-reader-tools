/*!
 * Exame Informática Reader Tools
 * http://ledjdm.github.com/eirt/
 *
 * Copyright 2015 Pedro F. Santos, pedrofsantos.com, me@pedrofsantos.com
 * Released under the MIT license
 * http://en.wikipedia.org/wiki/MIT_License
 *
 * Date: 2015-02-02T22:49Z
 */
var EIReaderTools =
{
	options:
	{
		fullscreen:
		{
			icon:
			{
				off: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgEApAAAAAZ0Uk5TAA+fz9/vpTOW9gAAAJNJREFUKM/NkkEKwyAUBSeeQOoFDAX3duERcoQcQJN3/yN08RVLUui2fyE4Ph/IyPLiY56eoDj3TpmiOkFSI2lEPE6qtgSA3A+TtBaA9pAq4KRTANr77SQZUO93E1j9sg9wegDCTGQAygTN80fz+3FsAxx8T1w7nHQY2CySpJgAqpMq3QVANA3mwo/6eld5k339Dm89PDdxiEGVaQAAAABJRU5ErkJggg==",
				on: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI1JREFUeNrsV0EOwCAI6w/8/6lP8gk8ZTuPLUoirltCEy8mpY0iIAAcg0WsgxONreIRE4+bhnzYr05AkgO2wQQHV3wxwAmBieJe6xY8w0Q0BlcDZHOngXqA1zPziE68BTjNmWDGM4qKexNEoVAoJPVzWSGSlmJpM3q1HcsHEvlI9omhtL5m9TWT5cApwAD/IigEZttSgAAAAABJRU5ErkJggg=="
			}
		},
		savedFunctions:
		{
			"ResizeViewer":
			{
				"orig": ResizeViewer,
				"mod": function()
				{
					var b = Math.max(400, document.documentElement.clientHeight), a = Math.round(pw * b / ph);
					ResizeMenu();
					if (zoom) {
						a = Math.max(1000, Math.min(1502, document.documentElement.clientWidth));
						$("#bvdPage div.pages").width(a).height(b).children(".panviewport").width(a).height(b)
					}
					if ((zoom || crop != null)) {
						return;
					}
					RszImgs(a, b)
				},
			},
		},
	},
	initPagination: function()
	{
		var el = $("<div>", {id: "eirt-pag-cont"})
	    	.css(
	    	{
	    		"display": "inline-block",
				"color": "#000",
				"position": "relative",
				"padding": "0 10px",
				"border-left": "1px solid hsl(0, 0%, 70%)",
				"border-right": "1px solid hsl(0, 0%, 70%)",
	    	})
	    	.insertAfter($("#eirt-state"));

	    var goToPage = function(e)
	    {
	    	var $this = $(this);
		    var input = $this.siblings('#eirt-pag-input');
		    var inputVal = input.val();
		    var imgs = $("#bvdMenuImg img[onclick]");
		    input.val("");
		    var specialPages =
		    {
		    	"i": 2,
		    	"inicio": 0,
		    	"fim": imgs.length - 1
		    };
		    if (specialPages[inputVal] != null)
		    {
		        $(imgs[inputVal]).trigger("click");
		        return;
		    }
		    var num = parseInt(inputVal);
		    if (num == null || num === NaN)
		    	return;
		    var numLimited = Math.max(Math.min(num, imgs.length), 0);
		    $(imgs[numLimited]).trigger("click");
	    };

	    $("<label>").text("Página:").appendTo(el);
	    $("<input>",
	    	{
	    		id: "eirt-pag-input",
	    		type: "text",
	    	})
	    	.css(
	    	{
	    		"width": "40px",
	    		"height": "14px",
	    		"margin": "0 5px",
	    	}).appendTo(el);

	    $("<input>",
	    	{
		        id: "eirt-pag-acc",
		        type: "button",
		        value: "Ok"
		    })
		    .css(
	    	{
	    		"width": "30px",
	    		"height": "18px"
	    	}).click(goToPage)
	    	.appendTo(el);

	    $("body").keyup(function(e)
	    {
		    if (e.which == 80)
		        $("#eirt-pag-input").focus();
		});
	},
	initNavigation: function()
	{
		$("body").keyup(function(e)
		{
		    if (e.which === 39) $(".crn.topright").click();
		    else if (e.which === 37) $(".crn.topleft").click();
		});
	},
	initZoom: function()
	{
		var callback = function()
		{
			$("#ctl00_cph_viewer1_imgPage").data("scale", 1);
			var mathLimit = function(value, min, max)
			{
				return Math.max(Math.min(value, max), min);
			};

			$(document).off("mousewheel", ".panviewport")
				.on("mousewheel", ".panviewport", function(e, delta)
				{
					$(this).css("overflow", "hidden");
					var $this = $("#ctl00_cph_viewer1_imgPage");
					/*
					var imgW = $this.width();
					var imgH = $this.height();
					var mouseX = mathLimit(e.clientX - $this.offset().left, 0, imgW);
					var mouseY = mathLimit(e.clientY - $this.offset().top, 0, imgH);
					var pointX = Math.abs(mouseX * 100 / imgW);
					var pointY = Math.abs(mouseY * 100 / imgH);
					*/
					var scaleValue = $this.data("scale");

					var scale = mathLimit((delta / 10) + scaleValue, 0.1, 1);
					var transform = "scale("+scale+")".replace("@par", scale);
					//var transformOrigin = mathLimit(pointX, 0, 100)+"% "+mathLimit(pointY, 0, 100)+"%";
					
					$this.data("scale", scale)
						.css(
						{
							"transform": transform,
							//"transform-origin": transformOrigin,
						});
					e.preventDefault();
				});

			$("#eirt-state").css("color", "#32CD32");
		};

		this.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js", callback);
	},
	initFullscreen: function()
	{
		var toggleFullscreen = function(e)
		{
			var $this = $(this);
			var mode = !$this.data("mode");
			var bgcolor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgEApAAAAAZ0Uk5TAA+fz9/vpTOW9gAAAJNJREFUKM/NkkEKwyAUBSeeQOoFDAX3duERcoQcQJN3/yN08RVLUui2fyE4Ph/IyPLiY56eoDj3TpmiOkFSI2lEPE6qtgSA3A+TtBaA9pAq4KRTANr77SQZUO93E1j9sg9wegDCTGQAygTN80fz+3FsAxx8T1w7nHQY2CySpJgAqpMq3QVANA3mwo/6eld5k339Dm89PDdxiEGVaQAAAABJRU5ErkJggg==")';
			var fsLeft = "102px";
			var fsTop = "6px";
			var func = "orig";
			var holder = $("#zahirad192");
			$("#bvdPage").removeAttr("style");

			if (mode)
			{
				$("#bvdPage")
					.css(
					{
						"position": "absolute",
						"top": "0",
						"right": "0",
						"left": "0",
						"bottom": "0",
						"margin": "0",
						"z-index": "1000",
						"background-color": "#F5F5F5",
					});
				func = "mod"
				bgcolor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI1JREFUeNrsV0EOwCAI6w/8/6lP8gk8ZTuPLUoirltCEy8mpY0iIAAcg0WsgxONreIRE4+bhnzYr05AkgO2wQQHV3wxwAmBieJe6xY8w0Q0BlcDZHOngXqA1zPziE68BTjNmWDGM4qKexNEoVAoJPVzWSGSlmJpM3q1HcsHEvlI9omhtL5m9TWT5cApwAD/IigEZttSgAAAAABJRU5ErkJggg==")';
				holder = $("body");
				fsPosition = "absolute";
				fsTop = "0";
				fsLeft = "0";
			}

			$("#eirt-container")
				.css(
				{
					"left": fsLeft,
					"top": fsTop,
				})
				.insertBefore(holder);
			$this.css("background-image", bgcolor);
			$this.data("mode", mode);
			ResizeViewer = EIReaderTools.options.savedFunctions["ResizeViewer"][func];
			$(window).trigger("resize");
		};

		var $fs = $("<div>", {id: "eirt-fs"})
			.css(
			{
				"display": "inline-block",
				"width": "15px",
				"height": "15px",
				"background-image": 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgEApAAAAAZ0Uk5TAA+fz9/vpTOW9gAAAJNJREFUKM/NkkEKwyAUBSeeQOoFDAX3duERcoQcQJN3/yN08RVLUui2fyE4Ph/IyPLiY56eoDj3TpmiOkFSI2lEPE6qtgSA3A+TtBaA9pAq4KRTANr77SQZUO93E1j9sg9wegDCTGQAygTN80fz+3FsAxx8T1w7nHQY2CySpJgAqpMq3QVANA3mwo/6eld5k339Dm89PDdxiEGVaQAAAABJRU5ErkJggg==")',
				"margin-left": "10px",
				"position": "relative",
				"top": "3px",
				"background-size": "100%",
			})
			.data("mode", false)
			.click(toggleFullscreen)
			.insertAfter($("#eirt-pag-cont"));
	},
	init: function()
	{
		$("<div>", {id: "eirt-container"})
			.css(
			{
				"position": "absolute",
				"left": "102px",
				"top": "6px",
				"z-index": "1010",
				"background": "#fff",
				"padding": "5px",
				"border-right": "1px solid hsl(0, 0%, 70%)",
				"border-bottom": "1px solid hsl(0, 0%, 70%)",
			})
			.insertBefore($("#zahirad192"));

		$("<span>", {id: "eirt-state"})
			.text("EIReaderTools")
			.css(
			{
				"color": "#f00",
				"margin-right": "10px",
				"position": "relative",
			}).appendTo($("#eirt-container"));

		EIReaderTools.initPagination();
		EIReaderTools.initNavigation();
		EIReaderTools.initFullscreen();
		EIReaderTools.initZoom();
	},
	loadScript: function(url, callback)
	{
		var splitUrl = url.split("/");
		var lastIndex = splitUrl.length - 1;
		if ($('script[src^="'+splitUrl[lastIndex]+'"]').length > 0)
		{
			if (callback)
				callback();
			return;
		}
		var script=document.createElement("script");
		script.src=url;
		var head=document.getElementsByTagName("head")[0];
		var _callback = callback;
		script.onload = script.onreadystatechange = function()
		{
			if (document.readyState == "complete" && _callback)
				_callback();
		};
		head.appendChild(script);
	},
}

$(document).ready(EIReaderTools.init);