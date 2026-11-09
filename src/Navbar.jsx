export default function Navbar() {
    return (
        <header className="bg-slate-900 px-6 py-4 md:px-10">
            <nav className="mx-auto flex max-w-6xl items-center justify-between">
                <span className="text-xl font-bold tracking-tight text-white">
                    CodeSignal
                </span>
                <ul className="hidden md:flex md:gap-8">
                    <li>
                        <a href="#" className="text-slate-300">
                            Articles
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-slate-300">
                            Snippets
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-slate-300">
                            Archive
                        </a>
                    </li>
                </ul>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">
                    Subscribe
                </button>
            </nav>
        </header>
    );
}