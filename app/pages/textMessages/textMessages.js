import {Component} from '@angular/core'
import {NavParams, Loading, NavController} from 'ionic-angular'
import {EmailComposer} from 'ionic-native';
import {SMS} from '../providers/sms'
import json2csv from 'json2csv'
import moment from 'moment'


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
    let convertToCSV = new Promise((resolve, reject) => {
      let fields = ['date', 'type', 'message']
      json2csv({ data: this.formatSMS(), fields: fields }, function(err, csv) {
        if (err) reject(err)
        resolve(csv)
      });
    })

    return convertToCSV.then(this.sendCSV)
  }

  formatSMS() {
    return this.params.sms.map((sms) => {
      return {
         date: moment(sms.date).format('h:mm:ss a, dddd, MMMM Do YYYY'),
         type: sms.type === 2 ? 'Sent' : 'Received',         
         message: sms.body
      }
    })
  }

  sendCSV(csv) {
    let email = {
      to: '',
      attachments: 'base64:report.csv//' + b64EncodeUnicode(csv),
      subject: 'Client Report',
      body: 'Attached in this email you will find a list of SMS messages'
    }
    //Email Plugin latest version currently broken - https://github.com/driftyco/ionic-native/issues/175
    //using `ionic plugin add https://github.com/katzer/cordova-plugin-email-composer.git#0.8.2` to fix
    return EmailComposer.open(email)

    //Unicode base64 encoding - https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
  }
}
