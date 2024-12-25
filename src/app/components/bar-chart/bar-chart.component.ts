import { Component, Input, OnChanges } from '@angular/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxEchartsModule], // وارد کردن ماژول
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts: () => import('echarts'), // بارگذاری داینامیک ECharts
      },
    },
  ],
})
export class BarChartComponent implements OnChanges {
  @Input() chartData: { userId: number; averageCharacters: number }[] = [];

  chartOption: any;

  ngOnChanges(): void {
    if (this.chartData.length) {
      this.updateChartOptions();
    }
  }

  updateChartOptions(): void {
    this.chartOption = {
      title: {
        text: 'Average Comment Length by User',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: this.chartData.map((d) => `User ${d.userId}`),
      },
      yAxis: {
        type: 'value',
        name: 'Average Length',
      },
      series: [
        {
          name: 'Average Comment Length',
          type: 'bar',
          data: this.chartData.map((d) => d.averageCharacters),
          itemStyle: {
            color: '#42A5F5',
          },
        },
      ],
    };
  }
}
