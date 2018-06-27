import { Component, OnInit, DoCheck } from '@angular/core';
import { Article } from '../article';
import { GenericService } from '../generic.service';
import { LoginService } from '../login.service';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, DoCheck {

  currentId: string;
  public model: Article;
  public enable: boolean = false;
  public editId: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private genericService: GenericService,
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.editId = false;
      this.currentId = this.route.snapshot.paramMap.get('id');
      this.genericService.getResource('Article', this.currentId).subscribe(article => {
        this.model = article;
      });
    } else {
      this.editId = true;
      this.model = new Article();
    }
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.editId = false;
      const id = this.route.snapshot.paramMap.get('id');
      if (this.currentId !== id) {
        this.currentId = id;
        this.genericService.getResource('Article', this.currentId).subscribe(article => {
          this.model = article;
        });
      }
    } else {
      this.editId = true;
    }
  }

  onSubmit() {
    let route = !this.route.snapshot.paramMap.has('id');
    this.enable = false;
    this.genericService.setResource('Article', this.model).subscribe(article => {
      this.enable = true;
      alert('sauvegarde effectuée');
      if (route) {
        this.serviceService.getNavBarElements().subscribe(res => {
          this.router.navigate(['/articles/' + this.model.id]);
        });
      }
    });
  }

}
