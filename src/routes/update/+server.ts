import type {RequestHandler} from './$types';

import {
    SECRET
} from '$env/static/private';

export const POST = (async ({request, platform}) => {
    // simple header auth
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (!token || token !== SECRET) {
        return new Response('Unauthorized', {status: 401})
    }

    // {action:"delete", data:{title:1}}

    let newVar = await request.json();

    if (!newVar.action) {
        return new Response('action field is required, eg update or delete', {status: 400})
    }

    const {
        action,
        data
    } = newVar


    if (action === 'update') {
        const {
            img,
            status,
            title,
            phase
        } = data

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
            }
        }

        if (status === 100) {
            // @ts-ignore
            options.expirationTtl = 60 * 60 * 24 * 2
        }

        await platform?.env.MAIN.put(title, '', options)

        return new Response('Success');

    } else if (action === 'delete') {
        const {
            title
        } = data

        if (!title) {
            return new Response('Title is required', {status: 400})
        }

        await platform?.env.MAIN.delete(title)

        return new Response('Success');
    }else {
        return new Response('Action not found', {status: 404})
    }
}) satisfies RequestHandler;