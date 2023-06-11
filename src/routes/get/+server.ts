
import type {RequestHandler} from './$types';

export const GET = (async ({platform, request}) => {

    let cache = await platform?.caches.default

    let response = await cache?.match(request)

    if (!response) {
        const result = await platform?.env.MAIN.list()

        // @ts-ignore
        const data = result.keys.map(({metadata}) => metadata)


        response = new Response(JSON.stringify(data));

        response.headers.append('Cache-Control', 'max-age=60, s-maxage=60')

        if (cache){
            platform?.context.waitUntil(cache.put('get', response.clone()))
        }
    }

    return response

}) satisfies RequestHandler