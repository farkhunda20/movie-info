const APIURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=5f6e732f40ff19043851963409dcd9e4";

const api_key = "5f6e732f40ff19043851963409dcd9e4";

const imgPath = "https://image.tmdb.org/t/p/w500";

const searchAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=5f6e732f40ff19043851963409dcd9e4&query=";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("#search");

// const main = $("main");
// const form = $("form");
// const search = $("#search");
//innitially get movies

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  const result = respData.results;

  console.log(result);

  displayMovies(result);
}

function displayMovies(movieData) {
  //clear main
  main.innerHTML = " ";

  movieData.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");

    movieContainer.innerHTML = `
   
     <img
          src="${imgPath + movie.poster_path}"
          alt="" />
        <div class="movie-info">
          <h3>${movie.original_title}</h3>
          <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
   </div>

      

      
   `;

    main.appendChild(movieContainer);

    movieContainer.addEventListener("click", () => {
      main.innerHTML = "";

      const movie_clicked_container = document.createElement("div");

      movie_clicked_container.classList.add("movie-clicked");

      main.appendChild(movie_clicked_container);

      movie_clicked_container.innerHTML = `
      
      <img
          src="${imgPath + movie.poster_path}"
          alt="" />

          <div class="movie-info">
          <h3>${movie.original_title}</h3>
          <span class="${getClassByRate(movie.vote_average)}">${
        movie.vote_average
      }</span>
   </div>

   <div class="overview">
      <h4>overview: </h4>
      ${movie.overview}
      </div>

      <div class="vote">
        
        <h3>current vote: ${movie.vote_count}</h3>
        <h4>vote for the movie</h4>
        <button id="like"><i class="fa-regular fa-thumbs-up"></i></button>
        <button id="dislike"><i class="fa-regular fa-thumbs-down"></i></button>
        
        
      </div>  

      `;

      movie_clicked_container.querySelector("img").classList.add("bigImg");

      const like = movie_clicked_container.querySelector("#like i");
      const dislike = movie_clicked_container.querySelector("#dislike i");

      let votecount = movie.vote_count;
      like.addEventListener("click", () => {
        like.classList.toggle("fa-solid");
      });

      dislike.addEventListener("click", () => {
        dislike.classList.toggle("fa-solid");
      });
    });
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchAPI + searchTerm);
    search.value = "";
  }
});
