import { Component, OnInit, DoCheck } from '@angular/core';
import { BlogArticle } from '../blogArticle';
import { BlogArticleElement } from '../blogArticleElement';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../generic.service';

import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css']
})
export class BlogArticleComponent implements OnInit {

  private currentId;
  public model: BlogArticle;
  public form: FormGroup;
  public enable: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public serviceService: ServiceService,
    private fb: FormBuilder,
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
      this.genericService.getResource('BlogArticle', this.currentId).subscribe(blogArticle => {
        this.model = blogArticle;
      });
    } else {
      this.model = new BlogArticle();
    }
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = +this.route.snapshot.paramMap.get('id');
      if (this.currentId !== id) {
        this.currentId = id;
        this.genericService.getResource('BlogArticle', this.currentId).subscribe(blogArticle => {
          this.model = blogArticle;
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
        this.model.image = response.id;
        this.enable = true;
      });
    }
  }

  onSubmit() {
    let route = typeof this.model.id === 'undefined';
    for (let i = 0; i < this.model.blogArticleElements.length; i++) {
      this.model.blogArticleElements[i] = this.model.blogArticleElements[i];
    }
    this.enable = false;
    this.genericService.setResource('BlogArticle', this.model).subscribe(blogArticle => {
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
    alert('suppression non disponible');
  }

  getLogoUrl(): string {
    return this.genericService.getImageUrl(this.model.image);
  }

}
