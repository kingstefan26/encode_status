<script lang="ts">
    import type {PageData} from './$types';
    import {scale} from "svelte/transition";
    import {onMount} from "svelte";

    export let data: PageData;

    let realtime_update_status = "idle";
    let realtime_update_border_color = "#343434";
    let realtime_bg_color = "#1f1f1f";

    onMount(async () => {
        let ws_ip = undefined;
        for (const worker of data.workers) {

            if (worker.ws_ip !== "") {
                ws_ip = worker.ws_ip;
                break // only connect to one worker
            }
        }

        if (ws_ip) {
            const connect_to_ws = () => {
                realtime_update_status = "Connecting...";
                realtime_update_border_color = "#428ae8";
                realtime_bg_color = "#1b242d";
                console.log("Found worker with a websocket ip: " + ws_ip);
                const ws = new WebSocket(`ws://${ws_ip}:6542`);
                ws.onopen = () => {
                    console.log("Connected to worker websocket");
                    realtime_update_status = "Connected";
                    realtime_update_border_color = "#0f9d58";
                    realtime_bg_color = "#074f2c";
                    ws.onmessage = (event) => {
                        const ws_data = JSON.parse(event.data);

                        console.log(`Received data from worker ${ws_data.data.id}: ${event.data}`);

                        if (ws_data.type === "worker") {
                            for (const w of data.workers) {
                                if (w.id === ws_data.data.id) {
                                    w.status = ws_data.data.status;
                                    w.utilization = ws_data.data.utilization;
                                }
                            }
                            data.workers = data.workers;
                        } else if (ws_data.type === "status") {
                            for (const status of data.statuses) {
                                const ws_status = ws_data.data
                                if (ws_status.title === status.title) {
                                    status.status = ws_status.status;
                                    status.phase = ws_status.phase;
                                    break;
                                }
                            }
                            data.statuses = data.statuses;
                        }
                    }
                }
                ws.onerror = (e) => {
                    console.log("Error connecting to ws");
                    realtime_update_status = "Error";
                    realtime_update_border_color = "#db4437";
                    realtime_bg_color = "#65211b";
                }
                ws.onclose = (e) => {
                    console.log("Disconnected from ws");
                    realtime_update_status = "Disconnected";
                    realtime_update_border_color = "#db4437";
                    realtime_bg_color = "#65211b";
                    setTimeout(() => {
                        connect_to_ws()
                    }, 5000)
                }
            }
            connect_to_ws()
        }

    })
</script>


<head>
    <title>Encode Status Page</title>
    <link rel="preload" as="font">

    <meta property="og:title" content="Encode Status Page">
    <meta property="og:description" content="A page to show the status of my encodes">
    <meta property="og:image" content="https://encodestatus.kokoniara.software/sticker.webp">
    <meta property="og:url" content="https://encodestatus.kokoniara.software/">
    <meta property="og:type" content="website">

</head>

<div class="dark_mode body">
    <div class="header dark_mode">
        <h1>STATUS</h1>
    </div>
    <div
            style="padding: 10px; width: min-content; position: absolute; right: 20px; top: 20px; border-radius: 5px; box-shadow: 0 0 20px rgba(12, 12, 12, 0.5); background-color: {realtime_bg_color};  border: {realtime_update_border_color} 2px solid;">
        {realtime_update_status}
    </div>

    <h3>Workers</h3>
    <!--{#await data.stream.workers}-->
    <!--    <div class="chips_container">-->
    <!--        <div class="chip">-->
    <!--            <div style="width: 8em; height: 1.1em; border-radius: 2px; margin-bottom: 1em" class="pulse_anim"></div>-->
    <!--            <div style="width: 14em; height: 1.9em; border-radius: 2px " class="pulse_anim"></div>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--{:then workers}-->
    {#if data.workers.length !== 0}
        <div class="chips_container">
            {#each data.workers as worker}
                {#key worker}
                    <div class="chip">
                        <h4 class="chip_header">{worker.id}</h4>
                        <div style="margin: 0.2em">{worker.status}</div>
                        {#if worker.status !== "offline" && worker.status !== "paused"}
                            <div style="display: grid; grid-template-columns: 1fr auto">
                                <div class="status-bar" style="float: left">
                                    <span style="width: {worker.utilization}%;"></span>
                                </div>
                                <div style="margin: 0 2px 0 2px">{worker.utilization} % CPU</div>
                            </div>
                        {/if}
                    </div>
                {/key}
            {/each}
        </div>

    {/if}
    <!--{:catch error}-->
    <!--    <p>error: {error.message}</p>-->
    <!--{/await}-->

    <div class="dark_mode">
        <h2>Encodes</h2>
        <div class="wrapper">
            <!--{#await data.stream.statues}-->
            <!--    {#each Array(3) as _}-->
            <!--        <div class="status_entry dark_mode">-->
            <!--            <div style="height: 1.5em;width: 10em; border-radius: 2px" class="stats_title pulse_anim"></div>-->
            <!--            <div class="poster pulse_anim_ligher " style="height:300px; width:200px; margin-top: 2px; display: flex;-->
            <!--        align-items: center; justify-content: center; border-radius: 5px">-->
            <!--                <div class="pulse_anim_darker"-->
            <!--                     style="width: 98%; height:98%; border-radius: 5px; box-shadow: #101010 0 0 10px"></div>-->
            <!--            </div>-->
            <!--            <div style="width: 6em; height: 0.9em; border-radius: 4px" class="pulse_anim_darker"></div>-->
            <!--        </div>-->
            <!--    {/each}-->
            <!--{:then statuses}-->
            {#if data.statuses.length === 0}
                <p>nothing here ngl</p>
                <img src="/sticker.webp" alt="sticker">
            {:else}
                {#each data.statuses as status}
                    <div class="status_entry dark_mode">
                        <h3 class="stats_title">{status.title}</h3>
                        <img class="poster" height="300" width="200" src="{status.img}" alt="Movie Poster">
                        <div class="bar">
                            <div class="status-bar">
                                <span style="width: {status.status}%;"></span>

                            </div>
                            <p class="proc_text">{status.status}%</p>
                        </div>
                        <div>Phase: {status.phase}</div>
                    </div>
                {/each}
            {/if}
            <!--{:catch error}-->
            <!--    <p>error: {error.message}</p>-->
            <!--{/await}-->
        </div>
    </div>

</div>

<style>

    :global(body) {
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: "Inter Display SemiBold";
        src: url("/PublicSans-VariableFont_wght.woff2") format('woff2');
        font-display: swap;
    }

    * {
        font-family: "Inter Display SemiBold", sans-serif;
        box-sizing: border-box;
    }

    h1, h2, h3 {
        text-align: center;
    }


    .pulse_anim {
        animation: loading-animation 1.2s ease-in-out infinite;
        background-color: #333333;
        background-repeat: no-repeat;
        background-image: linear-gradient(
                90deg,
                #333333,
                #626262,
                #333333
        );
    }

    .pulse_anim_darker {
        animation: loading-animation 1.2s ease-in-out infinite;
        background-color: #232323;
        background-repeat: no-repeat;
        background-image: linear-gradient(
                90deg,
                #232323,
                #626262,
                #232323
        );
    }

    @keyframes loading-animation {
        0% {
            background-position: -200px 0;
        }
        100% {
            background-position: calc(200px + 100%) 0;
        }
    }


    .bar {
        display: grid;
        /*  80% 20% horizontal split */
        grid-template-columns: 80% 20%;
    }

    .chip {
        background-color: #232323;
        border-radius: 5px;
        padding: 1em;
        width: 30%;
        max-height: 200px;
        box-shadow: 0 0 20px rgba(12, 12, 12, 0.5);
        min-width: 200px;
        margin: 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .chips_container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .chip_header {
        margin: 0;
        word-wrap: break-word;
    }

    .status-bar {
        width: 90%;
        height: 20px;
        background-color: #ddd;
        border-radius: 5px;
    }

    .status-bar span {
        display: block;
        height: 100%;
        background-color: #397acf;
        border-radius: 5px;
    }

    @media (prefers-color-scheme: dark) {
        .status-bar {
            background-color: #333;
        }

        .status-bar span {
            background-color: #397acf;
        }
    }

    .stats_title {
        margin: 0;
        word-wrap: break-word;
    }

    .proc_text {
        font-style: italic;
        margin: 0;
        padding: 0;
        float: left;
    }

    .status_entry {
        display: grid;
        grid-template-rows: 1fr 300px auto auto;
        grid-gap: 0.3em;
        padding: 1em;
    }

    .status_entry img {
        width: 100%;
    }

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .dark_mode {
        background-color: #fff;
        color: #000;
    }

    :global(body) {
        background-color: #fff;
        color: #000;
    }

    /* dark mode on bg_wrapper */
    @media (prefers-color-scheme: dark) {
        .dark_mode {
            background-color: #121212;
            color: #fff;
        }

        :global(body) {
            background-color: #121212;
            color: #fff;
        }
    }

    .poster {
        box-shadow: #101010 0 0 10px;
        border-radius: 3px;
        object-fit: contain;
        width: 100%;
    }

</style>
