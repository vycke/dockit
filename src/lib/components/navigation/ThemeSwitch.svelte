<script>
	import Switch from '../layout/Switch.svelte';
	import { theme } from '$lib/store';

	let klass = '';
	export { klass as class };

	function updateTheme() {
		theme.update((t) => {
			const newTheme = t === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			document.documentElement.dataset.theme = newTheme;
			return newTheme;
		});
	}
</script>

<Switch
	checked={$theme === 'dark'}
	label="Dark mode?"
	class="mt-2 {klass}"
	on:click={updateTheme}
/>
