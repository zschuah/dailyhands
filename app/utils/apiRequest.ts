import axios, { type AxiosRequestConfig } from "axios";

type ApiResponse<T> = {
  data: T | null;
  error: unknown;
};

export async function apiRequest<T>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const response = await axios<T>(config);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error("apiRequest error occurred:", error);

    return {
      data: null,
      error,
    };
  }
}
