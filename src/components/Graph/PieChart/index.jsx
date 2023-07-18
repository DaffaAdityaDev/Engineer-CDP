import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';


function PieChartDistribution({ positive, negative, neutral, relevant }) {
    

    const data = [
        { name: 'Positive', value: positive, color: '#96e072' },
        { name: 'Negative', value: negative, color: '#da2c38' },
        { name: 'Neutral', value: neutral, color: '#808080' },  
    ]

    if (relevant) {
        data.push({ name: 'Relevant', value: relevant, color: '#8080ff' })
    }
    
    return (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                return (
                    <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    >
                    {`${(percent * 100).toFixed(0)}%`}
                    </text>
                );
                }}
            >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
            <Legend verticalAlign="bottom" />
        </PieChart>
    </ResponsiveContainer>
    )
}

export default PieChartDistribution