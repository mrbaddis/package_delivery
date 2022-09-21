import { Component, Input, OnInit } from '@angular/core';
import { CourierPackage } from 'app/shared/sdk';

@Component({
  selector: 'ngx-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss']
})
export class PackageItemComponent implements OnInit {
  @Input() package: CourierPackage;
  constructor() { }

  ngOnInit(): void {
  }

}
