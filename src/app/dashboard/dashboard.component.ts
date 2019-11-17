import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Propriedades da classe
  heroes: Hero[] = [];
  listUser: User[] = [];

  //Método construtor
  constructor(private heroService: HeroService,
    private userService: UserService) { }

  //Método do ciclo de vida do componente
  ngOnInit() {
    //this.getHeroes();
    this.getUser();
  }

  //Isso getHeroes()retorna a lista fatiada de heróis nas posições 1 e 5,
  //retornando apenas quatro dos principais heróis (2º, 3º, 4º e 5º).
  /*
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }*/

  //Isso getUser()retorna a lista fatiada de heróis nas posições 1 e 5,
  //retornando apenas quatro dos principais usuarios (2º, 3º, 4º e 5º).
  getUser(): void {
    this.userService.getUsers()
      .subscribe(i => this.listUser = i.slice(1, 5));
  }

}
