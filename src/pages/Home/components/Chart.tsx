import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = {
  labels: [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ],
  datasets: [
    {
      label: "Total",
      data: [
        1200, 2100, 800, 1600, 900, 1700, 900, 900, 1900, 800, 1200, 1400, 900,
      ],
      backgroundColor: "#CDFCF6",
      borderColor: "#3699d3",
      borderWidth: 1,
      fill: true,
    },
  ],
};

interface Props {
  title: string;
}
export default function ChartComponent({ title }: Props) {
  const chartRef = useRef(null);
  const chartInstance: any = useRef(null); // Sử dụng ref để theo dõi biểu đồ

  useEffect(() => {
    if (chartRef.current) {
      // Hủy biểu đồ cũ nếu đã tồn tại
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Tạo biểu đồ mới
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: data,
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="w-2/3">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
