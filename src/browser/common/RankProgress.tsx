import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useReplicant, useTeams } from '../hooks/nodecg'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
)

type RankProgressProps = {
  all?: boolean;
}

export const RankProgress = ({ all }: RankProgressProps) => {
  const progress = useReplicant('rank-progress');

  const sliced = all ? progress : progress.slice(-5);
  const teams = useTeams();

  const data = {
    labels: sliced.map((p) => p.label).reverse(),
    datasets: teams.map((t, tIndex) => ({
      label: t.name,
      data: sliced.map(p => p.ranks[tIndex]).reverse(),
      borderColor: t.color,
      backgroundColor: t.color,
    }))
  }

  return (
    <Line data={data} options={{
      elements: {
        line: {
          borderWidth: 8,
        },
        point: {
          radius: 12,
        }
      },
      scales: {
        x: {
          // reverse: true,
          grid: {
            lineWidth: 4,
          },
          ticks: {
            align: 'end',
            color: '#000000',
            font: {
              family: '\'corporate-logo-ver2\', sans-serif',
              size: 18,
            },
            // minRotation: 90,
            padding: 10,
          },
        },
        y: {
          display: false,
          reverse: true,
          ticks: {
            stepSize: 1,
          },
        }
      }
    }} />
  )
}