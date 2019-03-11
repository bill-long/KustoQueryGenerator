import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scenario: string;
  date: Date;
  time: { hour: number; minute: number; }
  minutes: number;
  correlationId: string;
  output: string;

  constructor() { }

  ngOnInit() {
  }

  generate() {
    if (this.scenario === 'MSODS by Correlation/Tracking ID') {
      this.output =
        `let start = datetime("${this.date}")` +
        `let end = start + ${this.minutes}m\n` +
        `let trackingid = "${this.correlationId}"\n` +
        `let TrackingView =
        find in (GlobalIfxUlsEvents) where env_time >= start and env_time <= end and correlationId == trackingid;
        let CIDs = toscalar(TrackingView | summarize makeset(internalCorrelationId));
        find in (GlobalIfxUlsEvents) where env_time >= start and env_time <= end and internalCorrelationId in (CIDs)
        | sort by env_time asc
        | project env_time, env_cloud_role,correlationId,contextId,internalCorrelationId,tagId,message
        `
    }
    
  }

}
