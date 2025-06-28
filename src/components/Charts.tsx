import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, LineController } from 'chart.js'
import 'chart.js/auto'

export default function Charts({
  data,
  date,
}: {
  data: { label: string; data: number[] }
  date: string[]
}) {
  ChartJS.register(LineController, Tooltip, Legend)
  console.log(data, 'data')
  return (
    <div className="w-[450px]">
      <Line
        datasetIdKey="id"
        data={{
          labels: date,
          datasets: [data],
        }}
      />
      {!data && <div>No data please move Back</div>}
    </div>
  )
}
