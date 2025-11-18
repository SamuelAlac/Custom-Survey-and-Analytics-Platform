import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels, Title, Tooltip, Legend)

export const BarChart = ({ likert }: { likert: any }) =>{
  console.log(likert)
  const question_choices = likert?.question_choices
  const answerCounts = question_choices?.map((choice: any) =>
    likert?.answers?.filter((a: any) => a.answer === choice.text).length || 0
  )
  const totalResponses = answerCounts?.reduce((acc: number, count: number) => acc + count, 0) || 1
  const labels = question_choices?.map((choice: any) => choice?.text)

  console.log(likert?.answers)

  const backgroundColors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
  ];

  const datasets = [
    {
      label: "Responses",
      data: answerCounts,
      backgroundColor: backgroundColors,
    }
  ];

  const data = {
    labels,
    datasets,
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
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
      tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.raw as number
          const total = answerCounts?.reduce((sum: number, current: number) => sum + current, 0) || 1
          const percentage = ((value / total) * 100).toFixed(1)
          return `${value} (${percentage}%)`
        },
      },
    },
    },
  };

  return <Bar options={options} data={data} />
}