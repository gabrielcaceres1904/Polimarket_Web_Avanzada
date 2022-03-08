import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-home-box',
  templateUrl: './admin-home-box.component.html',
  styleUrls: ['./admin-home-box.component.scss']
})
export class AdminHomeBoxComponent implements OnInit {

  @Input()
  box =  {
    titulo: '',
    icon: '',
    value: -1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
