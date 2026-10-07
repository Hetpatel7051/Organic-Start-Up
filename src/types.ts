export type ActiveView = 
  | 'harvest-live'
  | 'telemetry'
  | 'the-plots'
  | 'subscription-baskets'
  | 'traceability'
  | 'lab-reports';

export type CategoryFilter = 'all' | 'daily' | 'leafy' | 'gourd-roots';

export interface ProduceLot {
  id: string;
  name: string;
  hindiName: string;
  variety: string;
  plot: string;
  category: 'daily' | 'leafy' | 'gourd-roots';
  harvestTime: string;
  sweetnessRating: string;
  pesticideFree: string;
  basketsLeft: number;
  weightText: string;
  freshnessScore: number;
  temperature: string;
  nutritionScore: number;
  waterSource: string;
  imageUrl: string;
  simpleDescription: string;
  pricePerKg: number;
  isPopular?: boolean;
}

export interface BasketTier {
  id: string;
  name: string;
  hindiSubtitle: string;
  priceRupees: number;
  weightKg: string;
  idealFor: string;
  simpleDescription: string;
  features: string[];
  isPopular?: boolean;
  deliveryTime: string;
}

export interface FarmWeather {
  airTemp: number;
  airStatus: string;
  humidity: number;
  humidityStatus: string;
  sunlightHours: number;
  soilMoisture: string;
  airQuality: string;
  windSpeed: string;
}

export interface FarmPlot {
  id: string;
  code: string;
  name: string;
  cropHindi: string;
  area: string;
  healthScore: number;
  soilMoisture: string;
  soilTemp: string;
  soilType: string;
  status: string;
  liveCamera: string;
}
