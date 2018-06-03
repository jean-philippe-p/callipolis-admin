import { Component, OnInit, DoCheck } from '@angular/core';
import { Service, SubService } from '../service';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../generic.service';

import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.css']
})
export class SubServiceComponent implements OnInit, DoCheck {

  private currentId;
  public model: SubService;
  public form: FormGroup;
  public enable: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private genericService: GenericService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logo: null
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('sub-id')) {
      this.currentId = +this.route.snapshot.paramMap.get('sub-id');
      this.genericService.getResource('SubService', this.currentId).subscribe(subService => {
        this.model = subService;
      });
    } else {
      this.model = new SubService();
      this.model.mainService = +this.route.snapshot.paramMap.get('id');
    }
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.has('sub-id')) {
      const id = +this.route.snapshot.paramMap.get('sub-id');
      if (this.currentId !== id) {
        this.currentId = id;
        this.genericService.getResource('SubService', this.currentId).subscribe(subService => {
          this.model = subService;
        });
      }
    }
  }

  uploadLogo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('logo').setValue(file);

      const formData = new FormData();
      formData.append('logo', this.form.get('logo').value);

      this.enable = false;
      this.serviceService.uploadLogo(formData).subscribe(response => {
        this.model.logo = response.id;
        this.enable = true;
      });
    }
  }

  onSubmit() {
    let route = typeof this.model.id === 'undefined';
    this.enable = false;
    this.genericService.setResource('SubService', this.model).subscribe(subService => {
      this.enable = true;
      alert('sauvegarde effectuée');
      if (route) {
        this.serviceService.getNavBarElements().subscribe(res => {
          this.router.navigate(['/services/' + this.route.snapshot.paramMap.get('id') + '/sub-services/' + this.model.id]);
        });
      }
    });
  }

  delete() {
    this.enable = false;
    const obj = new SubService();
    obj.id = this.model.id;
    obj.available = false;
    this.genericService.setResource('SubService', obj).subscribe(mainService => {
      this.enable = true;
      alert('suppression effectuée');
      this.serviceService.getNavBarElements().subscribe(res => {this.router.navigate(['/home']);});
    });
  }

  getLogoUrl(): string {
    return this.serviceService.getLogoUrl(this.model.logo);
  }

  trackByFn(index: any, item: any) {
     return index;
  }

}
