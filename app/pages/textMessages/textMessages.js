import {Component} from '@angular/core'
import {NavParams, Loading, NavController} from 'ionic-angular'
import {SMS} from '../providers/sms'
import json2csv from 'json2csv'


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
    let fields = ['date', 'type', 'body']
    json2csv({ data: this.params.sms, fields: fields }, function(err, csv) {
      if (err) console.log(err);
       console.log(csv);
    });
  }

  convertToCSV() {
    //convert date to readable format
    //Change type to sender or receiver
    
  }
}
