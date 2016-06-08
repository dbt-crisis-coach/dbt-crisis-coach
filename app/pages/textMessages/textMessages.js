import {Component} from '@angular/core'
import {NavParams, Loading, NavController} from 'ionic-angular'
import {SMS} from '../providers/sms'


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
}
