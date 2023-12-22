import type {RequestHandler} from "@sveltejs/kit/src/exports/public";


export const GET = (async ({platform, request}) => {

    // let cache = await platform?.caches.default || null
    //
    // let response = await cache?.match(request)
    //
    // if (!response) {
    //     const data = await (await platform?.env.MAIN.get('entries', {type: 'json'}) || [])

        // response = new Response(JSON.stringify(data));

        // if (cache){
        //     response.headers.append('Cache-Control', 'max-age=60, s-maxage=60')
        //
        //     platform?.context.waitUntil(cache.put('get', response.clone()))
        // }

    // }

    // @ts-ignore
    const data = await platform.env.MAIN.get('entries', {type: 'json'}) || []

    return new Response(JSON.stringify(data))

}) satisfies RequestHandler