import { useQuery } from "@tanstack/react-query";
import { tableQueries } from "~/entities";

export default function SelectTable() {
  const { data } = useQuery({ ...tableQueries.tables() });

  return <div>SelectTable</div>;
}
