<script>
	import { categories, name, source, version } from '$lib/constants';
	import Icon from '../Icon.svelte';
	import Switch from '../Switch.svelte';
	import NavGroup from './NavGroup.svelte';
	import { theme } from '$lib/store';

	export let path = '';
	export let docs;

	let open = false;
	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function updateTheme() {
		theme.update((t) => (t === 'light' ? 'dark' : 'light'));
		localStorage.setItem('theme', $theme === 'light' ? 'dark' : 'light');
	}

	$: icon = open ? 'x' : 'menu';
</script>

<nav class="p-1 flex-col items-start bg-back text-front" data-open={open}>
	<div class="flex-row items-center full-width">
		<button class="flex-grow text-left flex-row items-center" on:click={toggle}>
			<Icon name={icon} />
		</button>
		<div class="flex-row items-center">
			<a href="/" class="name | no-underline bold text-1">{name}</a>
			<a
				href={source}
				class="monospace lh-1 text-000 p-000 radius-000 border-hover border-w-1 ml-0"
			>
				v{version}
			</a>
		</div>
	</div>

	<ul role="list" class="pt-2 flow-y flow-g-000 full-width bg-back">
		{#each Object.keys(docs) as category, i}
			<NavGroup
				on:click={close}
				{path}
				icon={categories[category]}
				title={category}
				items={docs[category]}
				class={i > 0 ? 'mt-2' : ''}
			/>
		{/each}

		<Switch
			checked={$theme === 'dark'}
			label="Dark mode?"
			class="flow-grow"
			on:click={updateTheme}
		/>
		<li class="text-00 text-left">
			Made with ♥️ by <a href="https://crinkles.io">Crinkles</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 100;
	}

	ul {
		list-style: none;
	}

	@media (min-width: 42rem) {
		nav {
			height: 100vh;
			overflow-y: auto;
		}

		button {
			display: none;
		}

		ul {
			height: 100%;
		}
	}

	@media (max-width: 42rem) {
		nav {
			border-bottom: 1px solid var(--color-hover);
		}

		nav[data-open='true'] {
			height: 100vh;
		}

		ul {
			position: absolute;
			top: 3.5rem;
			left: 0;
			max-height: 0;
			overflow-y: hidden;
			width: 100%;
			transition: all 100ms ease-in-out;
		}

		nav[data-open='true'] ul {
			max-height: calc(100vh - 4.5rem);
			height: 100%;
			overflow-y: auto;
			border-bottom: 1px solid var(--color-hover);
			padding: var(--spacing-0);
		}
	}
</style>
