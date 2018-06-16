import { Component, OnInit, DoCheck } from '@angular/core';
import { Introduce } from '../introduce';
import { GenericService } from '../generic.service';
import { LoginService } from '../login.service';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit, DoCheck {

  currentId: number = -1;
  public model: Introduce;
  public enable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private genericService: GenericService,
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.currentId = +this.route.snapshot.paramMap.get('id');
      this.genericService.getResource('Introduce', this.currentId).subscribe(introduce => {
        this.model = introduce;
      });
    } else {
      this.model = new Introduce();
      this.model.display = 'carousel';
    }
  }

  ngDoCheck() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = +this.route.snapshot.paramMap.get('id');
      if (this.currentId !== id) {
        this.currentId = id;
        this.genericService.getResource('Introduce', this.currentId).subscribe(introduce => {
          this.model = introduce;
        });
      }
    }
  }

  onSubmit() {
    let route = typeof this.model.id === 'undefined';
    this.enable = false;
    this.genericService.setResource('Introduce', this.model).subscribe(introduce => {
      this.enable = true;
      alert('sauvegarde effectuée');
      if (route) {
        this.serviceService.getNavBarElements().subscribe(res => {
          this.router.navigate(['/introduces/' + this.model.id]);
        });
      }
    });
  }

}
