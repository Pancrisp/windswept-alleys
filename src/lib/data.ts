import { Restaurant, CuisineData, LocationData } from '@/types/restaurant';
import restaurantsData from '../../data/restaurants.json';
import cuisinesData from '../../data/cuisines.json';
import locationsData from '../../data/locations.json';

export const restaurants: Restaurant[] = restaurantsData as Restaurant[];
export const cuisines: CuisineData = cuisinesData as CuisineData;
export const locations: LocationData = locationsData as LocationData;

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find(restaurant => restaurant.id === id);
}

export function getRestaurantsByCuisine(cuisine: string): Restaurant[] {
  return restaurants.filter(restaurant => restaurant.cuisine === cuisine);
}

export function getRestaurantsByLocation(location: string): Restaurant[] {
  return restaurants.filter(restaurant => restaurant.location === location);
}

export function getRestaurantsByPriceRange(priceRange: Restaurant['priceRange']): Restaurant[] {
  return restaurants.filter(restaurant => restaurant.priceRange === priceRange);
}

export function searchRestaurants(query: string): Restaurant[] {
  const lowercaseQuery = query.toLowerCase();
  return restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(lowercaseQuery) ||
    restaurant.cuisine.toLowerCase().includes(lowercaseQuery) ||
    restaurant.location.toLowerCase().includes(lowercaseQuery) ||
    restaurant.review.toLowerCase().includes(lowercaseQuery) ||
    restaurant.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)) ||
    restaurant.highlights.some(highlight => highlight.toLowerCase().includes(lowercaseQuery))
  );
}

export function getUniqueCuisines(): string[] {
  return [...new Set(restaurants.map(restaurant => restaurant.cuisine))].sort();
}

export function getUniqueLocations(): string[] {
  return [...new Set(restaurants.map(restaurant => restaurant.location))].sort();
}

export function getUniquePriceRanges(): Restaurant['priceRange'][] {
  return [...new Set(restaurants.map(restaurant => restaurant.priceRange))].sort();
}

export function filterRestaurants({
  cuisine,
  location,
  priceRange,
  rating,
  features
}: {
  cuisine?: string;
  location?: string;
  priceRange?: Restaurant['priceRange'];
  rating?: number;
  features?: string[];
}): Restaurant[] {
  return restaurants.filter(restaurant => {
    if (cuisine && restaurant.cuisine !== cuisine) return false;
    if (location && restaurant.location !== location) return false;
    if (priceRange && restaurant.priceRange !== priceRange) return false;
    if (rating && restaurant.rating < rating) return false;
    if (features && features.length > 0) {
      const hasAllFeatures = features.every(feature => 
        restaurant.features.some(restaurantFeature => 
          restaurantFeature.toLowerCase().includes(feature.toLowerCase())
        )
      );
      if (!hasAllFeatures) return false;
    }
    return true;
  });
}