// Prototype: Design System Component Browser
// Components: Page (@wordpress/admin-ui), Tabs (@wordpress/ui),
//             DataViews (@wordpress/dataviews), Badge (@wordpress/ui)
import { Page } from '@wordpress/admin-ui';
import { Tabs, Badge } from '@wordpress/ui';
import { DataViews } from '@wordpress/dataviews';
import { SearchControl } from '@wordpress/components';
import { useState, useMemo } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const ITEMS = {
	ready: [
		{
			id: 'button',
			title: 'Button',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Button',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'badge',
			title: 'Badge',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Badge',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'card',
			title: 'Card',
			image: 'https://placehold.co/400x220/007cba/ffffff?text=Card',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'tabs',
			title: 'Tabs',
			image: 'https://placehold.co/400x220/00a32a/ffffff?text=Tabs',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'modal',
			title: 'Modal',
			image: 'https://placehold.co/400x220/8c1ad4/ffffff?text=Modal',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'notice',
			title: 'Notice',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=Notice',
			figma: '#',
			storybook: '#',
			github: '#',
		},
	],
	'in-development': [
		{
			id: 'dataviews',
			title: 'DataViews',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=DataViews',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'collapsible-card',
			title: 'CollapsibleCard',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=CollapsibleCard',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'command-palette',
			title: 'CommandPalette',
			image: 'https://placehold.co/400x220/007cba/ffffff?text=CommandPalette',
			figma: '#',
			storybook: '#',
			github: '#',
		},
	],
	unstable: [
		{
			id: 'ai-control',
			title: 'AIControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=AIControl',
			figma: '#',
			storybook: '#',
			github: '#',
		},
		{
			id: 'gesture-area',
			title: 'GestureArea',
			image: 'https://placehold.co/400x220/8c1ad4/ffffff?text=GestureArea',
			figma: '#',
			storybook: '#',
			github: '#',
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
