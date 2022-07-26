import { UserData } from './user-data';

export interface Login {
    isAuthenticated: boolean;
    userData: UserData;
}
