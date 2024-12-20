import { ICategory } from "../../features/product/types/categoryType";

interface Review {
  avatar: string;
  name: string;
  review: string;
}
export interface IProduct {
  name: string;
  description: string;
  richDescription?: string;
  image: string;
  images: string[];
  brand?: string;
  price: number;
  category: ICategory;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  reviews: Review[];
}

export interface IProductQueryParams {
  name?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  limit?: number;
  page?: number;
}

export interface IProductListResponse {
  success: boolean;
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
  data: IProduct[];
}
