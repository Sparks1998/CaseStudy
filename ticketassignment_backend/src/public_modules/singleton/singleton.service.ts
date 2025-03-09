import { Injectable , Scope } from '@nestjs/common';
import { Users } from '@/entities/Users';

/**
 * SingletonService is a request-scoped service that stores global variables for the current request.
 * It primarily manages the logged-in user data for use across the application.
 */
@Injectable({
  scope: Scope.REQUEST,
})
export class SingletonService {
  /**
   * Holds the logged-in user that is accessing the APIs.
   */
  private _user: Users;

  /**
   * Retrieves the current logged-in user.
   * @returns {Users} The data of the logged-in user.
   */
  public get user(): Users {
    return this._user;
  }

  /**
   * Sets the logged-in user data for use in the current request.
   * @param {Users} user - The user data to store.
   */
  public set user(user: Users) {
    this._user = user;
  }
}
