import Image from "next/image";
import Link from "next/link";
import { HomeIcon, SearchIcon, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-sky-400 to-blue-500">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
          <h1 className="text-5xl font-bold text-center mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Discover beautiful properties for sale across the UK. Your perfect home is just a click away.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
            <Link href="/property-search">
              Start Your Search
              <SearchIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <HomeIcon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Browse through our extensive collection of properties across all price ranges
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <SearchIcon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
            <p className="text-gray-600">
              Find exactly what you&apos;re looking for with our advanced search filters
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <HeartIcon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
            <p className="text-gray-600">
              Keep track of properties you love and compare them easily
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Home?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start browsing our properties today and find the perfect place to call home.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/property-search">Browse Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/account/my-favourites">View Favorites</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
