import type {RequestHandler} from './$types';

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

    if (action === 'update') {
        const {img, status, title, phase} = data;

        if (!title) {
            return new Response('Title is required', {status: 400})
        }

        let options = {
            metadata: {
                img,
                status,
                title,
                phase,
                lastupdate: Date.now()
            },
            expirationTtl: status === 100 ? 60 * 60 * 24 * 2 : undefined
        }

        await platform?.env.MAIN.put(title, '', options)

    } else if (action === 'delete') {
        const {
            title
        } = data

        if (!title) {
            return new Response('Title is required', {status: 400})
        }

        await platform?.env.MAIN.delete(title)
    } else {
        return new Response('Action not found', {status: 404})
    }

    return new Response('Success');
}) satisfies RequestHandler;