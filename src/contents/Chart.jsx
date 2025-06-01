import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useRef } from 'react'
ChartJS.register(ArcElement, Tooltip, Legend)
export default function Chart({ score = 0 }) {
    const chartRef = useRef(null)
     useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [score])
    const data = {
        labels: ['Score', 'Remaining'],
        datasets: [
            {
                data: [score, Math.max(0, 100 - score)],
                backgroundColor: ['#3B82F6', '#e0e0e0'],
                cutout: '70%',
            }
        ]
    };
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart
            ctx.save();
            const fontSize = (height / 100).toFixed(2)
            ctx.font = `${fontSize}em sans-serif`
            ctx.textBaseline = 'middle'
            ctx.textAlign = 'center'
            ctx.fillStyle = '#333'
            const formattedScore = Number(score).toFixed(2)
            const text = `${formattedScore}%`
            const x = width / 2;
            const y = height / 2;
            ctx.fillText(text, x, y)
            ctx.restore();
        }
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
    };
    return <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />;
}
