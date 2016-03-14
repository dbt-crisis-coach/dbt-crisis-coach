import {Page, NavParams} from 'ionic-angular'


@Page({
  templateUrl: 'build/pages/textMessages/textMessages.html'
})

export class TextMessagesPage {
     static get parameters() {
     return [[NavParams]]
   }
   
  constructor(params) {
    this.params = params.data
    
  }
}
