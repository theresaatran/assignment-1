const fetchAndDisplayFilms = async () => {
    try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        const films = data.results.slice(0, 6);
        renderFilms(films);
    } catch (error) {
        console.error('Error fetching films:', error);
    }
};


const renderFilms = (films) => {
    const filmBoxes = document.querySelectorAll('.film-box');
    filmBoxes.forEach((box, index) => {
        const film = films[index];
        const title = film.title;
        const director = film.director;
        const releaseDate = film.release_date;
		const imageUrl = `../assets/films/${index + 1}.${title.toLowerCase().replace(/ /g, '_')}.jpg`;

        const content = `
            <h2>${title}</h2>
			<img src="${imageUrl}" alt="${title} Cover" class="film-cover">
            <p><strong>Director:</strong> ${director}</p>
            <p><strong>Release Date:</strong> ${releaseDate}</p>
        `;
        box.innerHTML = content;
    });
};

fetchAndDisplayFilms();