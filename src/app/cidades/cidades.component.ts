import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cidade } from '../cidade';
import { CidadeService } from '../cidade.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

  cidName: string = '';
  cidImage: string = '';
  cidades: Cidade[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  cidEdit: Cidade = null;

  constructor(
    private cidadeService: CidadeService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cidadeService.get()
      .pipe( takeUntil(this.unsubscribe$))
      .subscribe((cids) => this.cidades = cids);
  }

  save() {
    if ( this.cidEdit) {
      this.cidadeService.update(
        {name: this.cidName,
         image: this.cidImage, _id: this.cidEdit._id})
        .subscribe(
          (cid) => {
            this.notify('Updated!');
          },
          (err) => {
            this.notify('Error');
            console.error(err);
          }
        )
    }
    else {
      this.cidadeService.add({name: this.cidName,
      image: this.cidImage})
      .subscribe(
        (cid) => {
          console.log(cid);

          this.notify('Inserted!');
        },
        (err) => console.error(err))
    }
    this.clearFields();
  }

  clearFields() {
    this.cidName = '';
    this.cidImage = '';
    this.cidEdit = null;
  }

  cancel(){
    this.clearFields();
  }

  edit(cid: Cidade) {
    this.cidName = cid.name;
    this.cidImage = cid.image;
    this.cidEdit = cid;
  }

  delete(cid: Cidade) {
    this.cidadeService.del(cid)
      .subscribe(
        () => this.notify('Removido com sucesso!!'),
        (err) => this.notify(err.error.msg)
      )
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 3000});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
