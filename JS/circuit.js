document.addEventListener('DOMContentLoaded', function() {
    const botonesCircuit = document.querySelectorAll('.boton-icon-gp');
    const imgGp = document.querySelectorAll('.gp-img');
    const countryNameDisplay = document.getElementById('country-name-display');
    const gpNameDisplay = document.getElementById('gp-name-display');
    const gpLapDisplay = document.getElementById('gp-lap-display')
    const gpLengthDisplay = document.getElementById('gp-length-display')
    
     function ocultarTodasLasCaras() {
        imgGp.forEach(img => {
            img.classList.add('oculto');
        });
    }

    function resetGpInfo() {
        countryNameDisplay.textContent = 'COUNTRY';
        gpNameDisplay.textContent = 'GP';
        gpLapDisplay.textContent = '0s';
        gpLengthDisplay.textContent = '0Km'
        botonesCircuit.forEach(btn => {
        btn.classList.remove('active-gp');
        });
    }

    function simulateCircuitButtonClick(button) {
        ocultarTodasLasCaras();

        botonesCircuit.forEach(btn => {
        btn.classList.remove('active-gp');
        });

        const gpImageId = button.dataset.gp;
        const countryName = button.dataset.country;
        const nameGp = button.dataset.name;
        const fastLap = button.dataset.lap;
        const lengthGp = button.dataset.length

        const gpImage = document.getElementById(gpImageId);
        if (gpImage) {
            gpImage.classList.remove('oculto');
            countryNameDisplay.textContent = countryName;
            gpNameDisplay.textContent = nameGp;
            gpLapDisplay.textContent= fastLap
            gpLengthDisplay.textContent= lengthGp
            console.log(gpImage)
            

             button.classList.add('active-gp');
        } else {
            console.warn(`Imagen de piloto no encontrada para ID: ${gpImageId}`);
            resetGpInfo();
        }
    }
    botonesCircuit.forEach(button => {
        button.addEventListener('click', function() {
            simulateCircuitButtonClick(this);
        });
    });
    resetGpInfo();
    if (botonesCircuit.length > 0) {
        simulateCircuitButtonClick(botonesCircuit[0]);
    }

})

