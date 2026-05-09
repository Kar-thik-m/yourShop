import Banner from "../../Component/bannerHome/Banner";
import Category from "../../Component/Category/Category";
import Cards from "../../Component/Cards/Cards";

const Home = () => {

    return (
        <main className="min-h-screen bg-white animate-in fade-in duration-1000">
            <Banner />
            <div className="relative z-20 -mt-12"> {/* Overlap banner slightly for modern look */}
                <Category />
            </div>
            <div className="space-y-12 pb-20">
                <Cards />
                
                {/* Newsletter Section for better UI depth */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="space-y-4 text-center md:text-left">
                                <h2 className="text-3xl md:text-5xl font-bold text-white">Join the <span className="text-blue-500">YourShop</span> Club</h2>
                                <p className="text-neutral-400 text-lg max-w-md">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                            </div>
                            <div className="flex w-full md:w-auto gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="bg-transparent px-4 py-3 text-white outline-none w-full md:w-64"
                                />
                                <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
export default Home;

