import type {RequestHandler} from "@sveltejs/kit/src/exports/public";


export const GET = (async ({platform, request}) => {

    let cache = platform?.caches.default || null

    let response = await cache?.match(request)

    if (!response) {
        // @ts-ignore
        let data = await platform.env.MAIN.get('entries', {type: 'json'}) || []

        // if last update was 30min + change ago, set phase to "Idle"
        data = data.map((entry: any) => {
            if (Date.now() - entry.lastupdate > 30 * 60 * 1000 && entry.phase !== 'Done') {
                entry.phase = 'Idle'
            }
            return entry

        })

        // if for 2 days+ last online, delete the status from the list
        data = data.filter((entry: any) => Date.now() - entry.lastupdate < 2 * 24 * 60 * 60 * 1000)


        let response = new Response(JSON.stringify(data));

        if (cache){
            response.headers.append('Cache-Control', 'max-age=240, s-maxage=240')

            platform?.context.waitUntil(cache.put('get', response.clone()))
        }

        return response
    }


    return response

}) satisfies RequestHandler