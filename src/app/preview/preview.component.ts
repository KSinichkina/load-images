import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'preview',
  styleUrls: ['./preview.component.scss'],
  templateUrl: './preview.component.html'
})

export class PreviewComponent {
  private id: number;
  private src: string;
  private tooltip: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  private ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.src = params['src'];
      this.tooltip = params['tooltip'];
    });
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
