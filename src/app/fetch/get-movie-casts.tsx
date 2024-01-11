"use server";

interface GetMovieCastsProps {
  id?: number;
}

export interface CasterTypes {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export default async function getMovieCasts({ id }: GetMovieCastsProps) {
  const apiKey = process.env.API_KEY;
  const token = process.env.API_TOKEN;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR&include_adult=false&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer Authorization: Bearer ${token}`,
      },
    },
  );

  if (response.ok) {
    const casts = await response.json();
    return {
      status: 200,
      message: "Elenco encontrados com sucesso",
      casts: casts.cast,
    };
  } else {
    return {
      status: 400,
      message: "Ocorreu um erro ao tentar realizar a busca",
    };
  }
}
