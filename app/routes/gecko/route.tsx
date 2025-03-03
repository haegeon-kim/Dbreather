import type { MetaFunction } from "@remix-run/node";

import * as styles from "./route.css";

import { ClientOnly } from "remix-utils/client-only";
import Chart from "~/features/neuron/ui/Chart/Chart.client";

export const meta: MetaFunction = () => {
  return [
    { title: "데이터 베이스 신호 전달 시각화" },
    {
      name: "description",
      content: "데이터 베이스 신호 전달 과정을 시각화한 페이지",
    },
  ];
};

export default function Neuron() {
  return (
    <div className={styles.page}>
      <select name="mother" id="  ">
        <option value="mysql">릴리화이트</option>
        <option value="postgresql">아잔틱</option>
        <option value="mongodb">굳</option>
      </select>
      <select name="father" id="father">
        <option value="mysql">릴리화이트</option>
        <option value="postgresql">아잔틱</option>
        <option value="mongodb">굳</option>
      </select>
      <ClientOnly>{() => <Chart width={500} height={500} />}</ClientOnly>
    </div>
  );
}
