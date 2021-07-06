import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ScheduleService } from 'src/health/shared/services/schedule.service';
import { Store } from 'src/store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">

      <schedule-calendar
        [date]="date$ | async"
        (change)="changeDate($event)">
      </schedule-calendar>

    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) { }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
