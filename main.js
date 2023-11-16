$(document).ready(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var isErasing = false;
    var isAddingText = false;
    var prevX, prevY;
    var originalCanvasData;
    var strokeSize = 2; // Valor predeterminado del tamaño del trazo

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    function startDrawing(e) {
        if (isErasing) {
            isDrawing = true;
            originalCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            draw(e);
        } else if (isAddingText) {
            isDrawing = false;
            isAddingText = false;
            var x = e.offsetX;
            var y = e.offsetY;
            var text = document.getElementById('textInput').value;
            drawText(text, x, y);
        } else {
            isDrawing = true;
            var x = e.offsetX;
            var y = e.offsetY;
            prevX = x;
            prevY = y;
        }
    }

    function draw(e) {
        if (!isDrawing) return;
        var x = e.offsetX;
        var y = e.offsetY;

        if (isErasing) {
            ctx.lineWidth = strokeSize;
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (!isAddingText) {
            ctx.lineWidth = strokeSize;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        prevX = x;
        prevY = y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function drawText(text, x, y) {
        ctx.font = "18px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(text, x, y);
    }

    document.getElementById('downloadBtn').addEventListener('click', function() {
        var image = canvas.toDataURL('image/png');
        var downloadLink = document.createElement('a');
        downloadLink.download = 'dibujo.png';
        downloadLink.href = image;
        downloadLink.click();
    });

    document.getElementById('eraseBtn').addEventListener('click', function() {
        isErasing = !isErasing;
        this.textContent = isErasing ? 'Dibujar' : 'Goma de borrar';
    });

    document.getElementById('strokeSize').addEventListener('input', function() {
        strokeSize = parseInt(this.value);
    });

    document.getElementById('clearBtn').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('textBtn').addEventListener('click', function() {
        isAddingText = true;
    });
});








