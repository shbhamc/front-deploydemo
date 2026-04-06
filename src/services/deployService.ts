import { api } from "./axios";

export type DeployDemo = {
  id: number;
  name: string;
};

const BASE = "Deploy";

// ✅ Get all
export const getAllDeploys = async () => {
  const res = await api.get<DeployDemo[]>(BASE+"/all");
  return res.data;
};

// ✅ Get by ID
export const getDeployById = async (id: number | string) => {
  const res = await api.get<DeployDemo>(`${BASE}/${id}`);
  return res.data;
};

// ✅ Create
export const createDeploy = async (name: string) => {
  const res = await api.post(BASE, { name });
  return res.data;
};

// ✅ Update
export const updateDeploy = async (id: number, name: string) => {
  const res = await api.put(`${BASE}/${id}`, {
    id,
    name,
  });
  return res.data;
};

// ✅ Delete
export const deleteDeploy = async (id: number) => {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data;
};