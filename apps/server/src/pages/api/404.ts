import { APIRoute } from 'astro'

export const get: APIRoute = async ({ redirect }) => {
  return redirect('/404.html', 301)
}
