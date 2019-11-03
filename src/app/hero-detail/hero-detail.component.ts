import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { strictEqual } from 'assert';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private userService: UserService) { }

  ngOnInit(): void {

    this.getHero();
    this.getUser();
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

  getUser(): void {

    const id = +this.route.snapshot.paramMap.get('id');


    this.userService.getUser(id.toString())
      .subscribe(i => this.user = i);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

}
