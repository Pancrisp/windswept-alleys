import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getRestaurantById, cuisines, locations } from '@/lib/data';

interface RestaurantPageProps {
  params: { id: string };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = getRestaurantById(params.id);

  if (!restaurant) {
    notFound();
  }

  const cuisine = cuisines[restaurant.cuisine];
  const location = locations[restaurant.location];

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-600';
      case '$$': return 'text-yellow-600';
      case '$$$': return 'text-orange-600';
      case '$$$$': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Restaurants
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={restaurant.featuredImage}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-lg">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {restaurant.cuisine}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {restaurant.location}
            </span>
            <span className={`font-bold ${getPriceRangeColor(restaurant.priceRange)}`}>
              {restaurant.priceRange}
            </span>
          </div>
        </div>
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-semibold flex items-center gap-2">
          <span className="text-yellow-500">★</span>
          <span>{restaurant.rating}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Review */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Review</h2>
              <p className="text-gray-700 leading-relaxed">{restaurant.review}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
              <ul className="space-y-2">
                {restaurant.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Gallery */}
            {restaurant.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restaurant.images.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${restaurant.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact & Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{restaurant.phone}</p>
                </div>
                {restaurant.website && (
                  <div>
                    <span className="font-medium text-gray-700">Website:</span>
                    <a 
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 block"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hours</h3>
              <div className="space-y-2">
                {Object.entries(restaurant.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize font-medium text-gray-700">{day}:</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Atmosphere */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Features</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <h4 className="font-medium text-gray-700 mb-2">Best For:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.bestFor.map((occasion, index) => (
                  <span 
                    key={index}
                    className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    {occasion}
                  </span>
                ))}
              </div>

              <h4 className="font-medium text-gray-700 mb-2">Atmosphere:</h4>
              <p className="text-gray-600 text-sm">{restaurant.atmosphere}</p>
            </div>

            {/* Cuisine & Location Info */}
            {(cuisine || location) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Area</h3>
                
                {cuisine && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">{restaurant.cuisine} Cuisine:</h4>
                    <p className="text-gray-600 text-sm mb-2">{cuisine.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {cuisine.characteristics.map((char, index) => (
                        <span 
                          key={index}
                          className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {location && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{restaurant.location}:</h4>
                    <p className="text-gray-600 text-sm mb-2">{location.description}</p>
                    <p className="text-gray-500 text-xs">{location.atmosphere}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}