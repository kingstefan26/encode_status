import type {RequestHandler} from "@sveltejs/kit/src/exports/public";

import {SECRET} from '$env/static/private';

export const POST = (async ({request, platform}) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token || token !== SECRET) {
        return new Response('Unauthorized', {status: 401});
    }

    const {action, data} = await request.json();

    if (!action) {
        return new Response('Action field is required, e.g., update or delete', {status: 400});
    }

    if (!data.id) {
        return new Response('Id or worker is required', {status: 400})
    }

    const namespace = platform?.env.MAIN


    switch (action) {
        case "update":
            try {
                const workers = await (await namespace.get('workers', {type: 'json'}) || [])

                let found = false

                workers.forEach((worker: any) => {
                    if (worker.id === data.id) {
                        found = true
                        worker.utilization = data.utilization
                        worker.status = data.status
                        worker.ws_ip = data.ws_ip
                        worker.lastupdate = Date.now()
                    }
                })

                if (!found) {
                    workers.push({
                        id: data.id, utilization: data.utilization, status: data.status, lastupdate: Date.now()
                    })
                }
                await namespace.put('workers', JSON.stringify(workers))
            } catch (e) {
                return new Response('error updating worker: ' + e, {status: 500})
            }
            break;
        case "delete":
            try {
                const workers = await (await namespace.get('workers', {type: 'json'}) || [])

                workers.forEach((worker: any, index: number) => {
                    if (worker.id === data.id) {
                        workers.splice(index, 1)
                    }
                })

                await namespace.put('workers', JSON.stringify(workers))

            } catch (e) {
                return new Response('error deleting worker: ' + e, {status: 500})


            }
            break;
        default:
            return new Response('Action not supported', {status: 400})
    }

    return new Response('Success')

}) satisfies RequestHandler