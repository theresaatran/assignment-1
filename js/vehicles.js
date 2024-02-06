const fetchVehicles = async () => {
    try {
        const response = await fetch('https://swapi.dev/api/vehicles/');
        if (!response.ok) {
            throw new Error('Failed to fetch vehicles data');
        }
        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error('Error fetching vehicles data:', error);
        return null;
    }
};

const renderVehicles = async () => {
    const vehiclesData = await fetchVehicles();
    if (vehiclesData) {
        const vehiclesBoxes = document.querySelectorAll('.vehicles-box');
        vehiclesBoxes.forEach(async (box, index) => {
            const vehicle = vehiclesData[index];
            const name = vehicle.name;
            const model = vehicle.model;
            const manufacturer = vehicle.manufacturer;
            const costInCredits = vehicle.cost_in_credits;
            const length = vehicle.length;
			const imageUrl = `../assets/vehicles/${name.toLowerCase().replace(/ /g, '_')}.jpg`;


            const content = `
                <h2>${name}</h2>
				<img src="${imageUrl}" alt="${name} Image" class="vehicles-img">
                <p><strong>Model:</strong> ${model}</p>
                <p><strong>Manufacturer:</strong> ${manufacturer}</p>
                <p><strong>Cost in Credits:</strong> ${costInCredits}</p>
                <p><strong>Length:</strong> ${length}</p>
            `;
            box.innerHTML = content;
        });
    } else {
        console.log('No vehicles data available');
    }
};

renderVehicles();
