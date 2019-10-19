import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

import { YoutubeService } from './youtube.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  // videos: object[] = [];
  videos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  // videos$: Observable<any[]>;
  constructor(
    private youtubeService: YoutubeService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    // this.videos = [];
    /*
    this.youtubeService
      .getVideoFromChannel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista['items']) {
          this.videos.push(element);
        }
      });*/
    /*
    this.youtubeService
      .getVideoFromChannel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lista) => {
        this.videos = lista;
        console.log(lista);
      });*/
    this.youtubeService
      .getVideoFromChannel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lista) => {
        this.videos$.next(lista);
      });

    // this.videos$ = this.youtubeService.getVideoFromChannel('UC_LtA_EtCr7Jp5ofOsYt18g', 15);

  }

  ngOnDestroy() {
    this.videos$.unsubscribe();
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
