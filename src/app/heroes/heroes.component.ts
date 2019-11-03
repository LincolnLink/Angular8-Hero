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

  heroes: Hero[];
  ListUser: User[];

  constructor(
    private heroService: HeroService,
    private userService: UserService) { }

  ngOnInit() {
    this.getHeroes();
    this.getUsers();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(i => this.ListUser = i)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
      .subscribe(user => {
        this.ListUser.push(user);
      });
  }

}
