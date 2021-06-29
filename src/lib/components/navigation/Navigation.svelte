<script>
	import Icon from '../Icon.svelte';
	import NavItem from './NavItem.svelte';
	export let path = '';

	let open = false;
	function toggle() {
		open = !open;
	}

	$: icon = open ? 'x' : 'menu';
</script>

<nav class="p-0 flex-col items-start">
	<div class="flex-row items-center full-width mb-0 px-0">
		<button class="flex-grow text-left" on:click={toggle}><Icon name={icon} /></button>
		<span class="monospace uppercase text-1">DOCS</span>
	</div>

	<ul class:visible={open} class="flow-y flow-g-000 full-width bg-gray-200">
		<NavItem label="Home" href="/" icon="home" {path} on:click={toggle} />
		<NavItem label="Timeline" href="/timeline" icon="activity" {path} on:click={toggle} />
		<NavItem label="Users" href="/users" icon="users" {path} on:click={toggle} />
		<NavItem label="Settings" href="/settings" icon="settings" {path} on:click={toggle} />
	</ul>
</nav>

<style>
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
			top: 7rem;
			left: 0;
			max-height: 0;
			overflow-y: hidden;
			width: 100%;
			transition: all 100ms ease-in-out;
		}

		ul.visible {
			max-height: calc(100vh - 10rem);
			overflow-y: auto;
			border-bottom: 1px solid var(--color-gray-300);
		}
	}
</style>
