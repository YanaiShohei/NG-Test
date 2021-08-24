import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';



export interface PeriodicElement {
  name: string;
  birthday: Date;
  age: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Helium', birthday: new Date(), age: 2},
  { name: 'Lithium', birthday: new Date(), age: 2},
  { name: 'Hydrogen', birthday: new Date(), age: 2},
  { name: 'Beryllium', birthday: new Date(), age: 2},

];

// 上の変数を一行にするとしたのようになる
// ELEMENT_DATA = [{ name: 'Helium', },{ name: 'Lithium', },{ name: 'Hydrogen', },{ name: 'Beryllium', },{ name: 'Boron', },{ name: 'Carbon', },{ name: 'Nitrogen', },{ name: 'Oxygen', },{ name: 'Fluorine', },{ name: 'Neon', }]
// ごめん、ライブシェア繋いだままだったわ このページで終了の仕方書いてあるから見とくと良いよ！頑張ってね！by中村
//   ->https://qiita.com/taichi0514/items/95aca7428376a7b41f90
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatTable) table?: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['name','age','birthday','button'];
  dataSource = ELEMENT_DATA; //
  title = 'ng-test';
  name = '';
  age: number = 0;
  birthday: Date = new Date();

  today = moment();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log('hogehoge');
  }

  click() {
    const test = 'hogehoge';
    console.log(this.name);
    // 配列に追加する
    this.dataSource.push({ name: this.name, birthday: this.birthday, age: this.age }); // classが持っている変数(クラス変数)を関数で使うときは this. をクラス変数の前につける
    // renderRows()... angular materialのtableのデータが追加、削除された時にtableに変更があった部分を反映させるもの
    this.table?.renderRows();
  }

  delete(i:number)　{
    console.log('delete');
    // ダイアログを表示する処理
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });

    // ダイアログを閉じた時に走る処理
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.dataSource.splice(i,1);
        this.table?.renderRows();
      }
      console.log('The dialog was closed');
      // this.animal = result;
    });
    
  }
  addEvent( event: MatDatepickerInputEvent<Date>) {
    console.log(`${event.value}`);
    if(event.value == null){
      return;
    }
    this.birthday = event.value;
    const bd = moment(event.value);
    this.today.diff(bd,'year')
    this.age = this.today.diff(bd,'year')

    // this.today.getFullYear();
    // this.today.getMonth()+1;
    // this.today.getDay();
    // console.log(this.today);
    // this.age = this.today.getFullYear() - this.birthday.getFullYear();{
    //   if( this.today.getMonth() < this.birthday.getMonth() ){
    //       this.age--;
    //     }
    //     return;
    // }
  }
}
