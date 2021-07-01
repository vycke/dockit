<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch('/api/docsOverview.json');
		return { props: { path: page.path, docs: await res.json() } };
	}
</script>

<script>
	import '../styles/index.scss';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { theme } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(() => {
		if ('theme' in localStorage) theme.update(() => localStorage.getItem('theme'));
		else if (window.matchMedia('(prefers-color-scheme: light)').matches)
			theme.update(() => 'light');
	});

	export let path = '';
	export let docs;
</script>

<div class="full-height bg-back panel-l panel-s-00 panel-w-2" data-theme={$theme}>
	<Navigation {path} {docs} />
	<slot />
</div>
