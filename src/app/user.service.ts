import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

import { User } from './user';
import { MessageService } from './message.service';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private UserUrl = 'http://localhost:5000/api/users'; //Url da API


    /*Método contrutor*/
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }


    /*Método que envia a mensagem de log */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.UserUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getUser(id: string): Observable<User> {
        const url = `${this.UserUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<User>(`getHero id=${id}`))
        );
    }

    /** PUT: update the hero on the server */
    updateUser(use: User): Observable<any> {
        return this.http.put(this.UserUrl, use, this.httpOptions).pipe(
            tap(_ => this.log(`updated use id=${use.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    /** POST: add a new hero to the server */
    addUser(hero: User): Observable<User> {
        return this.http.post<User>(this.UserUrl, hero, this.httpOptions).pipe(
            tap((newUser: User) => this.log(`added hero w/ id=${newUser.id}`)),
            catchError(this.handleError<User>('addHero'))
        );
    }


}
