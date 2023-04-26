import Link from "next/link";

const Header = () => {

    return (
        <header className="header">
            <Link href='/' className="logo">
                <h1>Prime Flix</h1>
            </Link>

            <Link href='/movies' className="my-movies">My movies</Link>
        </header>
    );
}

export default Header;