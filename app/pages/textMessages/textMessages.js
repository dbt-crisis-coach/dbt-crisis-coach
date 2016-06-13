import {Component} from '@angular/core'
import {NavParams, Loading, NavController} from 'ionic-angular'
import {SMS} from '../providers/sms'
import jsPDF from 'jspdf-yworks'


@Component({
  templateUrl: 'build/pages/textMessages/textMessages.html',
  providers: [SMS]
})

export class TextMessagesPage {
     static get parameters() {
     return [[NavParams], [SMS], [NavController]]
   }
   
  constructor(params, sms, nav) {
    this.nav = nav
    this.params = params.data
    this.params.sms = []
    //Start loading
    sms.list(this.params.number).then((data) => {
      this.params.sms = data
    })
  }

  report() {
   var doc = new jsPDF()
  doc.text(20, 20, 'Hello world!')
  doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
  doc.addPage()
  doc.text(20, 20, 'Do you like that?')

// Output as Data URI

      console.log(doc.output('datauri'))
  }
}
