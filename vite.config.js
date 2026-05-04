import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export default defineConfig( {
	plugins: [ react() ],
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
