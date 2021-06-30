<script>
	import Icon from '../Icon.svelte';
	import NavItem from './NavItem.svelte';

	export let title;
	export let icon;
	export let items;
	export let path;
	let klass;
	export { klass as class };
</script>

<li class="flow-x flow-g-00 items-center pb-000 {klass}">
	<Icon name={icon} class="text-green-200" attrs={{ height: 20 }} />
	<span class="text-00 monospace uppercase">{title}</span>
</li>

{#each items as item}
	<NavItem {...item} {path} on:click />
{/each}

<style>
	li {
		border-bottom: 1px solid var(--color-gray-300);
	}
</style>
