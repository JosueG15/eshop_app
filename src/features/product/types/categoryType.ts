export interface ICategory {
  name: string;
  color: string;
  icon: string;
  image: string;
  id: string;
}

export interface ICategoryResponse {
  success: boolean;
  data: ICategory[];
}
