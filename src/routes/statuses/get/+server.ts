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
    let data = await platform.env.MAIN.get('entries', {type: 'json'}) || []

    // if last update was 2min + change ago, set phase to "Idle"
    // if for 2 days+ last online, delete the status from the list

    data = data.map((entry: any) => {
        if (Date.now() - entry.lastupdate > 2 * 60 * 1000) {
            entry.phase = 'Idle'
        }
        return entry

    })

    data = data.filter((entry: any) => Date.now() - entry.lastupdate < 2 * 24 * 60 * 60 * 1000)


    return new Response(JSON.stringify(data))

}) satisfies RequestHandler