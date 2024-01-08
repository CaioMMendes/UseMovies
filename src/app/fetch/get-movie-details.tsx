"use server";

interface GetMovieDetailsProps {
  id?: number;
}

export default async function getMovieDetails({ id }: GetMovieDetailsProps) {
  const apiKey = process.env.API_KEY;
  const token = process.env.API_TOKEN;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&include_adult=false&language=pt-BR`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer Authorization: Bearer ${token}`,
      },
    },
  );
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
