<script lang="ts">
    import type {PageData} from './$types';

    export let data: PageData;
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
        <h1>Encode Status Page</h1>
    </div>

    {#await data.stream.workers}
        <p>loading</p>
    {:then workers}
        {#if workers.length !== 0}
            <h3>Workers</h3>
            <div class="chips_container">
                {#each workers as worker}
                    <!-- display id status utilization fields in a chips like design-->
                    <!--if worker.lastupdate was 2mins+ ago display in gray-->
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

                {/each}
            </div>

        {/if}
    {:catch error}
        <p>error: {error.message}</p>
    {/await}

    {#await data.stream.statues}
        <p>loading...</p>
    {:then statuses}
        <div class="dark_mode">
            {#if statuses.length === 0}
                <p>nothing here ngl</p>
                <img src="/sticker.webp" alt="sticker">
            {:else}
                <h2>In Progress</h2>
                <div class="wrapper">
                    {#each statuses as status}
                        <div class="status_entry dark_mode">
                            <h3 class="stats_title">{status.title}</h3>
                            <img class="poster" height="300" width="200" src="{status.img}" alt="Movie Poster">
                            <div class="bar">
                                <div class="status-bar">
                                    <span style="width: {status.status}%;"></span>

                                </div>
                                <p class="proc_text">{status.status}%</p>
                            </div>
                            <p>Phase: {status.phase}</p>
                        </div>
                    {/each}
                </div>

            {/if}
        </div>

    {:catch error}
        <p>error: {error.message}</p>
    {/await}


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


    .bar {
        display: grid;
        /*  80% 20% horizontal split */
        grid-template-columns: 80% 20%;
        margin-bottom: 1em;
    }

    .chip {
        background-color: #232323;
        border-radius: 5px;
        padding: 1em;
        width: 30%;
        max-height: 200px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
        object-fit: contain;
        width: 100%;
    }

</style>
