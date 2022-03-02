import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {baseControlInterface} from "../../servicios/interfaces/base-control.interface";

@Component({
  selector: 'app-base-control',
  templateUrl: './base-control.component.html',
  styleUrls: ['./base-control.component.scss']
})
export class BaseControlComponent implements OnInit {

  @Input()
  formGroup = new FormGroup({})

  @Input()
  size = "24px"

  @Input()
  color = "black"

  @Input()
  campos: baseControlInterface[] = [] as baseControlInterface[]

  constructor() { }

  ngOnInit(): void {
  }

}
