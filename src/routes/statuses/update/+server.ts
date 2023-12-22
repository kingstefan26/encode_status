

import {SECRET} from '$env/static/private';
import type {RequestHandler} from "@sveltejs/kit/src/exports/public";

export const POST = (async ({request, platform}) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token || token !== SECRET) {
        return new Response('Unauthorized', {status: 401});
    }


    const {action, data} = await request.json();

    if (!action) {
        return new Response('Action field is required, e.g., update or delete', {status: 400});
    }

    if (!data.title) {
        return new Response('Title is required', {status: 400})
    }

    const namespace = platform?.env.MAIN

    switch (action) {
        case 'update':
            try {
                const entries = await (await namespace.get('entries', {type: 'json'}) || [])

                let found = false

                entries.forEach((entry: any) => {
                    if (entry.title === data.title) {
                        found = true
                        entry.img = data.img
                        entry.status = data.status
                        entry.phase = data.phase
                        entry.lastupdate = Date.now()
                    }
                })

                if (!found) {
                    entries.push({
                        img: data.img, status: data.status, title: data.title, phase: data.phase, lastupdate: Date.now()
                    })
                }
                await namespace.put('entries', JSON.stringify(entries))
            } catch (e) {
                return new Response('error updating entry: ' + e, {status: 500})
            }
            break;
        case 'delete':
            try {
                const entries = await (await namespace.get('entries', {type: 'json'}) || [])


                entries.forEach((entry: any, index: number) => {
                    if (entry.title === data.title) {
                        entries.splice(index, 1)
                    }
                })
                await namespace.put('entries', JSON.stringify(entries))
            } catch (e) {
                return new Response('error deleting entry: ' + e, {status: 500})
            }
            break;
        default:
            return new Response('Action not found', {status: 404})
    }

    return new Response('Success');
}) satisfies RequestHandler;