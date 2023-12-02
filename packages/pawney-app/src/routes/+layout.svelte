<script lang="ts">
import HeaderBar from "$lib/client/components/HeaderBar.svelte";
import "../app.css";
import type { LayoutData } from "./$types";

export let data: LayoutData;

</script>

<div class="container mx-auto flex flex-col space-y-4">
    <HeaderBar userInfo={data.user ?? null}/>
    <div class="px-2">
        <slot />
    </div>
</div>

