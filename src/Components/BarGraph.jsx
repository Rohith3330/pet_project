import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Events',
    },
  ],
  width: 800,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(0, 0)',
    },
  },
};
const valueFormatter = (value) => `${value} events`;

export default function BarsDataset({users,params}) {
    const userList=[...users]
    let series=[];
    userList.forEach((e)=>{
        series.push({ dataKey: e, label: e, valueFormatter })
    })

  return (
    <div>
    <h2>Number of Events per month:</h2>
    <BarChart
      dataset={[...params]}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[...series]}
      {...chartSetting}
    />
    </div>
  );
}
