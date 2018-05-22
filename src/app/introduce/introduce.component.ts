import { Component, OnInit, DoCheck } from '@angular/core';
import { Introduce } from '../introduce';
import { GenericService } from '../generic.service';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';

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
    private loginService: LoginService,
    private genericService: GenericService
  ) { }

  ngOnInit() {
    this.currentId = +this.route.snapshot.paramMap.get('id');
    this.genericService.getResource('Introduce', this.currentId).subscribe(introduce => {
      this.model = introduce;
    });
  }

  ngDoCheck() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (this.currentId !== id) {
      this.currentId = id;
      this.genericService.getResource('Introduce', this.currentId).subscribe(introduce => {
        this.model = introduce;
      });
    }
  }

  onSubmit() {
    this.enable = false;
    this.genericService.setResource('Introduce', this.model).subscribe(introduce => {
      this.enable = true;
      alert('sauvegarde effectuée');
    });
  }

}
