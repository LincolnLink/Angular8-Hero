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

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    /*Método contrutor*/
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }


    /*GET ALL Users*/
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.UserUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    /** GET User by id. Will 404 if id not found */
    getUser(id: string): Observable<User> {

        const url = `${this.UserUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<User>(`getHero id=${id}`))
        );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getUserNo404<Data>(id: number): Observable<User> {

        const url = `${this.UserUrl}/?id=${id}`;

        return this.http.get<User[]>(url)
            .pipe(
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} hero id=${id}`);
                }),
                catchError(this.handleError<User>(`getHero id=${id}`))
            );
    }

    /* GET User whose name contains search term */
    searchUser(term: string): Observable<User[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<User[]>(`${this.UserUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<User[]>('searchHeroes', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new User to the server */
    addUser(use: User): Observable<User> {
        return this.http.post<User>(this.UserUrl, use, this.httpOptions).pipe(
            tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`)),
            catchError(this.handleError<User>('addUser'))
        );
    }

    /** PUT: update the User on the server */
    updateUser(use: User): Observable<any> {
        return this.http.put(this.UserUrl, use, this.httpOptions).pipe(
            tap(_ => this.log(`updated User id=${use.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    /** DELETE: delete the User from the server */
    deleteUser(user: string): Observable<User> {

        const url = `${this.UserUrl}/${user}`;

        return this.http.delete<User>(url).pipe(
            tap(_ => this.log(`deleted User`)),
            catchError(this.handleError<User>('deleteUser'))
        );
    }

    /** DELETE: delete the User from the server */
    deleteUser2(user: User | string): Observable<User> {
        const id = typeof user === 'string' ? user : user.id;
        const url = `${this.UserUrl}/${id}`;

        return this.http.delete<User>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted User id=${id}`)),
            catchError(this.handleError<User>('deleteUser'))
        );
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


    /*Método que envia a mensagem de log */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

}
