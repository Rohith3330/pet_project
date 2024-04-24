import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({params}) {
  return (
    <PieChart
      series={[
        {
          data: [...params],
          innerRadius: 50,
          outerRadius: 100,
          paddingAngle: 1,
          cornerRadius: 4,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
      width={400}
      height={400}
    />
  );
}