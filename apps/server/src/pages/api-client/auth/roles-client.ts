import { authOpts, getRoles, Role } from '@packages/auth'
import { APIRoute } from 'astro'
import { getSession } from 'auth-astro'





export interface QueryMap {
  [key: string]: string
}

export interface RequestOptions extends RequestInit {
  query?: QueryMap
}



export interface ApiResponse {
  roles: Array<Role>
}
  

/** return (await fetch('/api/auth/roles', { method: 'GET', ... })).json() */
export const authRoles = async(options: RequestOptions = {}): Promise<ApiResponse> => {
  let requestUrl = 'http://localhost:3000/api/auth/roles'
  if (options && options.query) {
    requestUrl += '?' + Object.keys(options.query)
        .map((key) => key + '=' + options.query![key])
        .join('&');
  }
  delete options.query
  options.method = 'GET'
  
  return (await fetch(requestUrl, options)).json()
}