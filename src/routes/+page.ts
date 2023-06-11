import type {PageLoad} from './$types';

export const load = (({fetch}) => {

    // const data = new Promise((fulfil) => {
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
    // MOCK DATA

    const data = fetch('/get').then(res => res.json())

    return {
        stream: {
            statues: new Promise(async (fulfil) => {
                fulfil(await data)
            })
        }
    };
}) satisfies PageLoad;