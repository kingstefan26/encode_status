import type {PageLoad} from './$types';

import {dev} from '$app/environment';

export const load = ( async ({fetch}) => {

    let statuses_data: Promise<any>
    let workers_data: Promise<any>

    if (dev) {
        // mock data
        statuses_data = new Promise((fulfil) => {
            setTimeout(() =>

                    fulfil([
                        {
                            img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
                            status: 40,
                            title: 'Silo 2023 S01E01',
                            phase: 'Downloading',
                            lastupdate: 0
                        },
                        {
                            img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
                            status: 33,
                            title: 'Silo 2023 S01E02',
                            phase: 'Encoding',
                            lastupdate: 0
                        },
                        {
                            img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
                            status: 18,
                            title: 'Silo 2023 S01E03',
                            phase: 'Uploading',
                            lastupdate: 0
                        },
                        {
                            img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
                            status: 100,
                            title: 'Silo 2023 S01E04',
                            phase: 'Done',
                            lastupdate: 0
                        },
                        {
                            img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
                            status: 0,
                            title: 'Silo 2023 S01E05',
                            phase: 'Queued',
                            lastupdate: 0
                        }
                    ])
                , 2)
        })

        workers_data = new Promise((fulfil) => {
            setTimeout(() =>
                    fulfil([
                            {
                                id: 'worker1',
                                status: 'working on Silo 2023 S01E01',
                                utilization: 4,
                                lastupdate: 0,
                                ws_ip: "localhost"
                            },
                            {
                                id: 'worker2',
                                status: 'working on Silo 2023 S01E02',
                                utilization: 95,
                                lastupdate: 0,
                                ws_ip: "localhost"
                            },
                            {
                                id: 'worker3',
                                status: 'working on Silo 2023 S01E03',
                                utilization: 3,
                                lastupdate: 0,
                                ws_ip: "localhost"
                            },
                            {
                                id: 'worker4',
                                status: 'paused',
                                utilization: 0,
                                lastupdate: 0,
                                ws_ip: "localhost"
                            },
                        ]
                    )
                , 100)
        })
    } else {
        statuses_data = fetch('/statuses/get').then(res => res.json())

        workers_data = fetch('/workers/get').then(res => res.json())
    }

    return {
        // stream: {
        //     statues: new Promise(async (fulfil) => {
        //         fulfil(await statuses_data)
        //     }),
        //     workers: new Promise(async (fulfil) => {
        //         fulfil(await workers_data)
        //     })
        // }
        statuses: await statuses_data,
        workers: await workers_data
    };
}) satisfies PageLoad;