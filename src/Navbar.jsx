export default function Navbar() {
    return (
        <header className="bg-slate-900 px-6 py-4 md:px-10 border-b border-slate-700">
            <nav className="mx-auto flex max-w-6xl items-center justify-between">
                <span className="text-xl font-bold tracking-tight text-white">
                    CodeSignal
                </span>
                <ul className="hidden items-center gap-8 text-slate-300 md:flex">
                    <li>
                        <a href="#">Articles</a>
                    </li>
                    <li>
                        <a href="#">Snippets</a>
                    </li>
                    <li>
                        <a href="#">Archive</a>
                    </li>
                </ul>
                <button className="rounded-lg bg-indigo-500 px-5 py-2 font-semibold text-white">
                    Subscribe
                </button>
            </nav>
        </header>
    );
}
