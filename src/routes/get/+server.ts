
import type {RequestHandler} from './$types';

export const GET = (async ({platform}) => {
    const result = await platform?.env.MAIN.list()

    // @ts-ignore
    const data = result.keys.map(({metadata}) => metadata)

    return new Response(JSON.stringify(data));
}) satisfies RequestHandler