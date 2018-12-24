import { Component, OnInit, DoCheck } from '@angular/core';
import { BlogArticle } from '../blogArticle';
import { BlogArticleElement, BlogArticleChapter, BlogArticleImage } from '../blogArticleElement';
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
  public forms = {};
  public enable: boolean = false;
  public blogArticleElements: BlogArticleElement[] = [];

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
      image: null
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.currentId = +this.route.snapshot.paramMap.get('id');
      this.genericService.getResource('BlogArticle', this.currentId).subscribe(blogArticle => {
        this.model = blogArticle;

        this.genericService.getResources('BlogArticleElements', {parent:this.model.id}).subscribe(blogArticleElements => {
          for (let i = 0; i < blogArticleElements.length; i++) {
            if (blogArticleElements[i].__inheritance__ === 'BlogArticleChapter') {
              this.addChapter(blogArticleElements[i]);
            } else if (blogArticleElements[i].__inheritance__ === 'BlogArticleImage') {
              this.addImage(blogArticleElements[i]);
            }
          }
        });
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

  uploadImage(event, inputName, obj) {
    let form = inputName === 'image' ? this.form : this.forms[inputName];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      form.get(inputName).setValue(file);

      const formData = new FormData();
      formData.append('image', form.get(inputName).value);

      this.enable = false;
      this.genericService.uploadImage(formData).subscribe(response => {
        obj.image = response.id;
        this.enable = true;
      });
    }
  }

  onSubmit() {
    let route = typeof this.model.id === 'undefined';
    this.enable = false;
    let doneCount = 0;
    this.genericService.setResource('BlogArticle', this.model).subscribe(blogArticle => {
      if (this.blogArticleElements.length == 0) {
        this.finalizeSubmit(route);
      } else {
        for (let i = 0; i < this.blogArticleElements.length; i++) {
          this.blogArticleElements[i].parent = this.model.id;
          this.genericService.setResource('BlogArticleElement', this.blogArticleElements[i]).subscribe(blogArticleElement => {
            doneCount++;
            if (doneCount == this.blogArticleElements.length) {
              this.finalizeSubmit(route);
            }
          });
        }
      }
    });
  }

  finalizeSubmit(route) {
    this.enable = true;

    alert('sauvegarde effectuée');
    if (route) {
      this.serviceService.getNavBarElements().subscribe(res => {
        this.router.navigate(['/blog/article/' + this.model.id]);
      });
    }
  }

  delete() {
    alert('suppression non disponible');
  }

  getImageUrl(imageId): string {
    return this.genericService.getImageUrl(imageId);
  }

  isChapterElement(element: BlogArticleElement) {
    return (element instanceof BlogArticleChapter);
  }

  isImageElement(element: BlogArticleElement) {
    return (element instanceof BlogArticleImage);
  }

  addChapter(blogArticle = null) {
    this.blogArticleElements.push(new BlogArticleChapter(blogArticle));
  }

  addImage(blogArticle = null) {
    let key = 'image-' + this.blogArticleElements.length;
    let param: any = {};
    param.name = ['', Validators.required];
    param[key] = null;
    this.forms[key] = this.fb.group(param);
    this.blogArticleElements.push(new BlogArticleImage(blogArticle));
  }

  getImageInputname(id) {
    return 'image-' + id;
  }

}
