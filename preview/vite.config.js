import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

// The prototype file lives in the parent directory, outside this project root,
// so Vite can't auto-resolve @wordpress/* from there. Alias them explicitly.
export default defineConfig( {
	plugins: [ react() ],
	resolve: {
		alias: {
			'@wordpress/element':    'react',
			'@wordpress/ui':         path.resolve( __dirname, 'node_modules/@wordpress/ui' ),
			'@wordpress/components': path.resolve( __dirname, 'node_modules/@wordpress/components' ),
			'@wordpress/admin-ui':   path.resolve( __dirname, 'node_modules/@wordpress/admin-ui' ),
			'@wordpress/dataviews':  path.resolve( __dirname, 'node_modules/@wordpress/dataviews' ),
		},
	},
	optimizeDeps: {
		include: [ 'react', 'react-dom' ],
	},
} );
