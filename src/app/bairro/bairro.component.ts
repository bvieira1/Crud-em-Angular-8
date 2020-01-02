import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Bairro } from '../bairro';
import { Cidade } from '../cidade';
import { BairroService } from '../bairro.service';
import { CidadeService } from '../cidade.service';

@Component({
  selector: 'app-bairro',
  templateUrl: './bairro.component.html',
  styleUrls: ['./bairro.component.css']
})
export class BairroComponent implements OnInit {




  bairroForm: FormGroup = this.fb.group({
    _id: [null],
    bairro: ['', [Validators.required]],
    title: ['', [Validators.required]],
    subtitle: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    cidades: [[], [Validators.required]]
  });

  @ViewChild('form') form: NgForm;

  bairros: Bairro[] = [];
  cidades: Cidade[] = [];

  imageFile: [] | any;
  imgBase64: [] | string;
  imageSource: [] | string;

  private unsubscribe$: Subject<any> = new Subject<any>();
  imageURL: string;

  constructor(
    private bairroService: BairroService,
    private fb: FormBuilder,
    private cidadeService: CidadeService,
    private snackbar: MatSnackBar) {

      // this.bairroForm = this.fb.group({
      //   image: ['', [Validators.required]],
      //   _id: [null],
      //     bairro: ['', [Validators.required]],
      //     title: ['', [Validators.required]],
      //     subtitle: ['', [Validators.required]],
      //     description: ['', [Validators.required]],
      //     cidades: [[], [Validators.required]]
      // })

    }

  ngOnInit() {
    this.bairroService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.bairros = prods);
    this.cidadeService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cids) => this.cidades = cids);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }


  // showPreview(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.bairroForm.patchValue({
  //     image: file
  //   });
  //   this.bairroForm.get('image').updateValueAndValidity()

  //   // File Preview
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageFile = file;
  //     this.handleInputChange(file);
  //   }
  //   reader.readAsDataURL(file)
  // }


  public picked(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.imageFile = file;
      this.handleInputChange(file); // turn into base64
    } else {
      alert('No file selected');
    }
  }

  handleInputChange(files: any) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);

    this.imgBase64 = base64result;
    this.imageSource = 'data:image/png;base64,' + base64result;

    console.log('base64', this.imageSource);
    this.bairroForm.patchValue({
          image: this.imageSource
        });
        this.bairroForm.get('image').updateValueAndValidity()

  }




  save(){
    let data = this.bairroForm.value;
    if (data._id != null) {
      this.bairroService.update(data)
        .subscribe(
          (p)=> this.notify("Updated!")
        );
    }
    else {
      this.bairroService.add(data)
        .subscribe(
          (p) => this.notify("Inserted!!")
        );
    }
    this.resetForm();
  }
  // this.cidadeService.update(
  //   {name: this.cidName,
  //    image: this.cidImage, _id: this.cidEdit._id})

  delete(p: Bairro) {
    this.bairroService.del(p)
      .subscribe(
        () => this.notify("Deleted!"),
        (err) => console.log(err)
      )
  }

  edit(p: Bairro) {
    this.bairroForm.setValue(p);
  }

  notify(msg: string) {
    this.snackbar.open(msg, "OK", {duration: 3000});
  }

  resetForm() {
    this.form.resetForm()
  }
}
