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
  public age: number;
  private isWeaning: boolean = false;
  private dataFound =  false;
  private takeoffMach = false;
  private MinRespRate: number;
  private MaxRespRate: number;
  private MinHeartRate: number;
  private MaxHeartRate: number;
  private MinPacO2: number;
  private MaxPacO2: number;
  private MinSaO2: number;
  private MaxSaO2: number;
  private MinSpO2: number;
  private MaxSpO2: number;
  private MinHcO3: number;
  private MaxHcO3: number;
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


      size: {
           width : 640,
           height : 480
      },
      grid: {
        y: {
          lines: [{ value: this.MaxHeartRate, text: 'This color shows the normal range of Heart rate' },
                  { value: this.MaxRespRate, text: 'This color shows the normal range of Resp rate' },
                  { value: this.MaxPacO2, text: 'This color shows the normal range of PaCO2' },
                  { value: this.MaxSaO2, text: 'This color shows the normal range of SaO2'  },
                  { value: this.MaxSpO2, text: 'This color shows the normal range of SpO2'  },
                  { value: this.MaxHcO3, text: 'This color shows the normal range of HcO3'  }
          ]
        }
      },


      regions: [
                  {axis: 'y', start: this.MinRespRate, end: this.MaxRespRate, class: 'regionX'},
                  {axis: 'y', start: this.MinHeartRate, end: this.MaxHeartRate, class: 'regionY'},
                  {axis: 'y', start: this.MinPacO2, end: this.MaxPacO2, class: 'regionZ'},
                  {axis: 'y', start: this.MinSaO2, end: this.MaxSaO2, class: 'regionX1'},
                  {axis: 'y', start: this.MinSpO2, end: this.MaxSpO2, class: 'regionY1'},
                  {axis: 'y', start: this.MinHcO3, end: this.MaxHcO3, class: 'regionZ1'}
      ],
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
    this.getPatientData(hospitalId).then((data: { healthParameters: any[], patientDetails: any }) => {
      this.dataFound = true
      data.healthParameters.forEach(item => {
        const time = new Date(+item.time);
        item.time = `${time.getFullYear()}-${this.getPadded(time.getMonth() + 1)}-${this.getPadded(time.getDate())} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        console.log(time, item.time)
      });
      this.age = data.patientDetails.age;
      this.getMinMaxValueOfAttributes();
      // const latestData: HealthParameter = data.healthParameters[0] || null;
      this.setWeaningParam(data.healthParameters)
      const chartData = this.generateChartData(data.healthParameters);
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
   
    if ((this.age > 0) && (this.age <= 0.25)) {
      this.MinRespRate = 30;
      this.MaxRespRate = 60;
      this.MinHeartRate = 107;
      this.MaxHeartRate = 181;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;

    }
    else if ((this.age > 0.25) && (this.age <= 1)) {
      this.MinRespRate = 30;
      this.MaxRespRate = 60;
      this.MinHeartRate = 90;
      this.MaxHeartRate = 160;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;
    }
    else if ((this.age > 1) && (this.age <= 2)) {
      this.MinRespRate = 22;
      this.MaxRespRate = 37;
      this.MinHeartRate = 80;
      this.MaxHeartRate = 120;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;
    }
    else if ((this.age >= 3) && (this.age <= 5)) {
      this.MinRespRate = 20;
      this.MaxRespRate = 28;
      this.MinHeartRate = 65;
      this.MaxHeartRate = 100;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;
    }
    else if ((this.age >= 6) && (this.age <= 11)) {
      this.MinRespRate = 18;
      this.MaxRespRate = 25;
      this.MinHeartRate = 58;
      this.MaxHeartRate = 90;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;
    }
    else if ((this.age >= 12) && (this.age <= 15)) {
      this.MinRespRate = 12;
      this.MaxRespRate = 20;
      this.MinHeartRate = 50;
      this.MaxHeartRate = 90;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;
    }
    else
    {
      this.MinRespRate = 12;
      this.MaxRespRate = 20;
      this.MinHeartRate = 60;
      this.MaxHeartRate = 100;
      this.MinPacO2 = 38;
      this.MaxPacO2 = 42;
      this.MinSaO2 = 94;
      this.MaxSaO2 = 100;
      this.MinSpO2 = 92;
      this.MaxSpO2 = 100;
      this.MinHcO3 = 22;
      this.MaxHcO3 = 28;
    }
  }
           //   console.log(isWeaning);


  setWeaningParam(healthParameterArray)
  {
    for (var j = 0; j < healthParameterArray.length; j++){
      if(j > 2){
        break
      }
      if (((healthParameterArray[j].respiratoryRate >= this.MinRespRate) && (healthParameterArray[j].respiratoryRate<=this.MaxRespRate)
            && (healthParameterArray[j].heartRate >= this.MinHeartRate ) && (healthParameterArray[j].heartRate <= this.MaxHeartRate)) || (healthParameterArray[j].sponBreath >0))
      {
        this.isWeaning = true;
      }

      if (healthParameterArray[j].imv == 0)
      {
      this.takeoffMach = true;
    }
  }
//  console.log(this.isWeaning);

}





}


export interface HealthParameter {
  hospitalId: number;
  respiratoryRate: number;
  heartRate: number;
  imv: number;
  sponBreath: number;
  paCo2: number;
  hCo3: number;
  spO2: number;
  saO2: number;
  time: string;
}
