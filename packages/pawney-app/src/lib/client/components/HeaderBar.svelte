<script lang="ts">
import type { UserInfo } from "$lib/shared/user";


export let userInfo: UserInfo | null = null;

</script>

<div class="flex flex-row w-full p-4 justify-between">
    <div>
        <h1 class="text-xl font-bold">Pawney</h1>
    </div>
    <div>
        {#if userInfo}
            <p>{userInfo.email} (<a href="/logout" data-sveltekit-reload>Logout</a>)</p>
        {:else}
            <p><a href="/login">Login</a></p>
        {/if}
    </div>
</div>
