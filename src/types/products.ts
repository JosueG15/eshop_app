export interface ICategory {
  name: string;
  color: string;
  icon: string;
  id: string;
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
}

export interface ProductQueryParams {
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

export interface IError {
  message: string;
  statusCode?: number;
}
