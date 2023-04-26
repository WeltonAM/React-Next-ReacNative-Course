"use client";
import Link from "next/link";
import api from "./movies/services/api";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const res = await api.get(process.env.NEXT_PUBLIC_URL_API, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          page: 1,
        }
      })

      setMovies(res.data.results.slice(0, 10));
    }

    loadMovies();

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="app">
      <div className="movie-list">
        {movies && movies.map((movie) => (
          <article key={movie.id}>
            <strong>{movie.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
            <Link href={`/movies/${movie.id}`}>See more</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
