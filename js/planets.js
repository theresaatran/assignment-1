const fetchPlanets = async () => {
    try {
        const response = await fetch('https://swapi.dev/api/planets/');
        if (!response.ok) {
            throw new Error('Failed to fetch planets data');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching planets data:', error);
        return null;
    }
};

const renderPlanets = async () => {
    const planetsData = await fetchPlanets();
    if (planetsData) {
        const planetsBoxes = document.querySelectorAll('.planets-box');
        planetsBoxes.forEach(async (box, index) => {
            const planet = planetsData[index];
            const name = planet.name;
            const population = planet.population;
            const climate = planet.climate;
            const terrain = planet.terrain;
            const gravity = planet.gravity;
			const imageUrl = `../assets/planets/${name.toLowerCase().replace(/ /g, '_')}.jpg`;

            const content = `
                <h2>${name}</h2>
				<img src="${imageUrl}" alt="${name} Image" class="planets-img">
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Climate:</strong> ${climate}</p>
                <p><strong>Terrain:</strong> ${terrain}</p>
                <p><strong>Gravity:</strong> ${gravity}</p>
            `;
            box.innerHTML = content;
        });
    } else {
        console.log('No planets data available');
    }
};

renderPlanets();
