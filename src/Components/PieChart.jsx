import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({params}) {
  return (
    <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
    <h2>Total Events</h2>
    
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
        width={650}
        height={400}
      />
      
    </div>
  );
}