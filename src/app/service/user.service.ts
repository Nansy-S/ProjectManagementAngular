import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = 'api/users';

 
}
