import Charts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import SynchronizedAreaChart from '../component/chart/areachart/SyncronizedAreaChart';

const data = [
  {
    name: new Date(),
    uv: 4000,
    pv: 2400,
    amt: 2400,
    a: 1500,
    b: 2500,
    c: 3500,
    d: 4500,
    e: 5500,
    f: 6500,
    g: 7500,
    h: 8500,
    i: 9500,
    j: 1500,
  },
  {
    name: new Date(),
    uv: 3000,
    pv: 1398,
    amt: 2210,
    a: 500,
    b: 1500,
    c: 1500,
    d: 2500,
    e: 3500,
    f: 4500,
    g: 2500,
    h: 3500,
    i: 6500,
    j: 1500,
  },
  {
    name: new Date(),
    uv: 2000,
    pv: 1398,
    amt: 2210,
    a: 1030,
    b: 2030,
    c: 3030,
    d: 4030,
    e: 5030,
    f: 6030,
    g: 7030,
    h: 8030,
    i: 9030,
    j: 1030,
  },
  {
    name: new Date(),
    uv: 2780,
    pv: 3908,
    amt: 2000,
    a: 1700,
    b: 2700,
    c: 3700,
    d: 4700,
    e: 5700,
    f: 6700,
    g: 7700,
    h: 8700,
    i: 9700,
    j: 1700,
  },
  {
    name: new Date(),
    uv: 1890,
    pv: 4800,
    amt: 2181,
    a: 1005,
    b: 2005,
    c: 3005,
    d: 4005,
    e: 5005,
    f: 6005,
    g: 7005,
    h: 8005,
    i: 9005,
    j: 1005,
  },
  {
    name: new Date(),
    uv: 2390,
    pv: 3800,
    amt: 2500,
    a: 1000,
    b: 2000,
    c: 3000,
    d: 4000,
    e: 5000,
    f: 6000,
    g: 7000,
    h: 8000,
    i: 9000,
    j: 1000,
  },
  {
    name: new Date(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
    a: 1000,
    b: 2000,
    c: 3000,
    d: 4000,
    e: 5000,
    f: 6000,
    g: 7000,
    h: 8000,
    i: 9000,
    j: 1000,
  },
];

const series = [
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41],
  },
  {
    name: 'series2',
    data: [1, 3, 4, 3, 3, 5, 4],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series2',
    data: [10, 30, 40, 30, 30, 50, 40],
  },
  {
    name: 'series6',
    data: [100, 300, 400, 300, 300, 500, 400],
  },
];

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'area',
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z'],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
};

export default function ChartPage() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <SynchronizedAreaChart data={data} syncId="test" xPvt="name" yPvts={['amt', 'uv']}/>
      <Charts height={350} options={options} series={series} type="area"/>
    </div>
  );
}
