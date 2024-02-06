const fetchPeople = async () => {
    try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
            throw new Error('Failed to fetch people data');
        }
        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error('Error fetching people data:', error);
        return null;
    }
};

const renderPeople = async () => {
    const peopleData = await fetchPeople();
    if (peopleData) {
        const peopleBoxes = document.querySelectorAll('.people-box');
        peopleBoxes.forEach(async (box, index) => {
            const person = peopleData[index];
            const name = person.name;
            const gender = person.gender;
            const birthYear = person.birth_year;
			const hairColor = person.hair_color
			const eyeColor = person.eye_color
			const imageUrl = `../assets/people/${name.toLowerCase().replace(/ /g, '_')}.jpg`;

            const content = `
                <h2>${name}</h2>
				<img src="${imageUrl}" alt="${name} Image" class="people-img">
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Birth Year:</strong> ${birthYear}</p>
                <p><strong>Hair Color:</strong> ${hairColor}</p>
                <p><strong>Eye Color:</strong> ${eyeColor}</p>
            `;
            box.innerHTML = content;
        });
    } else {
        console.log('No people data available');
    }
};

renderPeople();
