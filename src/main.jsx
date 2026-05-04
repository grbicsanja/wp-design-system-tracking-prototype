import { createRoot } from 'react-dom/client';
import { Component } from 'react';

// Design tokens: --wpds-* CSS custom properties
import './design-tokens.css';

// WordPress component styles
import '@wordpress/components/build-style/style.css';

// DataViews styles (not injected via JS — requires explicit import)
import '@wordpress/dataviews/build-style/style.css';

// Override: top-align field labels and allow field values to wrap
import './dataviews-overrides.css';

import KanbanBoard from './kanban-board.jsx';

class ErrorBoundary extends Component {
	constructor( props ) {
		super( props );
		this.state = { error: null };
	}
	static getDerivedStateFromError( error ) {
		return { error };
	}
	render() {
		if ( this.state.error ) {
			return (
				<pre style={ { padding: 24, color: 'red', whiteSpace: 'pre-wrap' } }>
					{ String( this.state.error ) }
					{ '\n\n' }
					{ this.state.error?.stack }
				</pre>
			);
		}
		return this.props.children;
	}
}

createRoot( document.getElementById( 'root' ) ).render(
	<ErrorBoundary>
		<KanbanBoard />
	</ErrorBoundary>
);
