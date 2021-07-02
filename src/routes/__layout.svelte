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
		let _theme = 'dark';
		if ('theme' in localStorage) _theme = localStorage.getItem('theme');
		else if (window.matchMedia('(prefers-color-scheme: light)').matches) _theme = 'light';

		theme.update(() => _theme);
		document.documentElement.dataset.theme = _theme;
	});

	export let path = '';
	export let docs;
</script>

<div class="full-height bg-back panel-l panel-s-0 panel-w-3">
	<Navigation {path} {docs} />
	<slot />
</div>
