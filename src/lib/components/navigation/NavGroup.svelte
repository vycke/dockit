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
	<Icon name={icon || 'circle'} class="text-accent" attrs={{ height: 20 }} />
	<span class="text-00 monospace uppercase text-accent">{title}</span>
</li>

{#each items as { label, href, icon }}
	<NavItem {label} {href} {icon} {path} on:click />
{/each}

<style>
	li {
		border-bottom: 1px solid var(--color-hover);
	}
</style>
