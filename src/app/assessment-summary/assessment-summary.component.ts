import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from "chart.js";
import {Label} from "ng2-charts";
import {AssessmentService} from "../assessment.service";
import {ActivatedRoute} from "@angular/router";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-assessment-summary',
  templateUrl: './assessment-summary.component.html',
  styleUrls: ['./assessment-summary.component.scss']
})
export class AssessmentSummaryComponent implements OnInit, AfterContentInit {

  currentAssessmentId: number;
  dataLoaded: boolean = false;

  constructor(
    private assessmentService: AssessmentService,
    private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
  ) {
    this.currentAssessmentId = <number><unknown>this.route.snapshot.paramMap.get('id');

  }
  public pieChartPlugins = [{
    beforeDraw(chart, easing) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const top = chartArea.top; // Use a value of 0 here to include the legend

      ctx.save();
      ctx.fillStyle = 'white';

      ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, chartArea.bottom - top);
      ctx.restore();
    }
  }];
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    tooltips : {
      callbacks: {
        label(tooltipItem: Chart.ChartTooltipItem, data: Chart.ChartData): string | string[] {
          let auxLabel = data.datasets[tooltipItem.datasetIndex].label;
          let auxValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          if( auxValue > 0 && auxValue <= 2) {
            auxLabel = 'Novato';
          }
          if( auxValue > 2 && auxValue <= 4) {
            auxLabel = 'Principiante';
          }
          if( auxValue > 4 && auxValue <= 6) {
            auxLabel = 'Competente';
          }
          if( auxValue > 6 && auxValue <= 8) {
            auxLabel = 'Profesional';
          }
          if( auxValue > 8 && auxValue <= 10) {
            auxLabel = 'Experto';
          }
          return auxLabel;
        }
      }
    }
  };
  public radarChartLabels: Label[] = [];

  public radarChartData:ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';

  ngAfterContentInit(): void {
    this.assessmentService.getAssessmentSummary(this.currentAssessmentId).subscribe(value => {
      this.radarChartLabels = value.categoryLabels;
      this.radarChartData = [
        { data: value.data, label: value.label, backgroundColor: 'rgba(135,13, 29, .6)', borderColor: 'rgb(135, 13, 29)'}
      ];
    });
    this.dataLoaded = true;
    document.getElementById('fb_share').setAttribute('data-href', location.href);
  }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  downloadCanvas(event) {
    // get the `<a>` element from click event
    var anchor = event.target;
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL('image/png', 0.8);
    // set the anchors 'download' attibute (name of the file to be downloaded)
    anchor.download = "dojo-assessment-results-summary.png";
  }

  openBottomSheet(event){
    this._bottomSheet.open(BottomSheetOverviewSheet);
  }
}
@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetOverviewSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
