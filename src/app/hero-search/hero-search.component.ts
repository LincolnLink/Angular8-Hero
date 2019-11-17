import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  //Propriedade da classe
  heroes$: Observable<Hero[]>;
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();

  //Método construtor da classe
  constructor(private heroService: HeroService,
    private userService: UserService) { }


  /*
    Cada operador trabalha da seguinte maneira:

    debounceTime(300)aguarda até o fluxo de novos eventos de sequência pausar por 300
    milissegundos antes de transmitir a sequência mais recente. Você nunca fará 
    solicitações com mais frequência que 300 ms.

    distinctUntilChanged() garante que uma solicitação seja 
    enviada apenas se o texto do filtro for alterado.

    switchMap()chama o serviço de pesquisa para cada termo de pesquisa que 
    o faz passar por debounce()e distinctUntilChanged(). Cancela e descarta 
    os observáveis ​​de pesquisa anteriores, retornando apenas o último serviço de pesquisa observável.
   */
  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUser(term)),
    );
  }

  // Push a search term into the observable stream.
  // Busca o usuario baseado no que foi digitado
  search(term: string): void {
    this.searchTerms.next(term);
  }


}
