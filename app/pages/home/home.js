import {Page, NavController} from 'ionic-angular'
import {Contacts} from 'ionic-native'

import {TextMessagesPage} from '../textMessages/textmessages'

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
   static get parameters() {
     return [[NavController]]
   }
   
   constructor(nav) {
     this.nav = nav
   }
  
  
 pickContact() {
   return Contacts.pickContact()
   .then((contact) => {
     const newContact = {
       name: contact.displayName,
       number: contact.phoneNumbers[0].value
     }
     return this.nav.push(TextMessagesPage, newContact)
   })
 }
}
