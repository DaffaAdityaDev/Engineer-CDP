import React from 'react'
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

function BrushBarChart({ data, dataKey, xAxis, yAxis }) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ fontSize: 12 }} />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ lineHeight: '40px', fontSize: 12 }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="sentiment" height={30} stroke="#8884d8" />
        {dataKey.map((item, index) => (
          <Bar
            key={index}
            dataKey={item.name}
            fill={item.color}
            radius={[8, 8, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
    )
}

export default BrushBarChart