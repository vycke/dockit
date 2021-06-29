<script>
	import { fly } from 'svelte/transition';
	export let title = '';
</script>

<main class="p-0" in:fly={{ y: 50, duration: 250 }}>
	<h1 class="monospace mb-2 text-1">.. / {title}</h1>
	<slot />
</main>
