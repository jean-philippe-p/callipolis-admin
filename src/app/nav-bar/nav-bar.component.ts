import { Component, OnInit } from '@angular/core';
import { MainService } from '../service';
import { Introduce } from '../introduce';
import { ServiceService } from '../service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  summary_services: MainService[] = [];
  search_matches = [];
  introduces: Introduce[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getNavBarElements().subscribe(navbar_elements => {
      this.summary_services = navbar_elements.services;
      this.introduces = navbar_elements.introduces;
      $(document).ready(function(){
        $( ".link-text" )
          .mouseover(function() {
            var duration = Math.max(0, 77 * $( this ).text().length - 1307);
            var endPosition = '-' + ($( this ).width() - $( this ).parent().width() + 5) + 'px';
            $(this).animate({'margin-left': endPosition}, duration);
          })
          .mouseout(function() {
            $( this ).stop();
            $(this).animate({'margin-left': '0px'}, 100);
          });
      });
    });
  }

  search(search: string) {
    this.search_matches = [];
    if (search.length > 2) {
      for (let i = 0; i < this.summary_services.length; i++) {
        for (let j = 0; j < this.summary_services[i].subServices.length; j++) {
          for (let k = 0; k < this.summary_services[i].subServices[j].keyWords.length; k++) {
            if (this.summary_services[i].subServices[j].keyWords[k].includes(search)) {
              this.search_matches.push({
                route: "/services/" + this.summary_services[i].id + "/sub-services/" + this.summary_services[i].subServices[j].id,
                title: this.summary_services[i].subServices[j].title
              });
              break;
            }
          }
        }
      }
    }
  }

}
