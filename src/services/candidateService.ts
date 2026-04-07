import { api } from "../api/clients";
import type { Candidate } from "../types/candidate";

export const candidateService = {
  getAll: async (): Promise<Candidate[]> => {
    const res = await api.get("/candidates");
    return res.data;
  },
  delete: async (id: string) => {
    return api.delete(`/candidates/${id}`);
  },
};
