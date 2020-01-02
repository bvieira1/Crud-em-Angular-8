import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cidade } from './cidade';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  readonly url = 'http://127.0.0.1:3000/Cidade';

  private cidadesSubject$: BehaviorSubject<Cidade[]> = new BehaviorSubject<Cidade[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Cidade[]> {
    if (!this.loaded) {
      this.http.get<Cidade[]>(this.url)
        .pipe(
          tap((cids) => console.log(cids)),
          delay(1000)
        )
        .subscribe(this.cidadesSubject$);
      this.loaded = true;
    }
    return this.cidadesSubject$.asObservable();
  }

  add(d: Cidade): Observable<Cidade>  {
    return this.http.post<Cidade>(this.url, d)
    .pipe(
      tap((cid: Cidade) => this.cidadesSubject$.getValue().push(cid))
    )
  }

  del(cid: Cidade): Observable<any> {
    return this.http.delete(`${this.url}/${cid._id}`)
      .pipe(
        tap(()=> {
          let cidades = this.cidadesSubject$.getValue();
          let i = cidades.findIndex(d => d._id === cid._id);
          if (i>=0)
            cidades.splice(i,1);
        }
      ))
  }



  update(cid: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.url}/${cid._id}`, cid)
      .pipe(
        tap((d) => {
          let cidades = this.cidadesSubject$.getValue();
          let i = cidades.findIndex(d => d._id === cid._id);
          if (i>=0)
            cidades[i].name = d.name,
            cidades[i].image = d.image
        })
      )
  }
}
