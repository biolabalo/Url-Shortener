import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'

export default class UrlShortenersController {
     async shorten({ request, response , auth}: HttpContext) {
        const data = request.only(['name', 'description', 'website'])
        const user = await auth.authenticate()

        console.log( user?.id )
    
        try {
          const url = await Url.create({ ...data, userId: user.id })
          return response.created(url)
        } catch (error) {
          return response.badRequest(error.messages)
        }
      }
    
       async show({ params, response }: HttpContext) {
        try {
          const url = await Url.findByOrFail('short_id', params.id)
          return response.ok(url)
        } catch (error) {
          return response.notFound('URL not found')
        }
      }

      async get({ request, response }: HttpContext) {
        try {
   
          return response.ok({name : 'biols'})
        } catch (error) {
          return response.notFound('URL not found')
        }
      }
}