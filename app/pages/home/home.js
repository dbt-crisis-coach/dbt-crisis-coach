import {Page} from 'ionic-angular'
import {Contacts} from 'ionic-native'


@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  constructor() {
    this.numbers = []
  }
  findContact() {
    return Contacts.pickContact().then((contact) => {
      this.numbers = contact.phoneNumbers.map((number) => {
        return number.value
      })
    })
  }
}
