const imageUrls = [
    'images/Hearts/Blue_Soul.png',
    'images/Hearts/Cyan_Soul.png',
    'images/Hearts/Green_Soul.png',
    'images/Hearts/Orange_Soul.png',
    'images/Hearts/Pink_Soul.png',
    'images/Hearts/Purple_Soul.png',
    'images/Hearts/Red_Soul.png',
    'images/Hearts/Yellow_Soul.png',
    'images/Hearts/LightBlue_Soul.png',
    'images/Hearts/LightGreen_Soul.png',
];

const container = document.getElementById('interactive-container');
const containerRect = container.getBoundingClientRect();

let images = [];
let mouseX = 0;
let mouseY = 0;

imageUrls.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.classList.add('img-runner');
    img.style.position = 'absolute';
    img.style.width = '40px';
    img.style.height = '40px';
    
    img.style.top = `${Math.random() * (containerRect.height - 100)}px`;
    img.style.left = `${Math.random() * (containerRect.width - 100)}px`;

    img.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(img);
    images.push(img);
});


function avoidCollisions() {
    for (let i = 0; i < images.length; i++) {
        for (let j = i + 1; j < images.length; j++) {
            const imgA = images[i];
            const imgB = images[j];

            const rectA = imgA.getBoundingClientRect();
            const rectB = imgB.getBoundingClientRect();

            // Verificar se há sobreposição
            const overlapX = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left));
            const overlapY = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top));

            if (overlapX > 0 && overlapY > 0) { // Se houver sobreposição
                // Calcular a direção para afastar as imagens
                const offsetX = (rectA.left + rectA.width / 2) - (rectB.left + rectB.width / 2);
                const offsetY = (rectA.top + rectA.height / 2) - (rectB.top + rectB.height / 2);

                const directionX = offsetX > 0 ? 1 : -1; // Direção para afastar na horizontal
                const directionY = offsetY > 0 ? 1 : -1; // Direção para afastar na vertical

                const moveDistance = 1; // Distância para afastar as imagens

                // Ajustar as posições das imagens para afastá-las
                imgA.style.left = `${parseFloat(imgA.style.left) + directionX * moveDistance}px`;
                imgA.style.top = `${parseFloat(imgA.style.top) + directionY * moveDistance}px`;
                imgB.style.left = `${parseFloat(imgB.style.left) - directionX * moveDistance}px`;
                imgB.style.top = `${parseFloat(imgB.style.top) - directionY * moveDistance}px`;
            }
        }
    }
}

function updateImagePositions() {
    images.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left - containerRect.left + imgRect.width / 2;
        const imgCenterY = imgRect.top - containerRect.top + imgRect.height / 2;

        const distanceX = mouseX - imgCenterX;
        const distanceY = mouseY - imgCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const speed = Math.max(2, 20 - distance / 10);
        const moveSpeed = Math.min(speed, distance);
        let newLeft = img.offsetLeft;
        let newTop = img.offsetTop;

        if (distance < 200) {
            newLeft -= (distanceX / distance) * moveSpeed;
            newTop -= (distanceY / distance) * moveSpeed;
        }

        img.style.left = `${Math.min(Math.max(0, newLeft), containerRect.width - imgRect.width)}px`;
        img.style.top = `${Math.min(Math.max(0, newTop), containerRect.height - imgRect.height)}px`;
    });

    avoidCollisions(); // Chamar a função para evitar colisões

    requestAnimationFrame(updateImagePositions);
}

container.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - containerRect.left;
    mouseY = e.clientY - containerRect.top;
});

updateImagePositions();
