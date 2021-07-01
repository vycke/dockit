<script>
	import { categories, name, source, version } from '$lib/constants';
	import Icon from '../Icon.svelte';
	import NavGroup from './NavGroup.svelte';

	export let path = '';
	export let docs;

	let open = false;
	function toggle() {
		open = !open;
	}

	$: icon = open ? 'x' : 'menu';
</script>

<nav class="p-1 flex-col items-start">
	<div class="flex-row items-center full-width">
		<button class="flex-grow text-left flex-row items-center" on:click={toggle}
			><Icon name={icon} /></button
		>
		<div class="flex-row items-center">
			<a href="/" class="name | bold text-1">{name}</a>
			<a
				href={source}
				class="monospace lh-1 text-000 p-000 radius-000 border-gray-300 border-w-1 ml-0"
			>
				v{version}
			</a>
		</div>
	</div>

	<ul role="list" class:visible={open} class="mt-2 flow-y flow-g-000 full-width bg-gray-200">
		{#each Object.keys(docs) as category, i}
			<NavGroup
				on:click={toggle}
				{path}
				icon={categories[category]}
				title={category}
				items={docs[category]}
				class={i > 0 ? 'mt-2' : ''}
			/>
		{/each}
	</ul>
</nav>

<style>
	a.name {
		color: var(--color-green-200);
	}

	ul {
		list-style: none;
	}

	@media (min-width: 42rem) {
		nav {
			max-height: 100vh;
			overflow-y: auto;
		}

		button {
			display: none;
		}
	}

	@media (max-width: 42rem) {
		nav {
			position: relative;
		}

		ul {
			position: absolute;
			top: 4rem;
			left: 0;
			max-height: 0;
			overflow-y: hidden;
			width: 100%;
			box-shadow: var(--elevation-2);
			transition: all 100ms ease-in-out;
		}

		ul.visible {
			max-height: calc(100vh - 10rem);
			overflow-y: auto;
			border-bottom: 1px solid var(--color-gray-300);
			padding: var(--spacing-0);
		}
	}
</style>
