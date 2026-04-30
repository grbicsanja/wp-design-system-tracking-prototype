// Prototype: Design System Component Browser
// Components: Page (@wordpress/admin-ui), Tabs (@wordpress/ui),
//             DataViews (@wordpress/dataviews), Badge (@wordpress/ui)
import { Page } from '@wordpress/admin-ui';
import { Tabs, Badge } from '@wordpress/ui';
import { DataViews } from '@wordpress/dataviews';
import { SearchControl } from '@wordpress/components';
import { useState, useMemo } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────
// Status source of truth:
//   Ready          — Storybook tag "manifest" (@wordpress/components)
//   In Development — Storybook tag "status-wip" + all @wordpress/ui components
//                    (@wordpress/ui v0.12.0 is actively developed, breaking changes)
//   Unstable       — Storybook tag "status-private" (locked private API)
//                    or "status-experimental"

const SB = ( id ) => `https://wordpress.github.io/gutenberg/?path=/docs/${ id }`;
const GH = ( pkg, slug ) => `https://github.com/WordPress/gutenberg/tree/trunk/packages/${ pkg }/src/${ slug }`;

const ITEMS = {
	// Storybook tag: "manifest" — stable public API in @wordpress/components
	ready: [
		{
			id: 'button',
			title: 'Button',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Button',
			storybook: SB( 'components-button--docs' ),
			github: GH( 'components', 'button' ),
			figma: '#',
		},
		{
			id: 'modal',
			title: 'Modal',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Modal',
			storybook: SB( 'components-modal--docs' ),
			github: GH( 'components', 'modal' ),
			figma: '#',
		},
		{
			id: 'tooltip',
			title: 'Tooltip',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Tooltip',
			storybook: SB( 'components-tooltip--docs' ),
			github: GH( 'components', 'tooltip' ),
			figma: '#',
		},
		{
			id: 'notice',
			title: 'Notice',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Notice',
			storybook: SB( 'components-notice--docs' ),
			github: GH( 'components', 'notice' ),
			figma: '#',
		},
		{
			id: 'popover',
			title: 'Popover',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Popover',
			storybook: SB( 'components-popover--docs' ),
			github: GH( 'components', 'popover' ),
			figma: '#',
		},
		{
			id: 'panel',
			title: 'Panel',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Panel',
			storybook: SB( 'components-panel--docs' ),
			github: GH( 'components', 'panel' ),
			figma: '#',
		},
		{
			id: 'spinner',
			title: 'Spinner',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Spinner',
			storybook: SB( 'components-spinner--docs' ),
			github: GH( 'components', 'spinner' ),
			figma: '#',
		},
		{
			id: 'text-control',
			title: 'TextControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=TextControl',
			storybook: SB( 'components-textcontrol--docs' ),
			github: GH( 'components', 'text-control' ),
			figma: '#',
		},
		{
			id: 'toggle-control',
			title: 'ToggleControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ToggleControl',
			storybook: SB( 'components-togglecontrol--docs' ),
			github: GH( 'components', 'toggle-control' ),
			figma: '#',
		},
		{
			id: 'select-control',
			title: 'SelectControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=SelectControl',
			storybook: SB( 'components-selectcontrol--docs' ),
			github: GH( 'components', 'select-control' ),
			figma: '#',
		},
		{
			id: 'checkbox-control',
			title: 'CheckboxControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=CheckboxControl',
			storybook: SB( 'components-checkboxcontrol--docs' ),
			github: GH( 'components', 'checkbox-control' ),
			figma: '#',
		},
		{
			id: 'navigator',
			title: 'Navigator',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Navigator',
			storybook: SB( 'components-navigator--docs' ),
			github: GH( 'components', 'navigator' ),
			figma: '#',
		},
		{
			id: 'snackbar',
			title: 'Snackbar',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Snackbar',
			storybook: SB( 'components-snackbar--docs' ),
			github: GH( 'components', 'snackbar' ),
			figma: '#',
		},
		{
			id: 'progress-bar',
			title: 'ProgressBar',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ProgressBar',
			storybook: SB( 'components-progressbar--docs' ),
			github: GH( 'components', 'progress-bar' ),
			figma: '#',
		},
	],

	// @wordpress/ui v0.12.0 — actively developed, frequent breaking changes
	// (source: packages/ui/CHANGELOG.md)
	// Also includes CustomSelectControl v2 (Storybook tag: "status-wip")
	'in-development': [
		{
			id: 'card',
			title: 'Card',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Card',
			storybook: '#',
			github: GH( 'ui', 'card' ),
			figma: '#',
		},
		{
			id: 'collapsible-card',
			title: 'CollapsibleCard',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=CollapsibleCard',
			storybook: '#',
			github: GH( 'ui', 'collapsible-card' ),
			figma: '#',
		},
		{
			id: 'stack',
			title: 'Stack',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Stack',
			storybook: '#',
			github: GH( 'ui', 'stack' ),
			figma: '#',
		},
		{
			id: 'text-primitive',
			title: 'Text',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Text',
			storybook: '#',
			github: GH( 'ui', 'text' ),
			figma: '#',
		},
		{
			id: 'input-control-ui',
			title: 'InputControl',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=InputControl',
			storybook: '#',
			github: GH( 'ui', 'form' ),
			figma: '#',
		},
		{
			id: 'drawer',
			title: 'Drawer',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Drawer',
			storybook: '#',
			github: GH( 'ui', 'dialog' ),
			figma: '#',
		},
		{
			id: 'autocomplete',
			title: 'Autocomplete',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Autocomplete',
			storybook: '#',
			github: GH( 'ui', 'form' ),
			figma: '#',
		},
		{
			id: 'custom-select-control-v2',
			title: 'CustomSelectControl v2',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=CustomSelectControl+v2',
			storybook: SB( 'components-customselectcontrol-v2--docs' ),
			github: GH( 'components', 'custom-select-control-v2' ),
			figma: '#',
		},
	],

	// Storybook tag: "status-private" (locked private API) or "status-experimental"
	unstable: [
		{
			id: 'badge',
			title: 'Badge',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=Badge',
			storybook: SB( 'components-badge--docs' ),
			github: GH( 'components', 'badge' ),
			figma: '#',
		},
		{
			id: 'tabs',
			title: 'Tabs',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=Tabs',
			storybook: SB( 'components-tabs--docs' ),
			github: GH( 'components', 'tabs' ),
			figma: '#',
		},
		{
			id: 'confirm-dialog',
			title: 'ConfirmDialog',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=ConfirmDialog',
			storybook: SB( 'components-confirmdialog--docs' ),
			github: GH( 'components', 'confirm-dialog' ),
			figma: '#',
		},
		{
			id: 'hstack',
			title: 'HStack',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=HStack',
			storybook: SB( 'components-hstack--docs' ),
			github: GH( 'components', 'h-stack' ),
			figma: '#',
		},
		{
			id: 'vstack',
			title: 'VStack',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=VStack',
			storybook: SB( 'components-vstack--docs' ),
			github: GH( 'components', 'v-stack' ),
			figma: '#',
		},
		{
			id: 'tree-grid',
			title: 'TreeGrid',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=TreeGrid',
			storybook: SB( 'components-treegrid--docs' ),
			github: GH( 'components', 'tree-grid' ),
			figma: '#',
		},
	],
};

// ─── Fields ───────────────────────────────────────────────────────────────────

const fields = [
	{
		id: 'title',
		label: 'Component',
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'image',
		label: 'Preview',
		enableSorting: false,
		enableHiding: false,
		render: ( { item } ) => (
			<img
				src={ item.image }
				alt={ item.title }
				style={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }
			/>
		),
	},
	{
		id: 'links',
		label: 'Links',
		enableSorting: false,
		enableHiding: false,
		render: ( { item } ) => (
			<div
				style={ {
					display: 'flex',
					gap: 'var(--wpds-dimension-gap-sm)',
					flexWrap: 'wrap',
					padding: '2px 0',
				} }
			>
				<a
					href={ item.figma }
					target="_blank"
					rel="noreferrer"
					style={ { color: 'var(--wpds-color-fg-interactive-brand)', fontSize: 'var(--wpds-typography-font-size-sm)', textDecoration: 'none', fontWeight: 'var(--wpds-typography-font-weight-medium)' } }
				>
					Figma ↗
				</a>
				<span style={ { color: 'var(--wpds-color-stroke-surface-neutral)' } }>·</span>
				<a
					href={ item.storybook }
					target="_blank"
					rel="noreferrer"
					style={ { color: 'var(--wpds-color-fg-interactive-brand)', fontSize: 'var(--wpds-typography-font-size-sm)', textDecoration: 'none', fontWeight: 'var(--wpds-typography-font-weight-medium)' } }
				>
					Storybook ↗
				</a>
				<span style={ { color: 'var(--wpds-color-stroke-surface-neutral)' } }>·</span>
				<a
					href={ item.github }
					target="_blank"
					rel="noreferrer"
					style={ { color: 'var(--wpds-color-fg-interactive-brand)', fontSize: 'var(--wpds-typography-font-size-sm)', textDecoration: 'none', fontWeight: 'var(--wpds-typography-font-weight-medium)' } }
				>
					GitHub ↗
				</a>
			</div>
		),
	},
];

// ─── Per-tab DataViews panel ──────────────────────────────────────────────────

function ComponentGrid( { items } ) {
	const [ view, setView ] = useState( {
		type: 'grid',
		page: 1,
		perPage: 20,
		titleField: 'title',
		mediaField: 'image',
		fields: [ 'links' ],
		showTitle: true,
		showMedia: true,
	} );

	return (
		<div style={ { padding: 'var(--wpds-dimension-padding-2xl)' } }>
			<DataViews
				data={ items }
				fields={ fields }
				view={ view }
				onChangeView={ setView }
				paginationInfo={ { totalItems: items.length, totalPages: 1 } }
				defaultLayouts={ { grid: {} } }
				getItemId={ ( item ) => item.id }
				search={ false }
			/>
		</div>
	);
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function ComponentBrowser() {
	const [ search, setSearch ] = useState( '' );

	const filteredItems = useMemo( () => {
		if ( ! search.trim() ) return ITEMS;
		const q = search.toLowerCase();
		const filter = ( list ) =>
			list.filter( ( item ) => item.title.toLowerCase().includes( q ) );
		return {
			ready:            filter( ITEMS.ready ),
			'in-development': filter( ITEMS[ 'in-development' ] ),
			unstable:         filter( ITEMS.unstable ),
		};
	}, [ search ] );

	return (
		<div style={ { height: '100vh', fontFamily: 'var(--wpds-typography-font-family-body)' } }>
			<Page
				title="Design System"
				subTitle="WordPress UI component library"
				showSidebarToggle={ false }
				badges={ <Badge intent="informational">v0.11</Badge> }
				actions={
					<SearchControl
						label="Search components"
						placeholder="Search…"
						value={ search }
						onChange={ setSearch }
						style={ { width: '220px' } }
					/>
				}
			>
				<Tabs.Root defaultValue="ready" style={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
					<div
						style={ {
							borderBottom: '1px solid var(--wpds-color-stroke-surface-neutral-weak)',
							paddingInline: 'var(--wpds-dimension-padding-2xl)',
							background: 'var(--wpds-color-bg-surface-neutral-strong)',
						} }
					>
						<Tabs.List>
							<Tabs.Tab value="ready">
								Ready
								{ search && (
									<Badge intent="none" style={ { marginInlineStart: '6px' } }>
										{ String( filteredItems.ready.length ) }
									</Badge>
								) }
							</Tabs.Tab>
							<Tabs.Tab value="in-development">
								In Development
								{ search && (
									<Badge intent="none" style={ { marginInlineStart: '6px' } }>
										{ String( filteredItems[ 'in-development' ].length ) }
									</Badge>
								) }
							</Tabs.Tab>
							<Tabs.Tab value="unstable">
								Unstable
								{ search && (
									<Badge intent="none" style={ { marginInlineStart: '6px' } }>
										{ String( filteredItems.unstable.length ) }
									</Badge>
								) }
							</Tabs.Tab>
						</Tabs.List>
					</div>

					<div style={ { flex: 1, overflow: 'auto' } }>
						<Tabs.Panel value="ready">
							<ComponentGrid items={ filteredItems.ready } />
						</Tabs.Panel>
						<Tabs.Panel value="in-development">
							<ComponentGrid items={ filteredItems[ 'in-development' ] } />
						</Tabs.Panel>
						<Tabs.Panel value="unstable">
							<ComponentGrid items={ filteredItems.unstable } />
						</Tabs.Panel>
					</div>
				</Tabs.Root>
			</Page>
		</div>
	);
}
