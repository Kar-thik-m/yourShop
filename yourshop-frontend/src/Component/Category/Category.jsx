import React from "react";
import electronics from "../../assets/category/electronics.jpg";
import fashion from "../../assets/category/fashion.jpg";
import homefurnitures from "../../assets/category/homefurnitures.jpg";
import mobile from "../../assets/category/mobile.jpg";

const Category = () => {
    const categories = [
        { name: "Electronics", img: electronics, count: "150+ Items" },
        { name: "Fashion", img: fashion, count: "200+ Items" },
        { name: "Home Furnitures", img: homefurnitures, count: "80+ Items" },
        { name: "Mobile", img: mobile, count: "120+ Items" },
    ];

    return (
        <section className="py-16 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Explore Categories</h2>
                        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-neutral-500 max-w-md">
                        Find everything you need across our diverse range of curated collections.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <div 
                            key={index} 
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img 
                                    src={cat.img} 
                                    alt={cat.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-blue-400 text-sm font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cat.count}</p>
                                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                                <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Category;
