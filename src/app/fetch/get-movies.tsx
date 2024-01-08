"use server";

interface GetMoviesProps {
  page?: number;
  search: string;
}

export default async function getMovies({ page = 1, search }: GetMoviesProps) {
  const apiKey = process.env.API_KEY;
  const token = process.env.API_TOKEN;

  const url =
    search === ""
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=pt-BR&page=${page}`
      : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&language=pt-BR&page=${page}&query=${search}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer Authorization: Bearer ${token}`,
    },
  });
  if (response.ok) {
    const movies = await response.json();
    // console.log(movies);
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
