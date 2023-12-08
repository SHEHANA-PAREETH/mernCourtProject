import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJs} from 'chart.js/auto'
function Barchart({chartData}) {
  return (
    <div style={{width: '70%'}}>
<Bar data={chartData}  />
    </div>

  )
}

export default Barchart