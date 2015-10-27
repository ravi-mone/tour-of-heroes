import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, OnInit} from 'angular2/angular2';
import {RouteConfig,ROUTER_DIRECTIVES,  Router, RouterOutlet, Route, AuxRoute} from 'angular2/router';
import {HeroService} from './hero.service';
import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';
import {Routes} from './route.config';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {Nested1} from './nested1';
import {Nested2} from './nested2';
@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, HeroDetailComponent, ROUTER_DIRECTIVES],
})
@RouteConfig([
    { path: '/nested1', as: 'Nested1', component: Nested1 },
    { path: '/nested2', as: 'Nested2', component: Nested2 }
])

export class HeroesComponent implements OnInit {
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router) { }

  getHeroes() {
    this.selectedHero = undefined;
    this.heroes = [];

    this._heroService.getHeroes()
      .then((heroes: Hero[]) => this.heroes = heroes);

    return this.heroes;
  }

  getSelectedClass(hero: Hero) {
    return { 'selected': hero === this.selectedHero };
  }

  gotoDetail() {
    this._router.navigate([`/${Routes.detail.as}`, { id: this.selectedHero.id }]);
  }

  onInit() {
    this.heroes = this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}



