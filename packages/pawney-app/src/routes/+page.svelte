<script lang="ts">
import type { PageData } from "./$types";

export let data: PageData;
</script>

<h1 class="text-xl font-bold">Welcome to Pawney</h1>
<p> Information about the ledger ; server: {data.ledger.server}, version: {data.ledger.version}</p>

