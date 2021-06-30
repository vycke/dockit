import { promises as fs } from 'fs';
import fm from 'front-matter';
import { resolve } from 'path';
import renderer from '$lib/renderer';

export async function getDoc(slug, html = true) {
	const _path = resolve('docs', slug + '.md');
	const src = await fs.readFile(_path, 'utf8');
	const stats = await fs.stat(_path);
	const { body, ...matter } = fm(src);

	if (!html)
		return {
			slug,
			createdAt: stats.birthtime,
			modifiedAt: stats.mtime,
			...matter.attributes
		};

	return {
		slug,
		html: renderer(body),
		createdAt: stats.birthtime,
		modifiedAt: stats.mtime,
		...matter.attributes
	};
}

export async function getDocs() {
	const _path = resolve('docs');
	const files = await fs.readdir(_path);
	let docs = {};

	for (let i = 0; i < files.length; i++) {
		const { slug, category, title } = await getDoc(files[i].split('.md')[0]);

		if (!docs[category]) docs[category] = [];
		docs[category].push({ href: `/${slug}`, label: title, category });
		docs[category].sort((a, b) => (a.label < b.label ? -1 : 1));
	}

	// sort based on keys
	return Object.keys(docs)
		.sort()
		.reduce((r, k) => ((r[k] = docs[k]), r), {});
}
