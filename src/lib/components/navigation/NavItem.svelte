<script>
	import Icon from '../layout/Icon.svelte';
	import { page } from '$app/stores';

	export let label = '';
	export let href = '/';
	export let icon;
</script>

<li
	class:selected={href === $page.path}
	class:bg-hover={href === $page.path}
	class:py-000={icon}
	class:py-0000={!icon}
	class="nav-item | px-00 radius-00 hover:bg-hover transition"
>
	<a {href} class="no-underline flow-x flow-g-0 items-center" on:click sveltekit:prefetch>
		{#if icon}
			<Icon name={icon} class="transition text-gray-400" />
		{/if}
		<span class="no-underline">{label}</span>
	</a>
</li>

<style>
	:global(.nav-item:hover svg) {
		color: var(--color-gray-500);
	}

	.nav-item:hover span {
		font-weight: 600;
	}

	.selected span {
		font-weight: 600;
	}

	:global(.nav-item.selected svg) {
		color: var(--color-accent);
	}
</style>
