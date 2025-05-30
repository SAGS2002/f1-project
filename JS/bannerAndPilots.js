document.addEventListener('DOMContentLoaded', function() {
    // --- ELEMENTOS DEL CARRUSEL ---
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const bodyElement = document.getElementById('body-principal'); // O el elemento que quieras cambiar el fondo

    let currentCarouselIndex = 0;
    const totalCarouselItems = carouselItems.length;
    let autoSlideInterval;
    let pilotAlternationInterval; // Nuevo: para alternar entre pilotos

    // --- ELEMENTOS DE PILOTOS ---
    const botonesParrilla = document.querySelectorAll('.boton-icon');
    const imagenesPilotoCara = document.querySelectorAll('.pilot-img');
    const imagenDefault = document.getElementById('piloto-null-face');
    const pilotNameDisplay = document.getElementById('pilot-name-display');
    const pilotNumberDisplay = document.getElementById('pilot-number-display');
    const pilotColor = document.querySelector('.pilots'); 

    // --- FUNCIONES COMUNES (Pilotos) ---
    function ocultarTodasLasCaras() {
        imagenesPilotoCara.forEach(img => {
            img.classList.add('oculto');
        });
    }

    function resetPilotInfo() {
        pilotNameDisplay.textContent = 'PILOTOS';
        pilotNumberDisplay.textContent = '#';
        pilotColor.style.backgroundColor = '#2C2C2C';
        botonesParrilla.forEach(btn => {
        btn.classList.remove('active-pilot');
        }); // Color de fondo por defecto
    }

    // --- FUNCIONES ESPECÍFICAS DE CARRUSEL ---

    // Función para actualizar el carrusel y el color de fondo
    function updateCarousel() {
        const offset = -currentCarouselIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;

        // Remover la clase 'active' de todos los ítems del carrusel
        carouselItems.forEach((item) => {
            item.classList.remove('active');
        });

        // Añadir la clase 'active' al ítem actual del carrusel
        carouselItems[currentCarouselIndex].classList.add('active');

        // Cambiar el color de fondo del body (o elemento principal)
        const currentTeamColor = carouselItems[currentCarouselIndex].dataset.teamColor;
        if (bodyElement) {
            bodyElement.style.backgroundColor = currentTeamColor;
        }

        // --- Integración: Actualizar pilotos según el banner actual ---
        const currentTeamId = carouselItems[currentCarouselIndex].dataset.teamId;
        updatePilotsForTeam(currentTeamId, currentTeamColor);
    }

    // Función para manejar la alternancia de pilotos de un equipo
    let currentPilotIndex = 0;
    function updatePilotsForTeam(teamId, teamColor) {
        clearInterval(pilotAlternationInterval); // Limpiar cualquier intervalo anterior

        const teamPilots = Array.from(botonesParrilla).filter(button =>
            button.dataset.teamId === teamId
        );

        if (teamPilots.length === 0) {
            // No hay pilotos para este equipo, mostrar por defecto
            ocultarTodasLasCaras();
            if (imagenDefault) {
                imagenDefault.classList.remove('oculto');
            }
            resetPilotInfo();
            return;
        }

        // Si solo hay un piloto, mostrarlo directamente
        if (teamPilots.length === 1) {
            simulatePilotButtonClick(teamPilots[0]);
            return;
        }

        // Alternar entre los dos pilotos
        currentPilotIndex = 0; // Siempre empezar por el primer piloto del equipo
        simulatePilotButtonClick(teamPilots[currentPilotIndex]);

        pilotAlternationInterval = setInterval(() => {
            currentPilotIndex = (currentPilotIndex + 1) % teamPilots.length;
            simulatePilotButtonClick(teamPilots[currentPilotIndex]);
        }, 4000); // Intervalo de 3 segundos para alternar pilotos
    }

    // Función para simular el clic en un botón de piloto
    function simulatePilotButtonClick(button) {
        ocultarTodasLasCaras(); // Ocultar todas las caras

        botonesParrilla.forEach(btn => {
        btn.classList.remove('active-pilot');
        });

        const targetImageId = button.dataset.target;
        const pilotName = button.dataset.name;
        const pilotNumber = button.dataset.number;
        const teamColor = button.dataset.color; // Obtener el color del botón

        

        const targetImage = document.getElementById(targetImageId);
        if (targetImage) {
            targetImage.classList.remove('oculto');
            pilotNameDisplay.textContent = pilotName;
            pilotNumberDisplay.textContent = `#${pilotNumber}`;
            pilotColor.style.backgroundColor = teamColor;

             button.classList.add('active-pilot');
        } else {
            console.warn(`Imagen de piloto no encontrada para ID: ${targetImageId}`);
            // Fallback a la imagen por defecto si la imagen específica no se encuentra
            if (imagenDefault) {
                imagenDefault.classList.remove('oculto');
            }
            resetPilotInfo();
        }
    }


    // --- INICIALIZACIÓN Y EVENTOS ---

    // Estado inicial de los pilotos
    ocultarTodasLasCaras();
    if (imagenDefault) {
        imagenDefault.classList.remove('oculto');
    }
    resetPilotInfo();

    // Inicializar el carrusel con el primer elemento activo y su color
    updateCarousel(); // Esto también disparará la actualización de pilotos para el primer equipo

    // Carrusel automático principal (banners de equipos)
    autoSlideInterval = setInterval(() => {
        currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
        updateCarousel();
    }, 8000); // Intervalo de 8 segundos para cambiar de equipo

    // Event listeners para los botones de navegación del carrusel (si los tienes)
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // Detener auto-avance al interacción manual
            currentCarouselIndex = (currentCarouselIndex - 1 + totalCarouselItems) % totalCarouselItems;
            updateCarousel();
            autoSlideInterval = setInterval(() => { // Reiniciar auto-avance
                currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
                updateCarousel();
            }, 8000);
        });

        nextButton.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // Detener auto-avance al interacción manual
            currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
            updateCarousel();
            autoSlideInterval = setInterval(() => { // Reiniciar auto-avance
                currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
                updateCarousel();
            }, 8000);
        });
    }

    // Opcional: Pausar el carrusel automático al pasar el mouse sobre el contenedor del carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
            clearInterval(pilotAlternationInterval); // También pausar alternancia de pilotos
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
                updateCarousel();
            }, 8000);
            // La alternancia de pilotos se reinicia en updatePilotsForTeam, no es necesario reiniciar aquí.
        });
    }

    // Desactivar la lógica de clic manual de los botones de parrilla para que solo el carrusel los controle
     botonesParrilla.forEach(button => {
        button.addEventListener('click', function() {
            clearInterval(pilotAlternationInterval); // Detener la alternancia automática de pilotos

            // Obtener el ID del equipo del piloto clicado
            const clickedTeamId = this.dataset.teamId;

            // Encontrar el índice del banner del equipo correspondiente
            let targetBannerIndex = -1;
            carouselItems.forEach((item, index) => {
                if (item.dataset.teamId === clickedTeamId) {
                    targetBannerIndex = index;
                }
            });

            if (targetBannerIndex !== -1 && targetBannerIndex !== currentCarouselIndex) {
                // Si el banner del equipo no es el que ya se está mostrando, navegar a él
                clearInterval(autoSlideInterval); // Detener el auto-avance del carrusel principal
                currentCarouselIndex = targetBannerIndex;
                updateCarousel(); // Actualizar el carrusel (esto también activa updatePilotsForTeam para ese equipo)

                // Esto permite que el usuario vea el equipo seleccionado antes de que el carrusel avance de nuevo.
                autoSlideInterval = setInterval(() => {
                    currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselItems;
                    updateCarousel();
                }, 8000); // Mismo intervalo que el auto-avance normal
            } else if (targetBannerIndex === currentCarouselIndex) {
                // Si el banner del equipo ya está visible, solo actualizar el piloto
                // Esto es importante para que si el usuario clica al piloto del equipo actual,
                // la información del piloto se actualice sin mover el banner.
                simulatePilotButtonClick(this);
            }
            // Si targetBannerIndex es -1, significa que no se encontró un banner para el equipo.
            // En ese caso, solo se actualizará la información del piloto si se hace clic.

            // Simular el clic del botón de piloto, que se encarga de mostrar la imagen, texto y escala.
            // Lo llamamos al final para asegurar que se apliquen los estilos del piloto después de la posible navegación del carrusel.
            simulatePilotButtonClick(this);
        });
    });
});