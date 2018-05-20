import { Component, OnInit, DoCheck } from '@angular/core';
import { Service } from '../service';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.css']
})
export class SubServiceComponent implements OnInit, DoCheck {

  private currentId;
  public model: Service;
  public form: FormGroup;
  public enable: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logo: null
    });
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.paramMap.get('sub-id');
    this.serviceService.getSubService(this.currentId).subscribe(subService => {
      this.model = subService;
    });
  }

  ngDoCheck() {
    const id = +this.route.snapshot.paramMap.get('sub-id');
    if (this.currentId !== id) {
      this.currentId = id;
      this.serviceService.getSubService(this.currentId).subscribe(subService => {
        this.model = subService;
      });
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
    this.enable = false;
    this.serviceService.setSubService(this.model).subscribe(subService => {
      this.enable = true;
      alert('sauvegarde effectuée');
    });
  }

  getLogoUrl(): string {
    return this.serviceService.getLogoUrl(this.model.logo);
  }

  trackByFn(index: any, item: any) {
     return index;
  }

}