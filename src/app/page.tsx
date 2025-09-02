'use client';

import { useState, useMemo } from 'react';
import { restaurants, getUniqueCuisines, getUniqueLocations, getUniquePriceRanges, filterRestaurants, searchRestaurants } from '@/lib/data';
import { Restaurant } from '@/types/restaurant';
import RestaurantGrid from '@/components/RestaurantGrid';
import FilterBar from '@/components/FilterBar';

export default function Home() {
  const [filters, setFilters] = useState<{
    cuisine?: string;
    location?: string;
    priceRange?: Restaurant['priceRange'];
    search?: string;
  }>({});

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;
    
    if (filters.search) {
      result = searchRestaurants(filters.search);
    }
    
    if (filters.cuisine || filters.location || filters.priceRange) {
      result = filterRestaurants({
        cuisine: filters.cuisine,
        location: filters.location,
        priceRange: filters.priceRange
      }).filter(restaurant => 
        !filters.search || searchRestaurants(filters.search).includes(restaurant)
      );
    }
    
    return result;
  }, [filters]);

  const cuisines = getUniqueCuisines();
  const locations = getUniqueLocations();
  const priceRanges = getUniquePriceRanges();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Windswept Alleys
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Curated restaurant and café guide
            </p>
            <p className="text-gray-500">
              Discover exceptional dining experiences through carefully selected reviews
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar 
          cuisines={cuisines}
          locations={locations}
          priceRanges={priceRanges}
          onFiltersChange={setFilters}
        />
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} Found
          </h2>
          {Object.keys(filters).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {`Search: "${filters.search}"`}
                </span>
              )}
              {filters.cuisine && (
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {filters.cuisine}
                </span>
              )}
              {filters.location && (
                <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  {filters.location}
                </span>
              )}
              {filters.priceRange && (
                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  {filters.priceRange}
                </span>
              )}
            </div>
          )}
        </div>
        
        <RestaurantGrid restaurants={filteredRestaurants} />
      </main>
    </div>
  );
}
