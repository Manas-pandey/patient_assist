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
  public age:number;
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
    this.getPatientData(hospitalId).then((data: { healthParameters: any[] , patientDetails: any}) => {
      data.healthParameters.forEach(item => {
        const time = new Date(+item.time);
        item.time = `${time.getFullYear()}-${this.getPadded(time.getMonth() + 1)}-${this.getPadded(time.getDate())} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        console.log(time, item.time)
      });
      const chartData = this.generateChartData(data.healthParameters);
      this.age = data.patientDetails.age;
      this.getMinMaxValueOfAttributes();

      // console.log(data.patientDetails.age)
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


  getMinMaxValueOfAttributes() {
    var MinRespRate;
    var MaxRespRate;
    var MinHeartRate;
    var MaxHeartRate;
    var MinPacO2;
    var MaxPacO2;
    var MinSaO2;
    var MaxSaO2;
    var MinSpO2;
    var MaxSpO2;
    var MinHcO3;
    var MaxHcO3;

  if ((this.age > 0) && (this.age <= 0.25))
  {
      MinRespRate = 30;
      MaxRespRate = 60;
      MinHeartRate = 107;
      MaxHeartRate = 181;
      MinPacO2 = 38;
      MaxPacO2 = 42;
      MinSaO2 = 94;
      MaxSaO2 = 100;
      MinSpO2 = 92;
      MaxSpO2 = 100;
      MinHcO3 = 22;
      MaxHcO3 = 28;



}

else if ((this.age > 0.25) && (this.age <= 1))
           {
               MinRespRate = 30;
               MaxRespRate = 60;
               MinHeartRate = 90;
               MaxHeartRate = 160;
               MinPacO2 = 38;
               MaxPacO2 = 42;
               MinSaO2 = 94;
               MaxSaO2 = 100;
               MinSpO2 = 92;
               MaxSpO2 = 100;
               MinHcO3 = 22;
               MaxHcO3 = 28;



         }

else if ((this.age > 1) && (this.age <= 2))
           {
               MinRespRate = 22;
               MaxRespRate = 37;
               MinHeartRate = 80;
               MaxHeartRate = 120;
               MinPacO2 = 38;
               MaxPacO2 = 42;
               MinSaO2 = 94;
               MaxSaO2 = 100;
               MinSpO2 = 92;
               MaxSpO2 = 100;
               MinHcO3 = 22;
               MaxHcO3 = 28;



         }


else if ((this.age >= 3) && (this.age <= 5))
           {
               MinRespRate = 20;
               MaxRespRate = 28;
               MinHeartRate = 65;
               MaxHeartRate = 100;
               MinPacO2 = 38;
               MaxPacO2 = 42;
               MinSaO2 = 94;
               MaxSaO2 = 100;
               MinSpO2 = 92;
               MaxSpO2 = 100;
               MinHcO3 = 22;
               MaxHcO3 = 28;



         }


else if ((this.age >= 6) && (this.age <= 11))
           {
               MinRespRate = 18;
               MaxRespRate = 25;
               MinHeartRate = 58;
               MaxHeartRate = 90;
               MinPacO2 = 38;
               MaxPacO2 = 42;
               MinSaO2 = 94;
               MaxSaO2 = 100;
               MinSpO2 = 92;
               MaxSpO2 = 100;
               MinHcO3 = 22;
               MaxHcO3 = 28;



         }

else if ((this.age >= 12) && (this.age <= 15))
           {
               MinRespRate = 12;
               MaxRespRate = 20;
               MinHeartRate = 50;
               MaxHeartRate = 90;
               MinPacO2 = 38;
               MaxPacO2 = 42;
               MinSaO2 = 94;
               MaxSaO2 = 100;
               MinSpO2 = 92;
               MaxSpO2 = 100;
               MinHcO3 = 22;
               MaxHcO3 = 28;



         }

else (this.age > 15)
{
               MinRespRate = 12;
               MaxRespRate = 20;
               MinHeartRate = 60;
               MaxHeartRate = 100;
               MinPacO2 = 38;
               MaxPacO2 = 42;
               MinSaO2 = 94;
               MaxSaO2 = 100;
               MinSpO2 = 92;
               MaxSpO2 = 100;
               MinHcO3 = 22;
               MaxHcO3 = 28;



         }
         }
