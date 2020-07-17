import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'oa-carousel';
  images: string[] = ["https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_960_720.jpg", "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_960_720.jpg", "https://cdn.pixabay.com/photo/2017/10/18/16/08/wolf-2864647_960_720.jpg"];

}
