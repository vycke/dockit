<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch('/api/docsOverview.json');
		return { props: { path: page.path, docs: await res.json() } };
	}
</script>

<script>
	import '../styles/index.scss';
	import Navigation from '$lib/components/navigation/Navigation.svelte';

	export let path = '';
	export let docs;
</script>

<div class="pancake-header" />
<div class="panel-l panel-s-0 panel-w-2">
	<Navigation {path} {docs} />
	<slot />
</div>

<div class="p-0 text-00 text-right">
	Made with ♥️ by <a href="https://crinkles.io">Crinkles</a>
</div>
