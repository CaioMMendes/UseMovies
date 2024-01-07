"use server";

interface GetMoviesProps {
  page?: number;
  search: string;
}

export default async function getMovies({ page = 1, search }: GetMoviesProps) {
  const apiKey = process.env.API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&language=pt-BR&page=${page}&query=${search}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGQyZjY2YzViYzVkMmUyM2NlMTdhNjhiMmI4ZDFmMiIsInN1YiI6IjY1OTlmZWE1N2Q1NTA0MDFhNzJmNzE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y1z7W0CukRY0pWjqbpXZpwJ6GJ2bNtdgdDDYui9IIG8",
      },
    },
  );
  if (response.ok) {
    const movies = await response.json();
    console.log(movies);
    return {
      status: 200,
      message: "Filmes encontrados com sucesso",
      movies: movies,
    };
  } else {
    return {
      status: 400,
      message: "Ocorreu um erro ao tentar realizar a busca",
    };
  }
}
