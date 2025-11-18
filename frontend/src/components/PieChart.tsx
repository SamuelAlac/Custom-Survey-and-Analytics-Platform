import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export const PieChart = ({ mcq }: { mcq: any }) =>{
  const labels = mcq?.question_choices?.map((choice: any) => choice?.text)
  const answerCounts = labels?.map((label: string) =>
    mcq?.answers?.filter((a: any) => a?.answer === label).length
  );

  const totalResponses = answerCounts?.reduce((acc: number, count: number) => acc + count, 0) || 1

  const data = {
    labels,
    datasets: [
      {
        data: answerCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    tooltip: {
    callbacks: {
      label: function (context) {
        const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0)
        const value = context.parsed
        const percentage = ((value / total) * 100).toFixed(1);
        return `${context.label}: ${value} (${percentage}%)`
      },
    },
    },
      datalabels: {
        formatter: (value: number) => {
          if (value === 0) return ''
          const percentage = ((value / totalResponses) * 100).toFixed(1)
          return `${value} (${percentage}%)`
        },
        font: {
          weight: 'bold',
          size: 12,
        },
      },
    },
  };

  return <Pie data={data} options={options} />
}
