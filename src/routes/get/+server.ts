
import type {RequestHandler} from './$types';
import {get_entries} from "../lib/server/kvWrapper";

export const GET = (async ({platform, request}) => {

    let cache = await platform?.caches.default

    let response = await cache?.match(request)

    if (!response) {
        const data = await get_entries(platform?.env.MAIN) || []

        response = new Response(JSON.stringify(data));

        response.headers.append('Cache-Control', 'max-age=60, s-maxage=60')

        if (cache){
            platform?.context.waitUntil(cache.put('get', response.clone()))
        }
    }

    return response

}) satisfies RequestHandler