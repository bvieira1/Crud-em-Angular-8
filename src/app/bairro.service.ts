import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { CidadeService } from './cidade.service';
import { map, tap, filter } from 'rxjs/operators';
import { Cidade } from './cidade';
import { Bairro } from './bairro';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  readonly url = 'http://127.0.0.1:3000/Score';
  private bairrosSubject$: BehaviorSubject<Bairro[]> = new BehaviorSubject<Bairro[]>(null);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private cidadeService: CidadeService) {     }

    get(): Observable<Bairro[]> {
      if (!this.loaded) {
        combineLatest(
          this.http.get<Bairro[]>(this.url),
          this.cidadeService.get())
        .pipe(
          tap(([bairros,cidades]) => console.log(bairros, cidades)),
          filter(([bairros,cidades])=> bairros!=null && cidades!=null),
          map(([bairros,cidades])=> {
            for(let p of bairros) {
              let ids = (p.cidades as string[]);
              p.cidades = ids.map((id)=>cidades.find(dep=>dep._id==id));
            }
            return bairros;
          }),
          tap((bairros) => console.log(bairros))
        )
        .subscribe(this.bairrosSubject$);

        this.loaded = true;
      }
      return this.bairrosSubject$.asObservable();
    }

    add(prod: Bairro): Observable<Bairro> {
      let cidades = (prod.cidades as Cidade[]).map(d=>d._id);
      return this.http.post<Bairro>(this.url, {...prod, cidades})
        .pipe(
          tap((p) => {
            this.bairrosSubject$.getValue()
              .push({...prod, _id: p._id})
          })
        )
    }

  del(prod: Bairro): Observable<any> {
    return this.http.delete(`${this.url}/${prod._id}`)
      .pipe(
        tap(() => {
          let bairros = this.bairrosSubject$.getValue();
          let i = bairros.findIndex(p => p._id === prod._id);
          if (i>=0)
            bairros.splice(i, 1);
        })
      )
  }

  update(prod: Bairro): Observable<Bairro> {
    let cidades = (prod.cidades as Cidade[]).map(d=>d._id);
    return this.http.put<Bairro>(`${this.url}/${prod._id}`, {...prod, cidades})
    .pipe(
      tap(() => {
        let bairros = this.bairrosSubject$.getValue();
        let i = bairros.findIndex(p => p._id === prod._id);
        if (i>=0)
          bairros[i] = prod;
      })
    )
  }

}


