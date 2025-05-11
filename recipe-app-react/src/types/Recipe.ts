export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  time: number; 
  instructions: string[];
  image: string;
  rating?: number;
  nutrition?: { 
    calories: number; 
    protein: number; 
    fat: number; 
  };
}
