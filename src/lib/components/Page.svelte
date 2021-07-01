<script>
	export let title = '';
</script>

<main class="p-1">
	<h1 class="mb-1 text-1">{title}</h1>
	<div class="panel-r panel-s-0 panel-w-3 panel-g-2">
		<slot />
	</div>
</main>
