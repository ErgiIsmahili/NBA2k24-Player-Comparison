import React from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const ApexChart: React.FC<ApexChartProps> = ({ series, categories }) => {
  return (
    <div>
      <div id="chart">
        <DynamicApexChart
          options={{
            chart: {
              height: 400,
              type: 'radar',
            },
            dataLabels: {
              enabled: true,
            },
            plotOptions: {
              radar: {
                size: 140,
                polygons: {
                  strokeColors: '#e9e9e9',
                  fill: {
                    colors: ['#f8f8f8'],
                  },
                },
              },
            },
            title: {
              text: 'Radar with Polygon Fill',
            },
            colors: ['#000'],
            markers: {
              size: 4,
              colors: ['#fff'],
              strokeColors: '#000',
              strokeWidth: 2,
            },
            tooltip: {
              y: {
                formatter: (val: number) => val.toString(),
              },
            },
            xaxis: {
              categories,
            },
            yaxis: {
                min: 0,
                max: 10,
                labels: {
                    formatter: (val: number) => (val !== undefined ? '' : ''),
                },
              },
          }}
          series={series}
          type="radar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
