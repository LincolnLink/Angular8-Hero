import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor( 
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) 
    {}

  ngOnInit(): void {

    this.getHero();
  }

  //A route.snapshoté uma imagem estática das informações 
  //rota logo após o componente foi criado.

  //Os parâmetros de rota são sempre cadeias. O operador 
  //JavaScript (+) converte a sequência em um número, que
  // é o que um herói id deve ser.

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
