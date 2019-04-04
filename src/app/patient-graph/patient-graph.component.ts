import { Component, OnInit } from '@angular/core';
import { HeathParameterServiceService } from '../heath-parameter-service.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-patient-graph',
  templateUrl: './patient-graph.component.html',
  styleUrls: ['./patient-graph.component.css']
})
export class PatientGraphComponent implements OnInit {
  private chart;
  public hospitalId;
  public values = [];
  constructor(private healthService: HeathParameterServiceService) { }

  ngOnInit() {
  }

  generateChartData(data) {
    this.values = Object.keys(data[0]).filter(key => key.toLowerCase() !== 'time');
    const chartData: c3.ChartConfiguration = {
      data: {
        json: data,
        keys: {
          x: "time",
          value: this.values
        },
        type: "line",
        groups: [],
        xFormat: '%Y-%m-%d %H:%M:%S'
      },
      grid: {
        y: {
          lines: [{ value: 50 }]
        }
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: '%Y-%m-%d %H:%M:%S'
          }
        }
      }
    }
    return chartData;
  }

  getPatientData(hospitalId) {
    return new Promise((resolve, reject) => {
      this.healthService.getHealthParameters(hospitalId).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  renderChart(hospitalId) {
    this.getPatientData(hospitalId).then((data: { healthParameters: any[] }) => {
      data.healthParameters.forEach(item => {
        const time = new Date(+item.time);
        item.time = `${time.getFullYear()}-${this.getPadded(time.getMonth() + 1)}-${this.getPadded(time.getDate())} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        console.log(time, item.time)
      });
      const chartData = this.generateChartData(data.healthParameters);
      if (this.chart) {
        this.chart.load({ ...chartData.data, unload: true })
      } else {
        console.log(chartData);
        this.chart = c3.generate(chartData);
      }
    })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  getPadded(date) {
    if (date < 10) {
      date = '0' + date;
    }
    return date;
  }

}
