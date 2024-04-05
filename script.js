function generateMeme() {
    var canvas = document.getElementById('meme-canvas');
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('meme-image');
    var topText = document.getElementById('top-text').value.toUpperCase();
    var bottomText = document.getElementById('bottom-text').value.toUpperCase();

    // Verifica se uma imagem foi carregada
    if (!image.files || !image.files[0]) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    var reader = new FileReader();

    // Lê a imagem selecionada e desenha no canvas
    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            drawText(ctx, topText, bottomText, canvas.width, canvas.height);
            canvas.style.display = 'block';

            // Adiciona um link de download para o meme gerado
            var downloadLink = document.createElement('a');
            downloadLink.href = canvas.toDataURL(); // Converte o canvas para uma imagem URL
            downloadLink.download = 'meme.png'; // Nome do arquivo a ser baixado
            downloadLink.innerHTML = 'Download Meme'; // Texto do link de download
            document.body.appendChild(downloadLink); // Adiciona o link à página
        }
        img.src = event.target.result;
    }

    // Carrega a imagem como URL
    reader.readAsDataURL(image.files[0]);
}

function drawText(ctx, topText, bottomText, width, height) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.font = '36px Impact';

    // Desenha o texto superior
    ctx.fillText(topText, width / 2, 40);
    ctx.strokeText(topText, width / 2, 40);

    // Desenha o texto inferior
    ctx.fillText(bottomText, width / 2, height - 20);
    ctx.strokeText(bottomText, width / 2, height - 20);
}