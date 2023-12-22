import type {PageLoad} from './$types';

export const load = (({fetch}) => {

    // const statuses_data = new Promise((fulfil) => {
    //     fulfil([
    //         {
    //             img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
    //             status: 40,
    //             title: 'Silo 2023 S01E01',
    //             phase: 'Downloading',
    //             lastupdate: 0
    //         },
    //         {
    //             img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
    //             status: 33,
    //             title: 'Silo 2023 S01E02',
    //             phase: 'Encoding',
    //             lastupdate: 0
    //         },
    //         {
    //             img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
    //             status: 18,
    //             title: 'Silo 2023 S01E03',
    //             phase: 'Uploading',
    //             lastupdate: 0
    //         },
    //         {
    //             img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
    //             status: 100,
    //             title: 'Silo 2023 S01E04',
    //             phase: 'Done',
    //             lastupdate: 0
    //         },
    //         {
    //             img: "https://resizing.flixster.com/A_Qd7R83ReMm7G_VAbCVHBhATkE=/206x305/v2/https://resizing.flixster.com/shn-5oNS_mCn6kj_xIzhRgBmpTo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMTU4MjM5NDItNGQ1Yi00NTJkLTgxMTgtOTJmY2Q3ZTVhYWNmLnBuZw==",
    //             status: 0,
    //             title: 'Silo 2023 S01E05',
    //             phase: 'Queued',
    //             lastupdate: 0
    //         }
    //     ])
    // })
    //
    // const workers_data = new Promise((fulfil) => {
    //     fulfil([
    //             {
    //                 id: 'worker1',
    //                 status: 'working on Silo 2023 S01E01',
    //                 utilization: 4,
    //                 lastupdate: 0
    //             },
    //             {
    //                 id: 'worker2',
    //                 status: 'working on Silo 2023 S01E02',
    //                 utilization: 95,
    //                 lastupdate: 0
    //             },
    //             {
    //                 id: 'worker3',
    //                 status: 'working on Silo 2023 S01E03',
    //                 utilization: 3,
    //                 lastupdate: 0
    //             },
    //             {
    //                 id: 'worker4',
    //                 status: 'paused',
    //                 utilization: 0,
    //                 lastupdate: 0
    //             },
    //         ]
    //     )
    // })


    // MOCK DATA

    const statuses_data = fetch('/statuses/get').then(res => res.json())

    const workers_data = fetch('/workers/get').then(res => res.json())

    return {
        stream: {
            statues: new Promise(async (fulfil) => {
                fulfil(await statuses_data)
            }),
            workers: new Promise(async (fulfil) => {
                fulfil(await workers_data)
            })
        }
    };
}) satisfies PageLoad;