import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

// The prototype file lives in the parent directory, outside this project root.
// Fix 1: allow Vite's dev server to serve files from the parent directory.
// Fix 2: alias all @wordpress/* so they resolve from local node_modules.
// Fix 3: pre-bundle every @wordpress package so Vite optimises them in dev
//         mode the same way esbuild bundles them for production.
export default defineConfig( {
	plugins: [ react() ],
	server: {
		fs: {
			allow: [ '..', '.' ],
		},
	},
	resolve: {
		alias: {
			'@wordpress/element':    'react',
			'@wordpress/ui':         path.resolve( __dirname, 'node_modules/@wordpress/ui' ),
			'@wordpress/components': path.resolve( __dirname, 'node_modules/@wordpress/components' ),
			'@wordpress/admin-ui':   path.resolve( __dirname, 'node_modules/@wordpress/admin-ui' ),
			'@wordpress/dataviews':  path.resolve( __dirname, 'node_modules/@wordpress/dataviews' ),
			// @base-ui/react is nested inside @wordpress/ui's own node_modules
			'@base-ui/react':        path.resolve( __dirname, 'node_modules/@wordpress/ui/node_modules/@base-ui/react' ),
		},
	},
	optimizeDeps: {
		include: [
			'react',
			'react-dom',
			'@wordpress/ui',
			'@wordpress/components',
			'@wordpress/admin-ui',
			'@wordpress/dataviews',
			'@wordpress/compose',
			'@wordpress/i18n',
			'@wordpress/a11y',
			'@wordpress/keycodes',
			'@wordpress/icons',
			'@wordpress/primitives',
			'clsx',
		],
	},
} );
