import { Component } from '@angular/core';
import { TicketReportComponent } from '../ticket-report/ticket-report.component';


@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [TicketReportComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

}
