<script>
	import Icon from '../Icon.svelte';

	export let label = '';
	export let href = '/';
	export let icon;
	export let path;
</script>

<li
	class:selected={href === path}
	class:bg-hover={href === path}
	class:py-000={icon}
	class:py-0000={!icon}
	class="nav-item | px-00 radius-00 hover:bg-hover transition"
>
	<a {href} class="no-underline flow-x flow-g-0 items-center" on:click>
		{#if icon}
			<Icon name={icon} class="transition text-gray-400" />
		{/if}
		<span>{label}</span>
	</a>
</li>

<style>
	:global(.nav-item:hover svg) {
		color: var(--color-gray-500);
	}
	:global(.nav-item:hover span) {
		font-weight: 600;
	}

	.selected span {
		font-weight: 600;
	}

	:global(.nav-item.selected svg) {
		color: var(--color-accent);
	}
</style>
