"use client";

import { motion } from "framer-motion";

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  valueFormatter?: (v: number) => string;
}

export function LineChart({
  data,
  height = 260,
  color = "var(--primary)",
  valueFormatter = (v) => v.toString(),
}: LineChartProps) {
  const width = 800;
  const padding = { top: 24, right: 16, bottom: 28, left: 16 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = chartW / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding.left + i * stepX;
    const y = padding.top + chartH - ((d.value - min) / range) * chartH;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + chartH
  } L ${points[0].x} ${padding.top + chartH} Z`;

  // gridlines
  const gridLines = 4;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {Array.from({ length: gridLines }).map((_, i) => {
          const y = padding.top + (chartH / (gridLines - 1)) * i;
          return (
            <line
              key={i}
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          );
        })}

        <motion.path
          d={areaPath}
          fill="url(#line-chart-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {points.map((p, i) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.04 }}
          >
            <circle cx={p.x} cy={p.y} r={3.5} fill="var(--card)" stroke={color} strokeWidth={2} />
            <text
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={11}
            >
              {p.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
