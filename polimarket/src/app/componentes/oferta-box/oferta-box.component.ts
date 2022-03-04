import {Component, Input, OnInit} from '@angular/core';
import {OfertaBoxInterface} from "../../servicios/interfaces/app/oferta-box.interface";

@Component({
  selector: 'app-oferta-box',
  templateUrl: './oferta-box.component.html',
  styleUrls: ['./oferta-box.component.scss']
})
export class OfertaBoxComponent implements OnInit {

  @Input()
  formatoOferta: OfertaBoxInterface = {} as OfertaBoxInterface

  constructor() { }

  ngOnInit(): void {
  }

}
