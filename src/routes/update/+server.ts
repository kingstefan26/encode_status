import type {RequestHandler} from './$types';

import {SECRET} from '$env/static/private';
import {delete_entry, update_entry} from "../lib/server/kvWrapper";

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

    switch (action) {
        case 'update':
            await update_entry(data, platform?.env.MAIN)
            break;
        case 'delete':
            await delete_entry(data.title, platform?.env.MAIN)
            break;
        default:
            return new Response('Action not found', {status: 404})
    }

    return new Response('Success');
}) satisfies RequestHandler;