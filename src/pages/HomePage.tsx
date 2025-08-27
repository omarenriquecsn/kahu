import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, Heart } from "lucide-react";
import PeluditoCard from "../components/UI/PeluditoCard";
import OfferCard from "../components/UI/OfferCard";

export function HomePage() {
  return (
    <div>
      {/* Destacados Section */}
      <section className="bg-white shadow-sm border-b border-gray-200 py-20 justify-center text-center">
        <h2>Peluditos Satisfechos</h2>
        <div className="bg-green-900 border-8 border-yellow-800 rounded-xl p-10 px-18 max-w-2xl mx-auto my-8">
          {/* Grid de cards */}
          <div className="grid grid-cols-3 gap-14 max-w-2xl mx-auto">
            <PeluditoCard />
            <PeluditoCard />
            <PeluditoCard />
            <PeluditoCard />
            <PeluditoCard />
            <PeluditoCard />
          </div>
        </div>
      </section>

      {/* Ofertas del Mes */}
      <section className="py-16 bg-gray-50 w-full">
        <div className=" text-center">
          <h2>Ofertas del Mes</h2>
          <div className="bg-gray-100 rounded-2xl shadow-md h-auto w-fit flex items-center justify-center grid grid-cols-3 gap-8 p-2 mx-auto my-8">
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="py-16"></section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16"></section>
    </div>
  );
}
