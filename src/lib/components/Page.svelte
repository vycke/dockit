<script>
	export let title = '';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="center center-g-1 center-w-4 text-front">
	<h1 class="my-1">{title}</h1>
	<slot />
</main>

<style>
	h1 {
		text-transform: capitalize;
	}

	main {
		min-height: calc(100vh - 76px);
	}
</style>
