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
    const chartData = {
      data: {
        json: data,
        keys: {
          x: "time",
          value: this.values
        },
        type: "line",
        groups: []
      },
    grid: {
        y: {
            lines: [{value:50}]
        }
    },
      axis: {
        x: {
          type: "category"
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
    this.getPatientData(hospitalId).then((data: {hospitalId: string, heathParameters: any[]}) => {
      const chartData = this.generateChartData(data.heathParameters);
      if (this.chart) {
        this.chart.load({...chartData.data, unload: true})
      } else {
        console.log(chartData);
        this.chart = c3.generate(chartData);
      }
    })
    .catch(error => {
      console.log('Error: ', error);
    });
  }

}
