export type Registration = {
  created_at: Date
  firstName: string
  lastName: string
  gender: string
  passNo: string
  passExp: string
  phone: string
  whatsapp: string
  email: string
  addr: string
  package: string
  roomType: string
  hasVisa: boolean
  visaCountry: string
  visaAssist: string
  uniqueID: string
  dob: string
}

export type Message = {
  fullName: string
  email: string
  message: string
}
