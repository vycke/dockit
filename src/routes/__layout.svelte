<script context="module">
	import { group } from '$lib/search';

	export async function load({ page, fetch }) {
		const res = await fetch('/api/docsOverview.json');
		const docs = await res.json();
		return { props: { path: page.path, docs } };
	}
</script>

<script>
	import '../styles/index.scss';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { theme } from '$lib/store';
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let path = '';
	export let docs;

	onMount(() => {
		let _theme = 'dark';
		if ('theme' in localStorage) _theme = localStorage.getItem('theme');
		else if (window.matchMedia('(prefers-color-scheme: light)').matches) _theme = 'light';

		theme.update(() => _theme);
		document.documentElement.dataset.theme = _theme;
	});

	beforeUpdate(() => {
		if (path === '' || path === '/') {
			const href = group(docs)[Object.keys(group(docs))[0]][0].href;
			goto(href);
		}
	});
</script>

<svelte:head>
	<meta name="color-scheme" content={$theme} />
</svelte:head>

<div class="bg-back panel-l panel-s-0 panel-w-3">
	<Navigation {path} {docs} />
	<slot />
</div>
