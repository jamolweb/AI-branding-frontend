import {
  Brandbook,
  GenerateLogoRequest,
  UpdateBrandbookRequest,
} from '@/types/brandbook';
import { api } from './api';

export const brandbookService = {
  async list(): Promise<Brandbook[]> {
    const { data } = await api.get(`/brandbook`);
    return data;
  },

  async get(id: string): Promise<Brandbook> {
    const { data } = await api.get(`/brandbook/${id}`);
    return data;
  },

  async generateLogo(data: GenerateLogoRequest): Promise<{ logoUrl: string }> {
    const { data: responseData } = await api.post(`/generate-logo`, data);
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
    const formData = new FormData();

    if (data.logo) {
      formData.append('logo', data.logo);
    }

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
        },
      },
    );

    return responseData;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/brandbook/${id}`);
  },

  async regenerate(id: string): Promise<Brandbook> {
    const response = await api.post<Brandbook>(
      `/brandbook/${id}/regenerate`,
      null
    );
    return response.data;
  },

  async getPdf(id: string): Promise<{ pdfUrl: string }> {
    const { data } = await api.get(`/brandbook/${id}/pdf`);
    return data;
  },

  async generateLogoWithAI(prompt: string): Promise<{ logoUrl: string }> {
    const { data } = await api.post('/brandbook/generate-logo', { prompt });

    return data;
  },
};
