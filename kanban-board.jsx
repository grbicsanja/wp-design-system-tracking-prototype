// Prototype: Design System Component Browser
// Components: Page (@wordpress/admin-ui), Tabs (@wordpress/ui),
//             DataViews (@wordpress/dataviews), Badge (@wordpress/ui)
import { Page } from '@wordpress/admin-ui';
import { Tabs, Badge, Card, CollapsibleCard, Stack, Text, Dialog, InputControl } from '@wordpress/ui';
import { DataViews } from '@wordpress/dataviews';
import {
	SearchControl,
	Button, Modal, Tooltip, Notice, Popover,
	Panel, PanelBody, PanelRow,
	Spinner, TextControl, ToggleControl, SelectControl,
	CheckboxControl, ProgressBar, Snackbar, TabPanel,
	Navigator,
	__experimentalConfirmDialog as ConfirmDialog,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalTreeGrid as TreeGrid,
	__experimentalTreeGridRow as TreeGridRow,
	__experimentalTreeGridCell as TreeGridCell,
} from '@wordpress/components';
import { useState, useMemo, Fragment } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────
// Status source of truth:
//   Ready          — componentStatus.status "stable" (@wordpress/components)
//   In Development — Storybook tag "status-wip" + all @wordpress/ui components
//                    (@wordpress/ui v0.12.0 is actively developed, breaking changes)
//   Unstable       — componentStatus.status absent or non-stable

const SB = ( id ) => `https://wordpress.github.io/gutenberg/?path=/docs/${ id }`;
const GH = ( pkg, slug ) => `https://github.com/WordPress/gutenberg/tree/trunk/packages/${ pkg }/src/${ slug }`;
// WPDS (Gutenberg 22.3) — file root (for components without a dedicated page)
const FIGMA_WPDS = 'https://www.figma.com/design/jMgzw8IhsMC4gpMbMko4lv/WPDS--Gutenberg-22.3-';
// WPDS — deep links to specific component pages (node IDs from file scan)
const FIGMA_WPDS_PAGE = ( id ) => `https://www.figma.com/design/jMgzw8IhsMC4gpMbMko4lv/WPDS--Gutenberg-22.3-?node-id=${ id }`;
// @wordpress/ui — file root (for components without a dedicated page)
const FIGMA_UI = 'https://www.figma.com/design/nm9D3Qm04vVkWndsVo9ERP/-wordpress-ui';
// @wordpress/ui — deep links to specific component pages (node IDs from file scan)
const FIGMA_UI_PAGE = ( id ) => `https://www.figma.com/design/nm9D3Qm04vVkWndsVo9ERP?node-id=${ id }`;

const ITEMS = {
	// Storybook tag: "manifest" — stable public API in @wordpress/components
	ready: [
		{
			id: 'button',
			title: 'Button',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Button',
			storybook: SB( 'components-button--docs' ),
			github: GH( 'components', 'button' ),
			figma: FIGMA_UI_PAGE( '1-22' ),
		},
		{
			id: 'modal',
			title: 'Modal',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Modal',
			storybook: SB( 'components-modal--docs' ),
			github: GH( 'components', 'modal' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'tooltip',
			title: 'Tooltip',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Tooltip',
			storybook: SB( 'components-tooltip--docs' ),
			github: GH( 'components', 'tooltip' ),
			figma: FIGMA_UI_PAGE( '1-27' ),
		},
		{
			id: 'notice',
			title: 'Notice',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Notice',
			storybook: SB( 'components-notice--docs' ),
			github: GH( 'components', 'notice' ),
			figma: FIGMA_WPDS,
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
			figma: FIGMA_WPDS,
		},
		{
			id: 'spinner',
			title: 'Spinner',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Spinner',
			storybook: SB( 'components-spinner--docs' ),
			github: GH( 'components', 'spinner' ),
			figma: FIGMA_WPDS_PAGE( '3343-37987' ),
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
			figma: FIGMA_WPDS_PAGE( '991-34620' ),
		},
		{
			id: 'select-control',
			title: 'SelectControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=SelectControl',
			storybook: SB( 'components-selectcontrol--docs' ),
			github: GH( 'components', 'select-control' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'checkbox-control',
			title: 'CheckboxControl',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=CheckboxControl',
			storybook: SB( 'components-checkboxcontrol--docs' ),
			github: GH( 'components', 'checkbox-control' ),
			figma: FIGMA_WPDS_PAGE( '991-34618' ),
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
			figma: FIGMA_WPDS,
		},
		{
			id: 'progress-bar',
			title: 'ProgressBar',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ProgressBar',
			storybook: SB( 'components-progressbar--docs' ),
			github: GH( 'components', 'progress-bar' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'tabs',
			title: 'Tabs',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Tabs',
			storybook: SB( 'components-tabs--docs' ),
			github: GH( 'components', 'tabs' ),
			figma: FIGMA_UI_PAGE( '1-21' ),
		},
		{
			id: 'confirm-dialog',
			title: 'ConfirmDialog',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ConfirmDialog',
			storybook: SB( 'components-confirmdialog--docs' ),
			github: GH( 'components', 'confirm-dialog' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'tree-grid',
			title: 'TreeGrid',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=TreeGrid',
			storybook: SB( 'components-treegrid--docs' ),
			github: GH( 'components', 'tree-grid' ),
			figma: FIGMA_WPDS,
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
			figma: FIGMA_UI,
		},
		{
			id: 'collapsible-card',
			title: 'CollapsibleCard',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=CollapsibleCard',
			storybook: '#',
			github: GH( 'ui', 'collapsible-card' ),
			figma: FIGMA_UI,
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
			figma: FIGMA_UI_PAGE( '1-24' ),
		},
		{
			id: 'drawer',
			title: 'Drawer',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Drawer',
			storybook: '#',
			github: GH( 'ui', 'dialog' ),
			figma: FIGMA_UI_PAGE( '1-23' ),
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
			figma: FIGMA_UI_PAGE( '1-20' ),
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
	],
};

// ─── Demos ────────────────────────────────────────────────────────────────────

function DemoWrap( { children, align = 'center' } ) {
	return (
		<div style={ {
			display: 'flex',
			alignItems: align === 'center' ? 'center' : 'flex-start',
			justifyContent: 'center',
			padding: '20px 16px',
			background: '#f6f7f7',
			minHeight: '140px',
			width: '100%',
			boxSizing: 'border-box',
		} }>
			{ children }
		</div>
	);
}

function ButtonDemo() {
	return (
		<DemoWrap>
			<div style={ { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' } }>
				<Button variant="primary">Save</Button>
				<Button variant="secondary">Cancel</Button>
				<Button variant="tertiary">Reset</Button>
			</div>
		</DemoWrap>
	);
}

function ModalDemo() {
	const [ open, setOpen ] = useState( false );
	return (
		<DemoWrap>
			<Button variant="primary" onClick={ () => setOpen( true ) }>Open Modal</Button>
			{ open && (
				<Modal title="Confirm action" onRequestClose={ () => setOpen( false ) }>
					<p style={ { marginBottom: 16 } }>Are you sure you want to continue?</p>
					<div style={ { display: 'flex', gap: 8, justifyContent: 'flex-end' } }>
						<Button variant="tertiary" onClick={ () => setOpen( false ) }>Cancel</Button>
						<Button variant="primary" onClick={ () => setOpen( false ) }>Confirm</Button>
					</div>
				</Modal>
			) }
		</DemoWrap>
	);
}

function TooltipDemo() {
	return (
		<DemoWrap>
			<Tooltip text="Save your changes to the database">
				<Button variant="primary">Hover me</Button>
			</Tooltip>
		</DemoWrap>
	);
}

function NoticeDemo() {
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<Notice status="success" isDismissible={ false }>
					Post published successfully.
				</Notice>
			</div>
		</DemoWrap>
	);
}

function PopoverDemo() {
	const [ anchor, setAnchor ] = useState( null );
	const [ open, setOpen ] = useState( false );
	return (
		<DemoWrap>
			<Button ref={ setAnchor } onClick={ () => setOpen( ! open ) }>
				Toggle Popover
			</Button>
			{ open && (
				<Popover anchor={ anchor } onClose={ () => setOpen( false ) } placement="bottom-start">
					<div style={ { padding: '12px 16px' } }>
						<p style={ { margin: 0, fontSize: 13 } }>Popover content here.</p>
					</div>
				</Popover>
			) }
		</DemoWrap>
	);
}

function PanelDemo() {
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<Panel header="Settings">
					<PanelBody title="General" initialOpen>
						<PanelRow>
							<span style={ { fontSize: 13, color: '#555' } }>Panel content goes here</span>
						</PanelRow>
					</PanelBody>
				</Panel>
			</div>
		</DemoWrap>
	);
}

function SpinnerDemo() {
	return (
		<DemoWrap>
			<Spinner />
		</DemoWrap>
	);
}

function TextControlDemo() {
	const [ value, setValue ] = useState( 'Hello World' );
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<TextControl
					label="Site title"
					value={ value }
					onChange={ setValue }
					__nextHasNoMarginBottom
					__next40pxDefaultSize
				/>
			</div>
		</DemoWrap>
	);
}

function ToggleControlDemo() {
	const [ checked, setChecked ] = useState( true );
	return (
		<DemoWrap>
			<ToggleControl
				label="Enable dark mode"
				checked={ checked }
				onChange={ setChecked }
				__nextHasNoMarginBottom
			/>
		</DemoWrap>
	);
}

function SelectControlDemo() {
	const [ value, setValue ] = useState( 'medium' );
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<SelectControl
					label="Font size"
					value={ value }
					options={ [
						{ label: 'Small',  value: 'small' },
						{ label: 'Medium', value: 'medium' },
						{ label: 'Large',  value: 'large' },
					] }
					onChange={ setValue }
					__nextHasNoMarginBottom
					__next40pxDefaultSize
				/>
			</div>
		</DemoWrap>
	);
}

function CheckboxControlDemo() {
	const [ checked, setChecked ] = useState( true );
	return (
		<DemoWrap>
			<CheckboxControl
				label="Accept terms and conditions"
				checked={ checked }
				onChange={ setChecked }
				__nextHasNoMarginBottom
			/>
		</DemoWrap>
	);
}

function NavigatorDemo() {
	return (
		<DemoWrap align="top">
			<Navigator initialPath="/" style={ { width: '100%' } }>
				<Navigator.Screen path="/">
					<p style={ { margin: '0 0 12px', fontSize: 13 } }>Home screen</p>
					<Navigator.Button path="/settings" variant="secondary">
						Settings →
					</Navigator.Button>
				</Navigator.Screen>
				<Navigator.Screen path="/settings">
					<Navigator.BackButton>← Back</Navigator.BackButton>
					<p style={ { margin: '12px 0 0', fontSize: 13 } }>Settings screen</p>
				</Navigator.Screen>
			</Navigator>
		</DemoWrap>
	);
}

function SnackbarDemo() {
	return (
		<DemoWrap>
			<Snackbar>Post published successfully.</Snackbar>
		</DemoWrap>
	);
}

function ProgressBarDemo() {
	return (
		<DemoWrap>
			<div style={ { width: '100%' } }>
				<ProgressBar value={ 65 } />
			</div>
		</DemoWrap>
	);
}

function TabsDemo() {
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<TabPanel
					tabs={ [
						{ name: 'general',  title: 'General' },
						{ name: 'advanced', title: 'Advanced' },
					] }
				>
					{ ( tab ) => (
						<p style={ { padding: '8px 0', margin: 0, fontSize: 13 } }>
							{ tab.name === 'general' ? 'General settings' : 'Advanced options' }
						</p>
					) }
				</TabPanel>
			</div>
		</DemoWrap>
	);
}

function ConfirmDialogDemo() {
	const [ open, setOpen ] = useState( false );
	return (
		<DemoWrap>
			<Button isDestructive onClick={ () => setOpen( true ) }>Delete post</Button>
			{ open && (
				<ConfirmDialog
					onConfirm={ () => setOpen( false ) }
					onCancel={ () => setOpen( false ) }
				>
					Are you sure you want to delete this post? This action cannot be undone.
				</ConfirmDialog>
			) }
		</DemoWrap>
	);
}

function TreeGridDemo() {
	return (
		<DemoWrap align="top">
			<TreeGrid style={ { width: '100%' } }>
				<TreeGridRow level={ 1 } positionInSet={ 1 } setSize={ 1 }>
					<TreeGridCell>
						{ ( props ) => (
							<Button variant="tertiary" __next40pxDefaultSize { ...props }>
								📄 Pages
							</Button>
						) }
					</TreeGridCell>
				</TreeGridRow>
				<TreeGridRow level={ 2 } positionInSet={ 1 } setSize={ 2 }>
					<TreeGridCell>
						{ ( props ) => (
							<Button variant="tertiary" __next40pxDefaultSize { ...props }>
								{ '    ├ ' }About
							</Button>
						) }
					</TreeGridCell>
				</TreeGridRow>
				<TreeGridRow level={ 2 } positionInSet={ 2 } setSize={ 2 }>
					<TreeGridCell>
						{ ( props ) => (
							<Button variant="tertiary" __next40pxDefaultSize { ...props }>
								{ '    └ ' }Contact
							</Button>
						) }
					</TreeGridCell>
				</TreeGridRow>
			</TreeGrid>
		</DemoWrap>
	);
}

function BadgeDemo() {
	return (
		<DemoWrap>
			<div style={ { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' } }>
				<Badge>New</Badge>
				<Badge>Beta</Badge>
				<Badge>3</Badge>
			</div>
		</DemoWrap>
	);
}

function HStackDemo() {
	return (
		<DemoWrap>
			<HStack spacing={ 3 }>
				{ [ 'One', 'Two', 'Three' ].map( ( label ) => (
					<div key={ label } style={ { background: '#e8e8e8', padding: '6px 12px', borderRadius: 4, fontSize: 13 } }>
						{ label }
					</div>
				) ) }
			</HStack>
		</DemoWrap>
	);
}

function VStackDemo() {
	return (
		<DemoWrap>
			<VStack spacing={ 2 }>
				{ [ 'First', 'Second', 'Third' ].map( ( label ) => (
					<div key={ label } style={ { background: '#e8e8e8', padding: '6px 12px', borderRadius: 4, fontSize: 13 } }>
						{ label }
					</div>
				) ) }
			</VStack>
		</DemoWrap>
	);
}

function UiCardDemo() {
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<Card.Root>
					<Card.Header>
						<Card.Title>Card Title</Card.Title>
					</Card.Header>
					<Card.Content>
						<p style={ { margin: 0, fontSize: 13 } }>Card content goes here.</p>
					</Card.Content>
				</Card.Root>
			</div>
		</DemoWrap>
	);
}

function CollapsibleCardDemo() {
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<CollapsibleCard.Root defaultOpen>
					<CollapsibleCard.Header>
						<Card.Title>Collapsible Section</Card.Title>
					</CollapsibleCard.Header>
					<CollapsibleCard.Content>
						<p style={ { margin: 0, fontSize: 13 } }>Expandable content here.</p>
					</CollapsibleCard.Content>
				</CollapsibleCard.Root>
			</div>
		</DemoWrap>
	);
}

function UiStackDemo() {
	return (
		<DemoWrap>
			<Stack direction="row" gap="md">
				{ [ 'One', 'Two', 'Three' ].map( ( label ) => (
					<div key={ label } style={ { background: '#e8e8e8', padding: '6px 12px', borderRadius: 4, fontSize: 13 } }>
						{ label }
					</div>
				) ) }
			</Stack>
		</DemoWrap>
	);
}

function UiTextDemo() {
	return (
		<DemoWrap>
			<div style={ { display: 'flex', flexDirection: 'column', gap: 8 } }>
				<Text variant="heading-sm">Heading</Text>
				<Text variant="body-md">Body text — regular size</Text>
				<Text variant="body-sm">Small muted text</Text>
			</div>
		</DemoWrap>
	);
}

function UiInputControlDemo() {
	const [ value, setValue ] = useState( '' );
	return (
		<DemoWrap align="top">
			<div style={ { width: '100%' } }>
				<InputControl
					label="Email address"
					placeholder="you@example.com"
					value={ value }
					onChange={ ( e ) => setValue( e.target.value ) }
				/>
			</div>
		</DemoWrap>
	);
}

function DrawerDemo() {
	return (
		<DemoWrap>
			<Dialog.Root>
				<Dialog.Trigger>Open Drawer</Dialog.Trigger>
				<Dialog.Popup>
					<Dialog.Header>
						<Dialog.Title>Drawer Panel</Dialog.Title>
						<Dialog.CloseIcon />
					</Dialog.Header>
					<div style={ { padding: 16, fontSize: 13 } }>
						<p>Drawer content goes here.</p>
					</div>
				</Dialog.Popup>
			</Dialog.Root>
		</DemoWrap>
	);
}

const DEMOS = {
	'button':           ButtonDemo,
	'modal':            ModalDemo,
	'tooltip':          TooltipDemo,
	'notice':           NoticeDemo,
	'popover':          PopoverDemo,
	'panel':            PanelDemo,
	'spinner':          SpinnerDemo,
	'text-control':     TextControlDemo,
	'toggle-control':   ToggleControlDemo,
	'select-control':   SelectControlDemo,
	'checkbox-control': CheckboxControlDemo,
	'navigator':        NavigatorDemo,
	'snackbar':         SnackbarDemo,
	'progress-bar':     ProgressBarDemo,
	'tabs':             TabsDemo,
	'confirm-dialog':   ConfirmDialogDemo,
	'tree-grid':        TreeGridDemo,
	'badge':            BadgeDemo,
	'hstack':           HStackDemo,
	'vstack':           VStackDemo,
	'card':             UiCardDemo,
	'collapsible-card': CollapsibleCardDemo,
	'stack':            UiStackDemo,
	'text-primitive':   UiTextDemo,
	'input-control-ui': UiInputControlDemo,
	'drawer':           DrawerDemo,
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
		render: ( { item } ) => {
			const Demo = DEMOS[ item.id ];
			if ( Demo ) return <Demo />;
			return (
				<img
					src={ item.image }
					alt={ item.title }
					style={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }
				/>
			);
		},
	},
	{
		id: 'links',
		label: 'Links',
		enableSorting: false,
		enableHiding: false,
		render: ( { item } ) => {
			const links = [
				item.figma     !== '#' && { href: item.figma,     label: 'Figma' },
				item.storybook !== '#' && { href: item.storybook, label: 'Storybook' },
				item.github    !== '#' && { href: item.github,    label: 'GitHub' },
			].filter( Boolean );

			return (
				<div style={ { display: 'flex', gap: 'var(--wpds-dimension-gap-sm)', flexWrap: 'wrap', padding: '2px 0' } }>
					{ links.map( ( link, i ) => (
						<Fragment key={ link.label }>
							{ i > 0 && <span style={ { color: 'var(--wpds-color-stroke-surface-neutral)' } }>·</span> }
							<a
								href={ link.href }
								target="_blank"
								rel="noreferrer"
								style={ { color: 'var(--wpds-color-fg-interactive-brand)', fontSize: 'var(--wpds-typography-font-size-sm)', textDecoration: 'none', fontWeight: 'var(--wpds-typography-font-weight-medium)' } }
							>
								{ link.label } ↗
							</a>
						</Fragment>
					) ) }
				</div>
			);
		},
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
