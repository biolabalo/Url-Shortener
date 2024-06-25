import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'

export default class UrlShortenersController {
  async shorten({ request, response, auth }: HttpContext) {
    const data = request.only(['name', 'description', 'website'])
    const user = await auth.authenticate()

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

  async fetchAll({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    try {
      const urls = await Url.query()
        .where('userId', user.id)
        .orderBy('createdAt', 'desc')
        .paginate(page, limit)

      return response.ok(urls)
    } catch (error) {
      return response.unauthorized('You must be logged in to view URLs')
    }
  }

  async redirect({ params, response }: HttpContext) {
    try {
      const url = await Url.findByOrFail('short_id', params.shortcode)
      return response.redirect(url.website)
    } catch (error) {
      return response.notFound('URL not found')
    }
  }
}
