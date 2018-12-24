import { Component, OnInit, DoCheck } from '@angular/core';
import { CarouselPart } from '../carousel-part';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../generic.service';
import * as $ from 'jquery';

import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, DoCheck {

  private currentId;
  public model: CarouselPart;
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
      image: null
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.currentId = +this.route.snapshot.paramMap.get('id');
      this.genericService.getResource('CarouselPart', this.currentId).subscribe(carouselPart => {
        this.model = carouselPart;
      });
    } else {
      this.model = new CarouselPart();
    }
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = +this.route.snapshot.paramMap.get('id');
      if (this.currentId !== id) {
        this.currentId = id;
        this.genericService.getResource('CarouselPart', this.currentId).subscribe(carouselPart => {
          this.model = carouselPart;
        });
      }
    }
  }

  uploadImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);

      const formData = new FormData();
      formData.append('image', this.form.get('image').value);

      this.enable = false;
      this.genericService.uploadImage(formData).subscribe(response => {
        this.model.image = response.id;
        this.enable = true;
      });
    }
  }

  onSubmit() {
    let route = typeof this.model.id === 'undefined';
    this.enable = false;
    this.genericService.setResource('CarouselPart', this.model).subscribe(carouselPart => {
      this.enable = true;
      alert('sauvegarde effectuée');
      if (route) {
        this.serviceService.getNavBarElements().subscribe(res => {
          this.router.navigate(['/carousel/' + this.model.id]);
        });
      }
    });
  }

  delete() {
    this.enable = false;
    this.genericService.deleteResource('CarouselPart', this.model.id).subscribe(res => {
      this.enable = true;
      alert('suppression effectuée');
      this.serviceService.getNavBarElements().subscribe(res => {this.router.navigate(['/contacts']);});
    });
  }

  getImageUrl(): string {
    return this.genericService.getImageUrl(this.model.image);
  }

  getFontSize() {
    return ($('#image-container').height() * 0.08) + 'px';
  }

}
