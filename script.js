document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "11709030";
    const searchMovieBtn = document.getElementById("movie-search-button");
    const movieTitleInput = document.getElementById("movie-search-input");
    const movieList = document.getElementById("movie-list");
    const loader = document.getElementById("loader");

    // Функция для отображения тостеров
    function showToast(toastId) {
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    function loadMovieData(movieTitle) {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    document.getElementById("movieModalLabel").textContent = data.Title;

                    document.getElementById("modalMovieDescription").innerHTML = `
                        <strong>Title:</strong> ${data.Title}<br>
                        <strong>Year:</strong> ${data.Year}<br>
                        <strong>Actors:</strong> ${data.Actors}<br>
                        <strong>Plot:</strong> ${data.Plot}
                    `;

                    document.getElementById("modalMovieImage").src = data.Poster;

                    const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
                    movieModal.show();
                    showToast('successToast'); // Показать тостер успеха
                } else {
                    showToast('errorToast'); // Показать тостер ошибки
                }
            })
            .catch(error => {
                console.error("Ошибка при загрузке данных фильма:", error);
                showToast('errorToast'); // Показать тостер ошибки
            });
    }

    function createMovieCard(movie) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="position-relative">
                <button class="btn btn-outline-danger position-absolute top-0 end-0 m-2 favorite-btn" aria-label="Избранное">
                   ♥
                </button>
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Год: ${movie.Year}</p>
                <button class="btn btn-primary btn-details" data-movie-title="${movie.Title}">Подробнее</button>
            </div>
        `;

        card.querySelector(".btn-details").addEventListener("click", function() {
            loadMovieData(movie.Title);
        });

        // Обработчик для кнопки добавления в избранное
        const favoriteButton = card.querySelector("[aria-label='Избранное']");
        favoriteButton.addEventListener("click", function() {
            const isActive = this.classList.toggle('active'); // Переключаем класс active
            addToFavorites(movie);
        });

        return card;
    }

    function addToFavorites(movie) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        if (!favorites.some(fav => fav.Title === movie.Title)) {
            favorites.push(movie);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            showToast('successToast'); // Успешно добавлено в избранное
        } else {
            alert("Фильм уже в избранном!");
        }
    }

    searchMovieBtn.addEventListener("click", function() {
        const movieTitle = movieTitleInput.value;
        if (movieTitle) {
            const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;

            // Показать загрузчик
            loader.style.display = 'block';

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Скрыть загрузчик
                    loader.style.display = 'none';

                    if (data.Response === "True") {
                        movieList.innerHTML = "";
                        data.Search.forEach(movie => {
                            const movieCard = createMovieCard(movie);
                            movieList.appendChild(movieCard);
                        });
                        showToast('successToast'); // Показать тостер успеха
                    } else {
                        movieList.innerHTML = "<p>Фильмы не найдены</p>";
                        showToast('errorToast'); // Показать тостер ошибки
                    }
                })
                .catch(error => {
                    // Скрыть загрузчик
                    loader.style.display = 'none';
                    console.error("Ошибка при загрузке списка фильмов:", error);
                    movieList.innerHTML = "<p>Произошла ошибка при загрузке данных.</p>";
                    showToast('errorToast'); // Показать тостер ошибки
                });
        } else {
            alert("Пожалуйста, введите название фильма.");
        }
    });

    // Функция для загрузки избранных фильмов
    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const favoritesList = document.getElementById("favorites-list");
        if (favorites.length === 0) {
            favoritesList.innerHTML = "<p>Нет избранных фильмов.</p>";
        } else {
            favorites.forEach(movie => {
                const card = createMovieCard(movie);
                favoritesList.appendChild(card);
            });
        }
    }

    // Вызов функции загрузки избранных фильмов, если находимся на странице избранного
    if (document.title === "Избранные фильмы") {
        loadFavorites();
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "11709030";
    const loader = document.getElementById("loader");

    function showToast(toastId) {
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    function loadMovieData(movieTitle) {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    document.getElementById("movieModalLabel").textContent = data.Title;
                    document.getElementById("modalMovieDescription").innerHTML = `
                        <strong>Title:</strong> ${data.Title}<br>
                        <strong>Year:</strong> ${data.Year}<br>
                        <strong>Actors:</strong> ${data.Actors}<br>
                        <strong>Plot:</strong> ${data.Plot}
                    `;
                    document.getElementById("modalMovieImage").src = data.Poster;

                    const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
                    movieModal.show();
                } else {
                    showToast('errorToast');
                }
            })
            .catch(error => {
                console.error("Ошибка при загрузке данных фильма:", error);
                showToast('errorToast');
            });
    }

    function createMovieCard(movie) {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">Год: ${movie.Year}</p>
                    <button class="btn btn-primary btn-details" data-movie-title="${movie.Title}">Подробнее</button>
                    <button class="btn btn-danger" aria-label="Удалить из избранного">Удалить</button>
                </div>
            </div>
        `;

        // Обработчик для кнопки "Подробнее"
        card.querySelector(".btn-details").addEventListener("click", function() {
            loadMovieData(movie.Title);
        });

        // Обработчик для кнопки удаления
        card.querySelector("[aria-label='Удалить из избранного']").addEventListener("click", function() {
            removeFromFavorites(movie.Title);
            card.remove();
        });

        return card;
    }

    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const favoritesList = document.getElementById("favorites-list");
        if (favorites.length === 0) {
            favoritesList.innerHTML = "<p>Нет избранных фильмов.</p>";
        } else {
            favorites.forEach(movie => {
                const card = createMovieCard(movie);
                favoritesList.appendChild(card);
            });
        }
    }

    function removeFromFavorites(movieTitle) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(movie => movie.Title !== movieTitle);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // Загрузка избранных фильмов при загрузке страницы
    loadFavorites();
});