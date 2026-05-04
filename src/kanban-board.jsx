// Prototype: Design System Component Browser
// Components: Page (@wordpress/admin-ui), Tabs (@wordpress/ui),
//             DataViews (@wordpress/dataviews), Badge (@wordpress/ui)
import { Page } from '@wordpress/admin-ui';
import { Tabs, Badge, Card, CollapsibleCard, Stack, Text, Dialog, InputControl, Select } from '@wordpress/ui';
import { DataViews, DataForm, DataViewsPicker } from '@wordpress/dataviews';
import {
	SearchControl,
	ComboboxControl,
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
import { useState, useMemo } from 'react';

// ─── Brand icons ──────────────────────────────────────────────────────────────

function FigmaIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M9.39995 3.48997H7.62995C6.6524 3.48997 5.85995 4.28243 5.85995 5.25997C5.85995 6.23752 6.6524 7.02997 7.62995 7.02997H9.39995V3.48997ZM9.39995 2.28997H10.5999H12.3699C14.0103 2.28997 15.3399 3.61968 15.3399 5.25997C15.3399 6.22794 14.8769 7.08777 14.1602 7.62997C14.8769 8.17219 15.3399 9.03202 15.3399 9.99999C15.3399 11.6403 14.0103 12.97 12.3699 12.97C11.7067 12.97 11.0943 12.7526 10.5999 12.3852V12.97V14.74C10.5999 16.3803 9.27023 17.71 7.62995 17.71C5.98966 17.71 4.65995 16.3803 4.65995 14.74C4.65995 13.7719 5.123 12.9122 5.83969 12.37C5.123 11.8278 4.65995 10.9679 4.65995 9.99999C4.65995 9.03202 5.12302 8.17219 5.83972 7.62999C5.12302 7.08777 4.65995 6.22794 4.65995 5.25997C4.65995 3.61968 5.98966 2.28997 7.62995 2.28997H9.39995ZM10.5999 3.48997V7.02997H12.3699C13.3475 7.02997 14.1399 6.23752 14.1399 5.25997C14.1399 4.28243 13.3475 3.48997 12.3699 3.48997H10.5999ZM7.62995 11.77H9.39995V10.0045V9.99999V9.99543V8.22999H7.62995C6.6524 8.22999 5.85995 9.02244 5.85995 9.99999C5.85995 10.9752 6.64861 11.7662 7.62293 11.77L7.62995 11.77ZM5.85995 14.74C5.85995 13.7647 6.64861 12.9738 7.62293 12.97L7.62995 12.97H9.39995V14.74C9.39995 15.7175 8.60749 16.51 7.62995 16.51C6.6524 16.51 5.85995 15.7175 5.85995 14.74ZM10.5999 9.99646C10.6019 9.02053 11.3936 8.22999 12.3699 8.22999C13.3475 8.22999 14.1399 9.02244 14.1399 9.99999C14.1399 10.9775 13.3475 11.77 12.3699 11.77C11.3936 11.77 10.6019 10.9794 10.5999 10.0035V9.99646Z" fill="currentColor"/>
		</svg>
	);
}

function StorybookIcon() {
	return (
		<svg width="12.84" height="16" viewBox="0 0 12.8149 15.966" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.49517 14.7122L0.000574853 1.53345C-0.0157597 1.09821 0.317968 0.729349 0.752668 0.70218L11.9621 0.0015905C12.4046 -0.026064 12.7857 0.310212 12.8133 0.752685C12.8144 0.769356 12.8149 0.786055 12.8149 0.802758V15.1633C12.8149 15.6067 12.4555 15.966 12.0122 15.966C12.0002 15.966 11.9882 15.9658 11.9762 15.9652L1.26132 15.484C0.844019 15.4653 0.510836 15.1296 0.49517 14.7122Z" fill="currentColor"/>
			<path d="M9.46289 1.96248L9.53946 0.120952L11.0788 0L11.1452 1.89911C11.1475 1.9652 11.0958 2.02065 11.0297 2.02296C11.0014 2.02395 10.9736 2.01487 10.9514 1.99735L10.3578 1.5297L9.6549 2.06286C9.60221 2.10283 9.5271 2.09251 9.48713 2.03982C9.4703 2.01765 9.46173 1.9903 9.46289 1.96248ZM7.49416 6.01782C7.49416 6.33013 9.59783 6.18045 9.88023 5.96107C9.88023 3.83432 8.73906 2.71675 6.6494 2.71675C4.55973 2.71675 3.38893 3.85171 3.38893 5.55415C3.38893 8.51924 7.39041 8.57599 7.39041 10.1933C7.39041 10.6473 7.16811 10.9169 6.67904 10.9169C6.04176 10.9169 5.78982 10.5914 5.81946 9.4848C5.81946 9.24474 3.38893 9.1699 3.31482 9.4848C3.12613 12.1665 4.79686 12.94 6.70868 12.94C8.56122 12.94 10.0136 11.9525 10.0136 10.1649C10.0136 6.98704 5.95284 7.07217 5.95284 5.49741C5.95284 4.85899 6.42709 4.77387 6.70868 4.77387C7.00508 4.77387 7.53862 4.82611 7.49416 6.01782Z" fill="white"/>
		</svg>
	);
}

function GitHubIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M8 0C12.4184 0 16 3.67194 16 8.20234C16 11.8255 13.7104 14.8992 10.5336 15.9848C10.128 16.0656 9.984 15.8094 9.984 15.591C9.984 15.3206 9.9936 14.4374 9.9936 13.3398C9.9936 12.575 9.7376 12.0759 9.4504 11.8215C11.232 11.6183 13.104 10.9246 13.104 7.77422C13.104 6.87822 12.7936 6.14706 12.28 5.57266C12.3632 5.36546 12.6376 4.53116 12.2016 3.40156C12.2016 3.40156 11.5312 3.18178 10.004 4.24258C9.3648 4.06098 8.68 3.96961 8 3.96641C7.32 3.96961 6.636 4.06098 5.9976 4.24258C4.4688 3.18178 3.7968 3.40156 3.7968 3.40156C3.3624 4.53116 3.6368 5.36546 3.7192 5.57266C3.208 6.14706 2.8952 6.87822 2.8952 7.77422C2.8952 10.9166 4.7632 11.6209 6.54 11.8281C6.3112 12.0329 6.104 12.3942 6.032 12.9246C5.576 13.1342 4.4176 13.497 3.704 12.2434C3.704 12.2434 3.2808 11.4553 2.4776 11.3977C2.4776 11.3977 1.6976 11.3873 2.4232 11.8961C2.4232 11.8961 2.9472 12.1481 3.3112 13.0961C3.3112 13.0961 3.7808 14.5601 6.0064 14.0641C6.0104 14.7497 6.0176 15.3958 6.0176 15.591C6.0176 15.8078 5.8704 16.0615 5.4712 15.9855C2.292 14.9015 0 11.8263 0 8.20234C0 3.67194 3.5824 0 8 0Z" fill="currentColor"/>
		</svg>
	);
}

const COLOR_ICON         = 'var(--wpds-color-bg-interactive-neutral-strong)';
const COLOR_ICON_ACTIVE  = 'var(--wpds-color-bg-interactive-neutral-strong-active)';
const COLOR_ICON_DISABLED = 'var(--wpds-color-bg-interactive-neutral-strong-disabled)';

function IconLink( { href, label, children } ) {
	const [ hovered, setHovered ] = useState( false );
	const available = href !== '#';
	const color = available
		? hovered ? COLOR_ICON_ACTIVE : COLOR_ICON
		: COLOR_ICON_DISABLED;

	const inner = (
		<div style={ {
			width: 24, height: 24,
			display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
			padding: '2px', borderRadius: 4, color,
		} }>
			{ children }
		</div>
	);

	if ( available ) {
		return (
			<a href={ href } target="_blank" rel="noreferrer"
			   style={ { textDecoration: 'none', display: 'flex' } }
			   title={ label }
			   onMouseEnter={ () => setHovered( true ) }
			   onMouseLeave={ () => setHovered( false ) }>
				{ inner }
			</a>
		);
	}
	return <div title={ `${ label } (unavailable)` }>{ inner }</div>;
}

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
			description: 'Triggers actions or navigates to a new location',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Button',
			storybook: SB( 'components-button--docs' ),
			github: GH( 'components', 'button' ),
			figma: FIGMA_UI_PAGE( '1-22' ),
		},
		{
			id: 'modal',
			title: 'Modal',
			description: 'Overlays content in a focused, blocking dialog',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Modal',
			storybook: SB( 'components-modal--docs' ),
			github: GH( 'components', 'modal' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'tooltip',
			title: 'Tooltip',
			description: 'Shows a short contextual hint on hover or focus',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Tooltip',
			storybook: SB( 'components-tooltip--docs' ),
			github: GH( 'components', 'tooltip' ),
			figma: FIGMA_UI_PAGE( '1-27' ),
		},
		{
			id: 'notice',
			title: 'Notice',
			description: 'Communicates status messages inline with page content',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Notice',
			storybook: SB( 'components-notice--docs' ),
			github: GH( 'components', 'notice' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'popover',
			title: 'Popover',
			description: 'Floating content panel anchored to a trigger element',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Popover',
			storybook: SB( 'components-popover--docs' ),
			github: GH( 'components', 'popover' ),
			figma: '#',
		},
		{
			id: 'panel',
			title: 'Panel',
			description: 'Groups related controls in collapsible, labelled sections',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Panel',
			storybook: SB( 'components-panel--docs' ),
			github: GH( 'components', 'panel' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'spinner',
			title: 'Spinner',
			description: 'Animated indicator for ongoing loading or processing',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Spinner',
			storybook: SB( 'components-spinner--docs' ),
			github: GH( 'components', 'spinner' ),
			figma: FIGMA_WPDS_PAGE( '3343-37987' ),
		},
		{
			id: 'text-control',
			title: 'TextControl',
			description: 'Single-line text input with label and help text support',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=TextControl',
			storybook: SB( 'components-textcontrol--docs' ),
			github: GH( 'components', 'text-control' ),
			figma: '#',
		},
		{
			id: 'toggle-control',
			title: 'ToggleControl',
			description: 'Binary on/off switch for boolean settings',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ToggleControl',
			storybook: SB( 'components-togglecontrol--docs' ),
			github: GH( 'components', 'toggle-control' ),
			figma: FIGMA_WPDS_PAGE( '991-34620' ),
		},
		{
			id: 'select-control',
			title: 'SelectControl',
			description: 'Dropdown for choosing one option from a predefined list',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=SelectControl',
			storybook: SB( 'components-selectcontrol--docs' ),
			github: GH( 'components', 'select-control' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'checkbox-control',
			title: 'CheckboxControl',
			description: 'Selects one or more options from a visible list',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=CheckboxControl',
			storybook: SB( 'components-checkboxcontrol--docs' ),
			github: GH( 'components', 'checkbox-control' ),
			figma: FIGMA_WPDS_PAGE( '991-34618' ),
		},
		{
			id: 'navigator',
			title: 'Navigator',
			description: 'Navigates between stacked, hierarchical screens',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Navigator',
			storybook: SB( 'components-navigator--docs' ),
			github: GH( 'components', 'navigator' ),
			figma: '#',
		},
		{
			id: 'snackbar',
			title: 'Snackbar',
			description: 'Brief feedback message that auto-dismisses after a timeout',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Snackbar',
			storybook: SB( 'components-snackbar--docs' ),
			github: GH( 'components', 'snackbar' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'progress-bar',
			title: 'ProgressBar',
			description: 'Tracks task completion with a filled progress track',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ProgressBar',
			storybook: SB( 'components-progressbar--docs' ),
			github: GH( 'components', 'progress-bar' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'tabs',
			title: 'Tabs',
			description: 'Organises content into multiple switchable tab panels',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=Tabs',
			storybook: SB( 'components-tabs--docs' ),
			github: GH( 'components', 'tabs' ),
			figma: FIGMA_UI_PAGE( '1-21' ),
		},
		{
			id: 'confirm-dialog',
			title: 'ConfirmDialog',
			description: 'Prompts users to confirm before a destructive action',
			image: 'https://placehold.co/400x220/1e1e1e/ffffff?text=ConfirmDialog',
			storybook: SB( 'components-confirmdialog--docs' ),
			github: GH( 'components', 'confirm-dialog' ),
			figma: FIGMA_WPDS,
		},
		{
			id: 'tree-grid',
			title: 'TreeGrid',
			description: 'Accessible data grid for hierarchical, tree-structured rows',
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
			description: 'Surface for grouping related content with optional header',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Card',
			storybook: '#',
			github: GH( 'ui', 'card' ),
			figma: FIGMA_UI,
		},
		{
			id: 'collapsible-card',
			title: 'CollapsibleCard',
			description: 'Card with a toggleable body section for reducing visual noise',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=CollapsibleCard',
			storybook: '#',
			github: GH( 'ui', 'collapsible-card' ),
			figma: FIGMA_UI,
		},
		{
			id: 'stack',
			title: 'Stack',
			description: 'Composable layout primitive for row or column stacking',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Stack',
			storybook: '#',
			github: GH( 'ui', 'stack' ),
			figma: '#',
		},
		{
			id: 'text-primitive',
			title: 'Text',
			description: 'Typography component with semantic size and weight variants',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Text',
			storybook: '#',
			github: GH( 'ui', 'text' ),
			figma: '#',
		},
		{
			id: 'input-control-ui',
			title: 'InputControl',
			description: 'Accessible text input with label, hint, and error support',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=InputControl',
			storybook: '#',
			github: GH( 'ui', 'form' ),
			figma: FIGMA_UI_PAGE( '1-24' ),
		},
		{
			id: 'drawer',
			title: 'Drawer',
			description: 'Slide-in side panel triggered by a button or action',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Drawer',
			storybook: '#',
			github: GH( 'ui', 'dialog' ),
			figma: FIGMA_UI_PAGE( '1-23' ),
		},
		{
			id: 'autocomplete',
			title: 'Autocomplete',
			description: 'Text input with a real-time filtered suggestion dropdown',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=Autocomplete',
			storybook: '#',
			github: GH( 'ui', 'form' ),
			figma: '#',
		},
		{
			id: 'custom-select-control-v2',
			title: 'CustomSelectControl v2',
			description: 'Fully customisable select built on a popover listbox',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=CustomSelectControl+v2',
			storybook: SB( 'components-customselectcontrol-v2--docs' ),
			github: GH( 'components', 'custom-select-control-v2' ),
			figma: '#',
		},
		{
			id: 'dataviews',
			title: 'DataViews',
			description: 'Flexible data browser with list, grid, and table layouts plus filtering, sorting, and pagination',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=DataViews',
			storybook: '#',
			github: GH( 'dataviews', 'dataviews' ),
			figma: '#',
		},
		{
			id: 'dataform',
			title: 'DataForm',
			description: 'Renders editable form fields from a typed data schema with regular and panel layout modes',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=DataForm',
			storybook: '#',
			github: GH( 'dataviews', 'dataform' ),
			figma: '#',
		},
		{
			id: 'dataviews-picker',
			title: 'DataViewsPicker',
			description: 'Selection-focused DataViews variant with picker grid and picker table layouts',
			image: 'https://placehold.co/400x220/3858e9/ffffff?text=DataViewsPicker',
			storybook: '#',
			github: GH( 'dataviews', 'dataviews-picker' ),
			figma: '#',
		},
	],

	// Storybook tag: "status-private" (locked private API) or "status-experimental"
	unstable: [
		{
			id: 'badge',
			title: 'Badge',
			description: 'Compact label for status indicators, categories, or counts',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=Badge',
			storybook: SB( 'components-badge--docs' ),
			github: GH( 'components', 'badge' ),
			figma: FIGMA_UI_PAGE( '1-20' ),
		},
		{
			id: 'hstack',
			title: 'HStack',
			description: 'Lays out children horizontally with configurable spacing',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=HStack',
			storybook: SB( 'components-hstack--docs' ),
			github: GH( 'components', 'h-stack' ),
			figma: '#',
		},
		{
			id: 'vstack',
			title: 'VStack',
			description: 'Lays out children vertically with configurable spacing',
			image: 'https://placehold.co/400x220/b26200/ffffff?text=VStack',
			storybook: SB( 'components-vstack--docs' ),
			github: GH( 'components', 'v-stack' ),
			figma: '#',
		},
	],
};

// ─── Demos ────────────────────────────────────────────────────────────────────

function DemoWrap( { children } ) {
	return (
		<div style={ {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '20px 16px',
			background: '#f6f7f7',
			height: '100%',
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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
		<DemoWrap>
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

function AutocompleteDemo() {
	const [ value, setValue ] = useState( null );
	const options = [
		{ value: 'button',  label: 'Button' },
		{ value: 'modal',   label: 'Modal' },
		{ value: 'tooltip', label: 'Tooltip' },
		{ value: 'notice',  label: 'Notice' },
		{ value: 'panel',   label: 'Panel' },
	];
	return (
		<DemoWrap>
			<div style={ { width: '100%' } }>
				<ComboboxControl
					label="Component"
					value={ value }
					onChange={ setValue }
					options={ options }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</div>
		</DemoWrap>
	);
}

function CustomSelectControlV2Demo() {
	const [ value, setValue ] = useState( 'medium' );
	return (
		<DemoWrap>
			<Select.Root value={ value } onValueChange={ setValue }>
				<Select.Trigger />
				<Select.Popup>
					<Select.Item value="small">Small</Select.Item>
					<Select.Item value="medium">Medium</Select.Item>
					<Select.Item value="large">Large</Select.Item>
				</Select.Popup>
			</Select.Root>
		</DemoWrap>
	);
}

function DataViewsDemo() {
	const [ demoView, setDemoView ] = useState( {
		type: 'list',
		page: 1,
		perPage: 5,
		titleField: 'name',
		fields: [ 'status' ],
	} );
	const demoData = [
		{ id: '1', name: 'Button',  status: 'Stable' },
		{ id: '2', name: 'Modal',   status: 'Stable' },
		{ id: '3', name: 'Badge',   status: 'Beta' },
	];
	const demoFields = [
		{ id: 'name',   label: 'Name',   enableSorting: false },
		{ id: 'status', label: 'Status', enableSorting: false },
	];
	return (
		<DemoWrap>
			<div style={ { width: '100%' } }>
				<DataViews
					data={ demoData }
					fields={ demoFields }
					view={ demoView }
					onChangeView={ setDemoView }
					paginationInfo={ { totalItems: demoData.length, totalPages: 1 } }
					defaultLayouts={ { list: {} } }
					getItemId={ ( item ) => item.id }
					search={ false }
				/>
			</div>
		</DemoWrap>
	);
}

function DataFormDemo() {
	const [ demoData, setDemoData ] = useState( { title: 'My post', published: false } );
	const demoFields = [
		{ id: 'title',     label: 'Title',     type: 'text' },
		{ id: 'published', label: 'Published', type: 'boolean' },
	];
	return (
		<DemoWrap>
			<div style={ { width: '100%' } }>
				<DataForm
					data={ demoData }
					fields={ demoFields }
					form={ { type: 'regular', fields: [ 'title', 'published' ] } }
					onChange={ ( edits ) => setDemoData( ( prev ) => ( { ...prev, ...edits } ) ) }
				/>
			</div>
		</DemoWrap>
	);
}

function DataViewsPickerDemo() {
	const [ selection, setSelection ] = useState( [] );
	const [ demoView, setDemoView ] = useState( {
		type: 'pickerTable',
		page: 1,
		perPage: 5,
		titleField: 'name',
		fields: [],
	} );
	const demoData = [
		{ id: '1', name: 'Button' },
		{ id: '2', name: 'Modal' },
		{ id: '3', name: 'Input' },
	];
	const demoFields = [
		{ id: 'name', label: 'Name', enableSorting: false },
	];
	return (
		<DemoWrap>
			<div style={ { width: '100%' } }>
				<DataViewsPicker
					view={ demoView }
					onChangeView={ setDemoView }
					fields={ demoFields }
					data={ demoData }
					paginationInfo={ { totalItems: demoData.length, totalPages: 1 } }
					selection={ selection }
					onChangeSelection={ setSelection }
					getItemId={ ( item ) => item.id }
					search={ false }
				/>
			</div>
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
	'input-control-ui':           UiInputControlDemo,
	'drawer':                     DrawerDemo,
	'autocomplete':               AutocompleteDemo,
	'custom-select-control-v2':   CustomSelectControlV2Demo,
	'dataviews':         DataViewsDemo,
	'dataform':          DataFormDemo,
	'dataviews-picker':  DataViewsPickerDemo,
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
		label: '',
		enableSorting: false,
		enableHiding: false,
		render: ( { item } ) => {
			const links = [
				{ href: item.storybook, Icon: StorybookIcon, label: 'Storybook' },
				{ href: item.github,    Icon: GitHubIcon,    label: 'GitHub' },
				{ href: item.figma,     Icon: FigmaIcon,     label: 'Figma' },
			];
			return (
				<div style={ { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' } }>
					<p style={ {
						margin: 0, fontSize: 13, color: '#757575',
						lineHeight: '18px', height: 36, overflow: 'hidden',
					} }>
						{ item.description }
					</p>
					<div style={ { display: 'flex', gap: '4px', marginLeft: '-2px' } }>
						{ links.map( ( { href, Icon, label } ) => (
							<IconLink key={ label } href={ href } label={ label }>
								<Icon />
							</IconLink>
						) ) }
					</div>
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
		<div style={ { height: '100vh', overflow: 'hidden', fontFamily: 'var(--wpds-typography-font-family-body)' } }>
			<Page
				title="Design System"
				subTitle="WordPress DS component tracker"
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
				<Tabs.Root defaultValue="ready" style={ { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 } }>
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
