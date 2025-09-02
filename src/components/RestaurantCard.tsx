import { Restaurant } from '@/types/restaurant';
import Image from 'next/image';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-600';
      case '$$': return 'text-yellow-600';
      case '$$$': return 'text-orange-600';
      case '$$$$': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={restaurant.featuredImage}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1">
            <span className={getRatingColor(restaurant.rating)}>★</span>
            <span>{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 truncate">{restaurant.name}</h3>
            <span className={`text-lg font-bold ${getPriceRangeColor(restaurant.priceRange)}`}>
              {restaurant.priceRange}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded-full">{restaurant.cuisine}</span>
            <span>{restaurant.location}</span>
          </div>
          
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{restaurant.review}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {restaurant.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {restaurant.features.length > 3 && (
              <span className="text-xs text-gray-500">+{restaurant.features.length - 3} more</span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="capitalize">{restaurant.bestFor[0]}</span>
            <span>{restaurant.address.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}