'use client';

import { useState } from 'react';
import { Restaurant } from '@/types/restaurant';

interface FilterBarProps {
  cuisines: string[];
  locations: string[];
  priceRanges: Restaurant['priceRange'][];
  onFiltersChange: (filters: {
    cuisine?: string;
    location?: string;
    priceRange?: Restaurant['priceRange'];
    search?: string;
  }) => void;
}

export default function FilterBar({ cuisines, locations, priceRanges, onFiltersChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    cuisine: '',
    location: '',
    priceRange: '' as Restaurant['priceRange'] | '',
    search: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v !== '')
    );
    
    onFiltersChange(cleanFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { cuisine: '', location: '', priceRange: '' as const, search: '' };
    setFilters(emptyFilters);
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Restaurant name, cuisine, location..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
          <select
            value={filters.cuisine}
            onChange={(e) => handleFilterChange('cuisine', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Prices</option>
            {priceRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}