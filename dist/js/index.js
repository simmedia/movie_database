$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});
// 2723a3ce
// http://www.omdbapi.com/?apikey=[yourkey]&
function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?apikey=2723a3ce&s=" + searchText)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
                <div class="col m4 l3 s12">
                    <div class="card large">
                      <div class="card-image">
                      <img src="${movie.Poster}">
                      </div>
                      <div class="card-content">
                      <h6>${movie.Title}</h6>
                      </div>
                      <div class="card-action">
                        <span>Genre: ${movie.Genre}</span> <br>
                        <span>Year: ${movie.Year}</span> <br>
                      <a onclick="movieSelected('${
                        movie.imdbID
                      }')" class="btn purple white-text" id="detailBtn" href="#">View Details</a>
                      </div>
                    </div>
                </div>
            `;
      });

      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?apikey=2723a3ce&i=" + movieId)
    .then(response => {
      console.log(response);
      let movie = response.data;

      let output = `
        
            <div class="row">
                <div class="col m6 s12">
                    <img src="${movie.Poster}">
                </div>
                <div class="col m6">
                    <h2>${movie.Title}</h2>
                    <ul>
                        <li class="list-group-item"><strong>Genre:</strong> ${
                          movie.Genre
                        }</li>
                        <li class="list-group-item"><strong>Released:</strong> ${
                          movie.Released
                        }</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${
                          movie.Rated
                        }</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                          movie.imdbRating
                        }</li>
                        <li class="list-group-item"><strong>Director:</strong> ${
                          movie.Director
                        }</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${
                          movie.Writer
                        }</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${
                          movie.Actors
                        }</li>
                        <li class="list-group-item"><strong>Seasons:</strong> ${
                          movie.totalSeasons
                        }</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col m8">
                    <h3>Plot</h3>
                    <p>${movie.Plot}</p>
                    <hr>
                    <a href="http://imdb.com/title/${
                      movie.imdbID
                    }" target="_blank" class="btn purple">View IMDB</a>
                    <a href="index.html" class="btn purple">Go Back to Search</a>
                </div>
            </div>
        `;

      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
