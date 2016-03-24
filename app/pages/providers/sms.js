import {Injectable} from 'angular2/core';


@Injectable()
export class SMS {
  list(number) {
    return new Promise((resolve, reject) => {
      const filter = {
        
      }
      
      if(window.SMS) {
        window.SMS.listSMS(filter, (data) => {
          resolve(data)
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