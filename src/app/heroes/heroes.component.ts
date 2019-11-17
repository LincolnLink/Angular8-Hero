import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { from } from 'rxjs';
import { HeroService } from '../hero.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //Propriedades da classe
  heroes: Hero[];
  ListUser: User[];

  //Método construtor
  constructor(
    private heroService: HeroService,
    private userService: UserService) { }

  //Método que faz parte do ciclo de vida do componente, inicia quando cria o componente
  ngOnInit() {
    //Chamando os métodos!
    this.getHeroes();
    this.getUsers();
  }

  //Buscando uma lista de herois, usando um serviço
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  //Buscando uma lista de usuarios, usando um serviço
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(i => this.ListUser = i)
  }

  //Adiciona um novo usuario!
  add(name: string, email: string): void {

    let usuario = {}

    name = name.trim();
    email = email.trim();

    if (!name && !email) { return; }

    this.userService.addUser({ name, email } as User)
      .subscribe(user => {
        this.ListUser.push(user);
      });
  }

  //Deleta um usuario
  delete(id: string): void {
    this.ListUser = this.ListUser.filter(h => h.id !== id);
    this.userService.deleteUser(id).subscribe();
  }


}
