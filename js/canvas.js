// IE hack
function ie_event(e)
{
	if (e === undefined)
		{ return window.event; };
	return e;
}

/***********************************************************************
 *                 Main Canva Object                                   *
 **********************************************************************/
var Canva = {};
if ((!!document.createElement('video').play)&&(!!document.createElement('canvas').getContext)) {

Canva.init = function(id, width, height)
{
	var canv = document.getElementById(id);
	canv.width = width;
	canv.height = height;

	this.canvasId = id;

	this.ctx = canv.getContext("2d");

	this.selectedColor = '#000000';
	this.selectedFillColor = '#FFFFFF';
	this.selectedWidth = 8;

	this.tool = Pencil;
	this.drawing = false;

	canv.onmousedown = function(e)
	{
		var evnt = ie_event(e);

                //drawing only pushed paused

                if ($('#draw_window').get(0).paused) {
                    Canva.tool.start(evnt);
                }
	};

	canv.onmouseup = function(e)
	{
		if (Canva.drawing)
		{
			var evnt = ie_event(e);
			Canva.tool.finish(evnt);
		}
	};

	canv.onmousemove = function(e)
	{
		if (Canva.drawing)
		{
			var evnt = ie_event(e);
			Canva.tool.move(evnt);
		}
		document.getElementById(Canva.canvasId).style.cursor = 'crosshair';
	};
};

Canva.setTool = function(t)
{
	Canva.tool = t;
};

Canva.setWidth = function(width)
{
	Canvas.selectedWidth = width;
};

Canva.setColor = function(color)
{
	Canva.selectedColor = color;
};

Canva.clear = function()
{
	var canv = document.getElementById(Canva.canvasId);
	Canva.ctx.clearRect(0, 0, canvas.width, canvas.height);
};

}
/**********************************************************************/

/**********************************************************************
 *                      Pencil                                        *
 *********************************************************************/

var Pencil = {};

Pencil.start = function(evnt)
{
	Pencil.x = evnt.clientX;
	Pencil.y = evnt.clientY;

	Canva.ctx.beginPath();
	Canva.ctx.strokeStyle = Canva.selectedColor;
    Canva.ctx.lineWidth = Canva.selectedWidth;
    Canva.ctx.moveTo(Pencil.x, Pencil.y);

    Canva.drawing = true;    
};

Pencil.finish = function(evnt)
{    
	Pencil.x = evnt.clientX;
	Pencil.y = evnt.clientY;
	Canva.ctx.lineTo(Pencil.x, Pencil.y);

	Canva.drawing = false;
};

Pencil.move = function(evnt)
{    
	Pencil.x = evnt.clientX;
	Pencil.y = evnt.clientY;
	Canva.ctx.lineTo(Pencil.x, Pencil.y);
	Canva.ctx.stroke();
	Canva.ctx.moveTo(Pencil.x, Pencil.y);
};

/**********************************************************************/
