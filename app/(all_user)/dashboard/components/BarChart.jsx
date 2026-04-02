"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarChart() {
  const isDark = typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false;

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['1', '5', '10', '15', '20', '25', '30'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: isDark ? '#a1a1aa' : '#71717a', // neutral-400 or neutral-500
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#a1a1aa' : '#71717a',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: isDark ? '#262626' : '#f4f4f5',
      strokeDashArray: 4,
      yaxis: {
        lines: { show: true }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#3b82f6'] // blue-500
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return val + " ฟอร์ม"
        }
      }
    }
  };

  const series = [{
    name: 'สถิติฟอร์ม',
    data: [40, 70, 45, 90, 65, 85, 120]
  }];

  return (
    <div className="w-full h-full min-h-[200px]">
      <ApexChart options={options} series={series} type="bar" height="100%" width="100%" />
    </div>
  );
}
