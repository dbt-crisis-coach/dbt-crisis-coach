import {Page} from 'ionic-angular';
import {Contacts} from 'ionic-native'


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  findContact() {
    return Contacts.pickContact().then((contact) => {
      contact.phoneNumbers.map((number) => {
        console.log(number.value)
      })
    })
  }
}
