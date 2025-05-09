import {
  Brandbook,
  GenerateLogoRequest,
  UpdateBrandbookRequest,
} from '@/types/brandbook';
import { api } from './api';
import { authService } from './auth.service';

export const brandbookService = {
  async list(): Promise<Brandbook[]> {
    const accessToken = authService.getAccessToken();
    const { data } = await api.get(`/brandbook`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  async get(id: string): Promise<Brandbook> {
    const accessToken = authService.getAccessToken();
    const { data } = await api.get(`/brandbook/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  async generateLogo(data: GenerateLogoRequest): Promise<{ logoUrl: string }> {
    const accessToken = authService.getAccessToken();
    const { data: responseData } = await api.post(`/generate-logo`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responseData;
  },

  async getAll(): Promise<Brandbook[]> {
    const response = await api.get<Brandbook[]>('/brandbook');
    return response.data;
  },

  async getById(id: string): Promise<Brandbook> {
    const response = await api.get<Brandbook>(`/brandbook/${id}`);
    return response.data;
  },

  async create(data: FormData): Promise<Brandbook> {
    const response = await api.post<Brandbook>('/brandbook', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, data: UpdateBrandbookRequest): Promise<Brandbook> {
    const accessToken = authService.getAccessToken();
    const formData = new FormData();

    // Handle logo upload
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    // Append other form data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'logo') {
        formData.append(key, value.toString());
      }
    });

    const { data: responseData } = await api.patch(
      `/brandbook/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return responseData;
  },

  async delete(id: string): Promise<void> {
    const accessToken = authService.getAccessToken();
    await api.delete(`/brandbook/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async regenerate(id: string): Promise<Brandbook> {
    const accessToken = authService.getAccessToken();
    const response = await api.post<Brandbook>(
      `/brandbook/${id}/regenerate`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },

  async getPdf(id: string): Promise<{ pdfUrl: string }> {
    const accessToken = authService.getAccessToken();
    const { data } = await api.get(`/brandbook/${id}/pdf`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  async generateLogoWithAI(prompt: string): Promise<{ logoUrl: string }> {
    const accessToken = authService.getAccessToken();

    const { data } = await api.post(
      '/brandbook/generate-logo',
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  },
};
