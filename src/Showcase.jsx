import heroImage from "./assets/hero-image.png";
export default function Showcase() {
    return (
        <section className="bg-slate-100 px-6 py-20 md:px-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Built for Developers Who Ship
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Streamline your workflow with deep technical insights and real-world
                        code patterns curated specifically for senior engineers.
                    </p>
                </div>
                <img
                    src={heroImage}
                    alt="Laptop showing a newsletter dashboard with code snippets"
                    className="aspect-video w-full rounded-xl object-cover"
                />
            </div>
        </section>
    );
}
