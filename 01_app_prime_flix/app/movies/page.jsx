"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const page = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@primeflix");

        setMovies(JSON.parse(myList) || []);

    }, []);

    const handleDelete = (movieId) => {
        let moviesFiltered = movies.filter((movie) => movie.id !== movieId);

        setMovies(moviesFiltered);
        localStorage.setItem("@primeflix", JSON.stringify(moviesFiltered));
        toast.success("Movie removed successfully.");
    }

    return (
        <div className="app">
            <div className="my-list">

                {movies.length === 0 ? (
                    <span>No movies saved yet!</span>

                ) : (
                    <ul>
                        <h3>My saves movies</h3>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <span>{movie.title}</span>
                                <div>
                                    <Link href={`/movies/${movie.id}`}>See more</Link>
                                    <button onClick={() => handleDelete(movie.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

            </div>

        </div >
    );
}

export default page;