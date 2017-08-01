import { Injectable } from '@angular/core';

@Injectable()
export class UserProfileService {

  getUserData() {
    return [{"userName":"Arun", "age":27 },
              {"userName":"John", "age":44 }];
  }

}
