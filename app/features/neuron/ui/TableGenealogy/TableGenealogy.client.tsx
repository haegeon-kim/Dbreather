import { useRef, useEffect } from "react";
import * as styles from "./TableGenealogy.css";
import { useQuery } from "@tanstack/react-query";
import { tableQueries } from "~/entities";
import { Particle } from "~/entities/table/ui/Particle";

export default function TableGenealogy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data } = useQuery({ ...tableQueries.tables() });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let time = 0; // 펄스 효과를 위한 시간 변수 추가

    let animationId: number | null = null;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const options = {
      particleColor: "rgba(255,255,255, 0.01)",
      lineColor: "rgba(255,255,255, 0.01)",
      particleAmount: 4,
      linkRadius: 300,
    };

    const rgb = options.lineColor.match(/\d+/g);

    // 화면 크기 조정 및 리셋

    // 거리 계산 함수
    function checkDistance(x1: number, y1: number, x2: number, y2: number) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // 파티클 간 연결선 그리기
    function linkPoints(point: Particle, hubs: Particle[]) {
      for (const hub of hubs) {
        if (!ctx) return;
        const distance = checkDistance(point.x, point.y, hub.x, hub.y);

        // 거리에 따른 기본 투명도 계산
        const baseOpacity = 1;

        // 펄스 효과를 위한 sine 파형 생성 (0.2~1.0 범위로 변화)
        const pulseAmount = 0.4; // 펄스 강도
        const pulseSpeed = 0.05; // 펄스 속도
        const pulseFactor =
          Math.sin(time * pulseSpeed) * pulseAmount + (1 - pulseAmount);

        // 최종 투명도 계산 (펄스 효과 적용)
        const opacity = Math.max(0, baseOpacity * pulseFactor);

        if (opacity > 0 && rgb) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(hub.x, hub.y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    // 파티클 간 연결선 그리기
    function drawLine() {
      for (const particle of particles) {
        linkPoints(particle, particles);
      }
    }

    // 파티클 그리기
    function drawParticle() {
      for (const particle of particles) {
        if (!ctx) return;
        particle.draw(ctx);
      }
    }

    // 전체 장면 그리기
    function drawScene() {
      drawLine();
      drawParticle();
    }

    // 애니메이션 루프
    function animationLoop() {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawScene();
      time += 1; // 매 프레임마다 시간 변수 증가
      animationId = requestAnimationFrame(animationLoop);
    }

    // 요소 초기화
    function initialiseElements() {
      particles = [];
      for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle(100, 100, options.particleColor));
      }
    }

    // 초기 설정 및 애니메이션 시작
    function init() {
      initialiseElements();
      animationId = requestAnimationFrame(animationLoop);
    }

    // 초기화
    init();

    // 클린업 함수
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [data]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
