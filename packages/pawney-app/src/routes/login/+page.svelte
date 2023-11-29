<script>

import { enhance } from "$app/forms";

</script>

<div class="w-1/4 border rounded-xl mx-auto my-4 py-4 px-4 flex flex-col space-y-16">
    <div>
        <h1 class="text-3xl font-bold text-center">Login to pawney</h1>
    </div>
    <form class="flex flex-row space-x-2" method="post" use:enhance>
        <input type="text" placeholder="E-mail" class="w-full border rounded-xl px-4 py-2 flex-grow" name="email" />
        <input type="submit" value="Login" class="bg-blue-500 text-white rounded-xl px-4 py-2 flex-grow-0 cursor-pointer hover:bg-blue-600 active:bg-blue-700" />
    </form>
</div>
