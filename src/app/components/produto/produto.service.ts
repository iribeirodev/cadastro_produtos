import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Produto } from './produto.model';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseURL = "http://localhost:3001/products";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseURL, produto)
            .pipe(
              map(obj => obj),
              catchError(err => this.errorHandler(err))
            );
  }

  read(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL)
          .pipe(
            map(obj => obj),
            catchError(err => this.errorHandler(err))
          );
  }

  readById(id: number): Observable<Produto> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Produto>(url)
        .pipe(
          map(obj => obj),
          catchError(err => this.errorHandler(err))
        );
  }

  update(produto: Produto): Observable<Produto> {
    const url = `${this.baseURL}/${produto.id}`;
    return this.http.put<Produto>(url, produto)
    .pipe(
      map(obj => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  delete(id: number): Observable<Produto> {
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<Produto>(url)
    .pipe(
      map(obj => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  errorHandler(err: any): Observable<any> {
    console.log(err);
    
    this.showMessage('Ocorreu um erro !', true);
    return EMPTY;
  }  

}
