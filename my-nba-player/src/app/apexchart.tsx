import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartState {
    series: {
      name: string;
      data: number[];
    }[];
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
        labels: {
          formatter: (val: number, i: number) => string;
        };
      };
    };
  }
  
  class ApexChart extends React.Component<any, ApexChartState> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        series: [{
          name: 'Series 1',
          data: [20, 100, 40, 30, 50, 80, 33],
        }],
        options: {
          chart: {
            height: 350,
            type: 'radar',
          },
          dataLabels: {
            enabled: true
          },
          plotOptions: {
            radar: {
              size: 140,
              polygons: {
                strokeColors: '#e9e9e9',
                fill: {
                  colors: ['#f8f8f8', '#fff']
                }
              }
            }
          },
          title: {
            text: 'Radar with Polygon Fill'
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
              formatter: (val: number) => val.toString()
            }
          },
          xaxis: {
            categories: ['Overall', 'Inside Scoring', 'Outside Scoring', 'Atleticism', 'Playmaking', 'Rebounding', 'Defense']
          },
          yaxis: {
            labels: {
              formatter: (val: number, i: number) => {
                if (i % 2 === 0) {
                  return val.toString();
                } else {
                  return '';
                }
              }
            }
          }
        }
      };
    }
  
    render() {
      return (
        <div>
          <div id="chart">
            {/* Assuming you have imported ReactApexChart */}
            <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={350} />
          </div>
          <div id="html-dist"></div>
        </div>
      );
    }
  }
  
  export default ApexChart;
  