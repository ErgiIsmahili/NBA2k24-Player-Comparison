import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

interface ApexChartState {
  options: {
    chart: {
      height: number;
      type: 'radar';
    };
    dataLabels: {
      enabled: boolean;
    };
    plotOptions: {
      radar: {
        size: number;
        polygons: {
          strokeColors: string;
          fill: {
            colors: string[];
          };
        };
      };
    };
    title: {
      text: string;
    };
    colors: string[];
    markers: {
      size: number;
      colors: string[];
      strokeColor: string;
      strokeWidth: number;
    };
    tooltip: {
      y: {
        formatter: (val: number) => string;
      };
    };
    xaxis: {
      categories: string[];
    };
    yaxis: {
      min: number;
      max: number;
      labels: {
        formatter: (val: number, i: number) => string;
      };
    };
  };
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      options: {
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
                colors: ['#f8f8f8', '#fff'],
              },
            },
          },
        },
        title: {
          text: 'Radar with Polygon Fill',
        },
        colors: ['#FF4560'],
        markers: {
          size: 4,
          colors: ['#fff'],
          strokeColor: '#FF4560',
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: (val: number) => val.toString(),
          },
        },
        xaxis: {
          categories: props.categories,
        },
        yaxis: {
          min: 0,
          max: 100,
          labels: {
            formatter: (val: number, i: number) => (i % 2 === 0 ? val.toString() : ''),
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.props.series} type="radar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
