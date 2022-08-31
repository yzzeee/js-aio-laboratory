/* eslint-disable array-element-newline */
import { Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps } from 'recharts';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  flex-grow: 1;
  height: ${props => props.height};
  position: relative;

  h3 {
    color: gray;
    float: right;
    position: absolute;
    right: 15px;
    top: 15px;
    font-weight: lighter;
    font-size: 1rem;
  }
`;

interface SynchronizedAreaChartProps {
  syncId?: string | undefined;
  data: Array<any>;
  metricType?: string | undefined;
  xPvt: string;
  yPvts: Array<string>;
  height?: number | string | undefined;
  strokeDasharray?: string | undefined;
  storkColors?: Array<string> | undefined;
  fillColors?: Array<string> | undefined;
  xRange?: XAxisProps['domain'];
  yRange?: YAxisProps['domain'];
}

const defaultStorkColors = [
  '#6dbfdd', '#A500A5', '#907773',
  '#007aff', '#ff5d4d', '#7a8331',
  '#b36496', '#f27860', '#797cc2',
  '#00b9b1', '#ff9600', '#66b974',
];

const defaultFillColors = [
  '#6dbfdd', '#A500A5', '#907773',
  '#007aff', '#ff5d4d', '#7a8331',
  '#b36496', '#f27860', '#797cc2',
  '#00b9b1', '#ff9600', '#66b974',
];

const SynchronizedAreaChart: React.FC<SynchronizedAreaChartProps> = props => {
  const {
    syncId = 'anyId',
    data,
    xPvt,
    yPvts,
    height = '300px',
    strokeDasharray = '3 3',
    storkColors = defaultStorkColors,
    fillColors = defaultFillColors,
    xRange,
    yRange,
  } = props;
  const dateFormatter = date => new Date(date).toDateString();
  return (
    <StyledDiv height={height}>
      <h3>Bps</h3>
      <ResponsiveContainer debounce={1000}>
        <AreaChart data={data}
                   syncId={syncId}
                   margin={{
            top: 10,
            right: 30,
            left: 8,
            bottom: 0,
          }}>
          <CartesianGrid strokeDasharray={strokeDasharray}/>
          <XAxis dataKey={xPvt} domain={xRange} tickFormatter={dateFormatter}/>
          <YAxis domain={yRange}/>
          <Tooltip/>
          {yPvts.map((yPvt: string, index: number) => (
              <Area key={`inarea-${index}`}
                    dataKey={yPvt}
                    fill={fillColors[index]}
                    fillOpacity={0.1}
                    stroke={storkColors[index]}
                    type="monotone"/>
            ))}
        </AreaChart>
      </ResponsiveContainer>
    </StyledDiv>
  );
};

export default SynchronizedAreaChart;
