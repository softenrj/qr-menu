import { defaultAxios } from "./axios";

type ApiRequest = {
    url: string,
    param?: Record<string, string | number>,
    values?: Record<string, string | number| undefined> | FormData
}

const handleApiError = (err: any) => {
  const errorMessage = err?.response?.data?.error || "An error occurred.";
  console.log(err);

  return err?.response?.data || { error: errorMessage };
};

export const getApi = async <T>({
    url,
    param,
}: ApiRequest): Promise<T | undefined> => {
    try {
        let apiUrl = url;
        if (param) {
            const queryString = new URLSearchParams();
            Object.entries(param).forEach(([Key,value]) => {
                queryString.append(Key, String(value))
            })
            apiUrl += `?${queryString.toString()}`
        }
        const response = await defaultAxios.get<T>(url)
        return response.data
    } catch (err) {
        return handleApiError(err)
    }
}

export const postApi = async <T>({
    url,
    values
}: ApiRequest): Promise<T | undefined> => {
    try {
        const response = await defaultAxios.post<T>(url,values)
        return response.data
    } catch (err) {
        return handleApiError(err)
    }
}

export const patchApi = async <T>({
    url,
    values
}: ApiRequest): Promise<T | undefined> => {
    try {
        const response = await defaultAxios.patch<T>(url,values)
        return response.data
    } catch (err) {
        return handleApiError(err)
    }
}

export const deleteApi = async <T>({
  url,
  param,
}: ApiRequest): Promise<T | undefined> => {
  try {
    let apiUrl = url;

    // Append query parameters if provided
    if (param) {
      const queryString = new URLSearchParams();
      Object.entries(param).forEach(([key, value]) => {
        queryString.append(key, String(value));
      });
      apiUrl += `?${queryString.toString()}`;
    }

    const response = await defaultAxios.delete<T>(apiUrl);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
}