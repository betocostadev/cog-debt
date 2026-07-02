type AuthStore = {
  jwt: string | null
  readonly loggedIn: string | null
}
const Store: AuthStore = {
  jwt: null,
  get loggedIn(): string | null {
    return this.jwt
  },
}

const storedJwt = localStorage.getItem('jwt')

if (storedJwt) {
  Store.jwt = storedJwt
}

const proxiedStore = new Proxy(Store, {
  set: (target, prop, value) => {
    if (prop == 'jwt') {
      target[prop] = value
      if (value === null) {
        localStorage.removeItem('jwt')
      } else {
        localStorage.setItem('jwt', value)
      }
    }
    return true
  },
})

export default proxiedStore
