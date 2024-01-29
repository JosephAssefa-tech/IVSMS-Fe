export interface Factory {
  factoryName: string;
  id: string;
  created: string; // You might want to use Date type instead of string
  createdBy: string | null;
  lastModified: string | null; // You might want to use Date type instead of string
  lastModifiedBy: string | null;
}

export interface ApiResponse {
  data: Factory[];
  success: boolean;
  message: string | null;
  errors: any[] | null;
}
