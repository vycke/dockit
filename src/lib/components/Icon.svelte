<script>
	import * as feather from 'feather-icons';
	let className = '';
	export { className as class };

	export let name,
		attrs = undefined;

	$: svg = name ? feather.icons[name].toSvg({ ...attrs, class: className }) : '';
</script>

<span class={className}>{@html svg}</span>

<style>
	span {
		line-height: 1;
	}
</style>
