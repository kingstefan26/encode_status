import type {RequestHandler} from "@sveltejs/kit/src/exports/public";

export const GET = (async ({platform, request}) => {

    let cache = platform?.caches.default || null

    let response = await cache?.match(request)

    if (response) {
        return response
    }

    const data = await (await platform?.env.MAIN.get('workers', {type: 'json'}) || [])

    // if the last online date was 30min + change ago, set status to offline.
    // if for 2 days+ last online, delete the worker from the list
    data.forEach((worker: any) => {
        if (Date.now() - worker.lastupdate > 30 * 60 * 1000) {
            worker.status = 'offline'
        }
        if (Date.now() - worker.lastupdate > 2 * 24 * 60 * 60 * 1000) {
            const index = data.indexOf(worker)
            data.splice(index, 1)
        }
    })

    response = new Response(JSON.stringify(data));

    if (cache) {
        response.headers.append('Cache-Control', 'max-age=240, s-maxage=240')

        platform?.context.waitUntil(cache.put('get', response.clone()))
    }

    return response


}) satisfies RequestHandler