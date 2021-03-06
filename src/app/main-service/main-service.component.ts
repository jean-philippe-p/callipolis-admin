import { Component, OnInit, DoCheck } from '@angular/core';
import { MainService } from '../service';
import { ServiceService } from '../service.service';
import { GenericService } from '../generic.service';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-service',
  templateUrl: './main-service.component.html',
  styleUrls: ['./main-service.component.css']
})
export class MainServiceComponent implements OnInit, DoCheck {

  public currentId;
  public model: MainService;
  public form: FormGroup;
  public enable: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private genericService: GenericService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logo: null
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.currentId = +this.route.snapshot.paramMap.get('id');
      this.genericService.getResource('MainService', this.currentId).subscribe(mainService => {
        this.model = mainService;
      });
    } else {
      this.model = new MainService();
      this.model.subServices = [];
    }
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = +this.route.snapshot.paramMap.get('id');
     if (this.currentId !== id) {
        this.currentId = id;
        this.genericService.getResource('MainService', this.currentId).subscribe(mainService => {
          this.model = mainService;
        });
      }
    }
  }

  uploadLogo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('logo').setValue(file);

      const formData = new FormData();
      formData.append('image', this.form.get('logo').value);

      this.enable = false;
      this.genericService.uploadImage(formData).subscribe(response => {
        this.model.logo = response.id;
        this.enable = true;
      });
    }
  }

  onSubmit() {
    let route = typeof this.model.id === 'undefined';
    this.enable = false;
    this.genericService.setResource('MainService', this.model).subscribe(mainService => {
      this.enable = true;
      alert('sauvegarde effectuée');
      if (route) {
        this.serviceService.getNavBarElements().subscribe(res => {
          this.router.navigate(['/services/' + this.model.id]);
        });
      }
    });
  }

  delete() {
    this.enable = false;
    const obj = new MainService();
    obj.id = this.model.id;
    obj.available = false;
    this.genericService.setResource('MainService', obj).subscribe(mainService => {
      this.enable = true;
      alert('suppression effectuée');
      this.serviceService.getNavBarElements().subscribe(res => {this.router.navigate(['/contacts']);});
    });
  }

  getLogoUrl(): string {
    return this.genericService.getImageUrl(this.model.logo);
  }

}
