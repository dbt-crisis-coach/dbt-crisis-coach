import {Injectable} from '@angular/core'
import * as PhoneNumberUtil from './phoneNumberUtil'
import filter from 'lodash.filter'


@Injectable()
export class SMS {
  list(number) {
    return new Promise((resolve, reject) => {
      
      if(window.SMS) {
        let permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.READ_SMS, (status) => {

          let listSMS = () => {
            const filterSMS = {
                box: '',
                maxCount : 200
              }
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

            if (!status.hasPermission) {
              permissions.requestPermission(permissions.READ_SMS, function (requestStatus) {
                if (requestStatus.hasPermission) {
                  listSMS()
                  }
              }, (error)=> {
                reject(error)
              });
            }
            else {
              listSMS()
            }

        }, (error) => {
          reject(error)
        });

      }
      else {
        reject(() => {
          console.log('SMS plugin is not available')
        })
      }
      
    })
  }
  
}