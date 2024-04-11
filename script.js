document.getElementById('addButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const files = fileInput.files;
    const existingImages = JSON.parse(localStorage.getItem('images')) || [];

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Criar um container para a imagem e o botão de remover
            const imageContainer = document.createElement('div');

            // Criar e adicionar a imagem ao container
            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);

            // Criar e adicionar o botão de remover ao container
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remover';
            removeButton.addEventListener('click', function() {
                removeImage(e.target.result, imageContainer);
            });
            imageContainer.appendChild(removeButton);

            // Adicionar o container ao galleryContainer
            document.getElementById('galleryContainer').appendChild(imageContainer);

            // Armazenar no localStorage
            existingImages.push(e.target.result);
            localStorage.setItem('images', JSON.stringify(existingImages));
        };
        reader.readAsDataURL(file);
    });
});

// Função para remover uma imagem e seu container
function removeImage(imageSrc, imageContainer) {
    // Remover o container da imagem do DOM
    imageContainer.remove();

    // Atualizar o localStorage removendo a imagem
    let existingImages = JSON.parse(localStorage.getItem('images')) || [];
    existingImages = existingImages.filter(src => src !== imageSrc);
    localStorage.setItem('images', JSON.stringify(existingImages));
}

// Ao carregar a página, verificar o localStorage e exibir imagens existentes
document.addEventListener('DOMContentLoaded', () => {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(src => {
        const imageContainer = document.createElement('div');

        const img = document.createElement('img');
        img.src = src;
        imageContainer.appendChild(img);

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remover';
        removeButton.addEventListener('click', function() {
            removeImage(src, imageContainer);
        });
        imageContainer.appendChild(removeButton);

        document.getElementById('galleryContainer').appendChild(imageContainer);
    });
});