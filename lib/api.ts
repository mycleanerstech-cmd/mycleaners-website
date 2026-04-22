import axios from "axios";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const IS_MOCK = !API_BASE;

type RequestOptions = {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const res = await axios.request<ApiResponse<T>>({
        url,
        method: options?.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        data: options?.body,
      });

      return res.data;
    } catch (err) {
      let message = err instanceof Error ? err.message : "Unknown error";

      // Axios errors may include status information; surface it if available.
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const statusText = err.response?.statusText;
        if (status) message = `HTTP ${status}${statusText ? `: ${statusText}` : ""}`;
      }

      return { success: false, data: null as T, error: message };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "POST", body });
  }

  async getPaginated<T>(
    endpoint: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<T>> {
    return this.request<T[]>(`${endpoint}?page=${page}&limit=${limit}`) as Promise<
      PaginatedResponse<T>
    >;
  }
}

export const apiClient = IS_MOCK ? null : new ApiClient(API_BASE);

export { IS_MOCK };
