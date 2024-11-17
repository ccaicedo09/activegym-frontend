export interface User {
  document: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  genderName: string;
  epsName: string;
  bloodTypeName: string;
  bloodRh: string;
  age: number;
  roles: string[];
}

export interface UserOverview {
  name: string;
  roles: string[];
  profilePicture: string;
  hasMembership: boolean;
  daysLeft: number;
}

export interface UserAccess {
  document: number;
}
