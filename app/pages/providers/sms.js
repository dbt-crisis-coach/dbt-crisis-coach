import {Injectable} from '@angular/core'
import * as PhoneNumberUtil from './phoneNumberUtil'
import filter from 'lodash.filter'


@Injectable()
export class SMS {
  list(number) {
    return new Promise((resolve, reject) => {
      const filterSMS = {
        box: '',
        maxCount : 200
      }
      
      if(window.SMS) {
        window.SMS.listSMS(filterSMS, (data) => {
          let filteredSMS = filter(data,(textMessage) => {
            return PhoneNumberUtil.compare(textMessage.address, number)
          })
          resolve(filteredSMS)
        },
        (error) => {
          reject(error)
        })
      }
      else {
        reject(() => {
          console.log('SMS plugin is not available')
        })
      }
      
    })
  }
  
}