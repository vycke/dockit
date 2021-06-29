<script context="module">
	export function load({ page }) {
		return { props: { path: page.path } };
	}
</script>

<script>
	import '../styles/index.scss';
	import Navigation from '$lib/components/navigation/Navigation.svelte';

	export let path = '';
</script>

<div class="panel-l panel-p-13 panel-w-40 p-1">
	<Navigation {path} />
	<slot />
</div>
