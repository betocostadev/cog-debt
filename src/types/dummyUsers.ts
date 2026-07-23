// Exclusive for reading Users comming from Dummy JSON
// After feeding to Dexie, use Users and not this in the implementation
export interface DummyCoordinates {
  lat: number
  lng: number
}

export interface DummyAddress {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: DummyCoordinates
  country: string
}

export interface DummyHair {
  color: string
  type: string
}

export interface DummyBank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface DummyCompany {
  department: string
  name: string
  title: string
  address: DummyAddress
}

export interface DummyCrypto {
  coin: string
  wallet: string
  network: string
}

export interface DummyUser {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: 'male' | 'female'
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: DummyHair
  ip: string
  address: DummyAddress
  macAddress: string
  university: string
  bank: DummyBank
  company: DummyCompany
  ein: string
  ssn: string
  userAgent: string
  crypto: DummyCrypto
  role: 'admin' | 'moderator' | 'user'
}

export type DummyUserListItem = Omit<
  DummyUser,
  | 'password'
  | 'bloodGroup'
  | 'height'
  | 'hair'
  | 'ip'
  | 'macAddress'
  | 'ein'
  | 'ssn'
  | 'userAgent'
  | 'crypto'
>
