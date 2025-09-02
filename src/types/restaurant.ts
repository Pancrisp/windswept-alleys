export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  phone: string;
  address: string;
  website: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  atmosphere: string;
  bestFor: string[];
  review: string;
  highlights: string[];
  images: string[];
  featuredImage: string;
}

export interface Cuisine {
  description: string;
  characteristics: string[];
  typicalPriceRange: string;
  dietaryOptions: string[];
}

export interface Location {
  description: string;
  neighborhood: string;
  characteristics: string[];
  transportation: string[];
  parking: string;
  atmosphere: string;
}

export interface CuisineData {
  [key: string]: Cuisine;
}

export interface LocationData {
  [key: string]: Location;
}

export interface RestaurantFilters {
  cuisine?: string;
  location?: string;
  priceRange?: Restaurant["priceRange"];
  rating?: number;
  features?: string[];
}

export interface SearchOptions {
  query?: string;
  filters?: RestaurantFilters;
  sortBy?: "name" | "rating" | "priceRange";
  sortOrder?: "asc" | "desc";
}
