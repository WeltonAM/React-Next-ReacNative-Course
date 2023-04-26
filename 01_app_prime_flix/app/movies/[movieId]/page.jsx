"use client";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Movie = ({ params }) => {

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${params.movieId}`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY
                }
            })
                .then((res) => setMovie(res.data))
                .catch(() => {
                    setLoading(false);
                    return router.push('/');
                })
        }

        loadMovie();
        setLoading(false);

        return () => {
            console.log('dismounted');
        }

    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    const handleSave = () => {
        const movieList = localStorage.getItem("@primeflix");

        let savedMovies = JSON.parse(movieList) || [];

        const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id)

        if (hasMovie) {
            toast.error("Movie already saved.");
            return;
        }

        savedMovies.push(movie);

        localStorage.setItem("@primeflix", JSON.stringify(savedMovies));

        toast.success("Movie saved successfully!");
    }

    return (
        <div className="app">
            <div className="movie-info">
                <h1>{movie.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

                <h3>Overview</h3>
                <span>{movie.overview}</span>

                <strong>Average: {movie.vote_average}/10</strong>

                <div className="btn-area">
                    <button onClick={handleSave}>Save</button>
                    <button >
                        <Link target='_blank' href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>Trailer</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Movie;