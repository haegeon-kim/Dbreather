interface ParticleType {
  x: number;
  y: number;
  color: string;
  directionAngle: number;
  vector: { x: number; y: number };
  draw: (ctx: CanvasRenderingContext2D) => void;
}

// 파티클 클래스 구현
export class Particle implements ParticleType {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  directionAngle: number;
  vector: { x: number; y: number };

  constructor(w: number, h: number, color: string) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.width = 100; // 가로 100으로 고정
    this.height = 60; // 세로 60으로 고정
    this.color = color;
    this.directionAngle = Math.floor(Math.random() * 360);

    // 방향 벡터 계산
    this.vector = {
      x: Math.cos((this.directionAngle * Math.PI) / 180) * 1,
      y: Math.sin((this.directionAngle * Math.PI) / 180) * 1,
    };
  }

  update() {
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
