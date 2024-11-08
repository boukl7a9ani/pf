// Initialiser la carte centrée sur Paris
const map = L.map('map').setView([48.8566, 2.3522], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Éléments du panneau d'information
const infoPanel = document.getElementById('info-panel');
const closeInfoButton = document.getElementById('close-info');
const monumentName = document.getElementById('monument-name');
const monumentImage = document.getElementById('monument-image');
const monumentInfo = document.getElementById('monument-info');

// Fermer le panneau d'information
closeInfoButton.addEventListener('click', () => {
    infoPanel.style.display = 'none';
});

// Charger les données des monuments
fetch('./assets/data/monuments.json')
    .then(response => response.json())
    .then(data => {
        data.monuments.forEach(monument => {
            // Ajouter un marqueur pour chaque monument
            const marker = L.marker([monument.lat, monument.lng]).addTo(map);
            marker.bindPopup(`<b>${monument.name}</b>`);

            // Afficher les détails du monument lors d'un clic
            marker.on('click', () => {
                monumentName.textContent = monument.name;
                monumentImage.src = `./assets/images/${monument.image}`;
                monumentInfo.textContent = monument.info;
                infoPanel.style.display = 'block';
            });
        });
    })
    .catch(error => console.error('Erreur lors du chargement des données des monuments:', error));
