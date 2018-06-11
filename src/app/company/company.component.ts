import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

    public model: Company = new Company();
    public enable: boolean = true;

  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.genericService.getResource('Company', 1).subscribe(company => {
      this.model = company;
      if (!this.model.mainTowns) {
        this.model.mainTowns = [];
      }
    });
  }

  onSubmit() {
    this.enable = false;
    this.genericService.setResource('Company', this.model).subscribe(company => {
      this.enable = true;
      alert('sauvegarde effectuée');
    });
  }

  trackByFn(index: any, item: any) {
     return index;
  }

}
