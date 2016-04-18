import {Page, NavParams} from 'ionic-angular'
import {SMS} from '../providers/sms'


@Page({
  templateUrl: 'build/pages/textMessages/textMessages.html',
  providers: [SMS]
})

export class TextMessagesPage {
     static get parameters() {
     return [[NavParams], [SMS]]
   }
   
  constructor(params, sms) {
    this.params = params.data
    this.params.sms = []
    //Start loading
    sms.list(this.params.number).then((data) => {this.params.sms = data})
  }
}
