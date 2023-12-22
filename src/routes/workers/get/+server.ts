import type {RequestHandler} from "@sveltejs/kit/src/exports/public";

export const GET = (async ({platform, request}) => {
    const data = await (await platform?.env.MAIN.get('workers', {type: 'json'}) || [])

    // if the last online date was 2min + change ago, set status to offline.
    // if for 2 days+ last online, delete the worker from the list
    data.forEach((worker: any) => {
        if (Date.now() - worker.lastupdate > 2 * 60 * 1000) {
            worker.status = 'offline'
        }
        if (Date.now() - worker.lastupdate > 2 * 24 * 60 * 60 * 1000) {
            const index = data.indexOf(worker)
            data.splice(index, 1)
        }
    })

    return new Response(JSON.stringify(data))
}) satisfies RequestHandler