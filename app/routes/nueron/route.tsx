import type { MetaFunction } from "@remix-run/node";

import * as styles from "./route.css";

import { TableGenealogy } from "~/features/neuron/ui";
import { ClientOnly } from "remix-utils/client-only";

export const meta: MetaFunction = () => {
  return [
    { title: "뉴런 신호 전달 시각화" },
    { name: "description", content: "뉴런 신호 전달 과정을 시각화한 페이지" },
  ];
};

export default function Neuron() {
  return (
    <div className={styles.page}>
      <ClientOnly>{() => <TableGenealogy />}</ClientOnly>
    </div>
  );
}
