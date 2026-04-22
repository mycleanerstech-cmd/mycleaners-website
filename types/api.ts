export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
}

export interface SchedulePickupPayload {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
}
