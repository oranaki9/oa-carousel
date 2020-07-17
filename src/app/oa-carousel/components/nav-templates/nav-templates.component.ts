import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

@Component({
  templateUrl: './nav-templates.component.html',
  styleUrls: ['./nav-templates.component.less']
})
export class NavTemplatesComponent implements OnInit {
  @ViewChild('primaryArrowsNavigation', { static: true }) primaryArrow: TemplateRef<any>;
  @ViewChild('wordsNavigation', { static: true }) wordsNavigation: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
