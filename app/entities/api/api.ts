import { https } from "~/libs/network";

interface Response {
  id: string;
  name: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export async function getTables() {
  const response = await https.get<Response[]>("/api/databases");
  return response;
}
