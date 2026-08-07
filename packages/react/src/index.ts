/**
 * @lucent/react — public root barrel
 *
 * Side-effect-free: no CSS imports in JS.
 * CSS ships via the *.css subpath exports in package.json:
 *   import '@lucent/react/styles.css'   — aggregated tokens + glass + motion
 *   import '@lucent/react/glass.css'    — glass surface only
 *   import '@lucent/react/fonts.css'    — opt-in Space Grotesk font-face
 *   import '@lucent/react/theme.css'    — ThemePanel styles
 *   import '@lucent/react/tailwind'     — Tailwind v4 @theme preset
 */

// ─── Utilities ─────────────────────────────────────────────────────────────
export { cx } from './utils/cx';

export { Slot, Slottable } from './utils/Slot/slot';
export type { AsChildProps } from './utils/Slot/slot';
export { VisuallyHidden } from './utils/VisuallyHidden/visuallyHidden';
export type { VisuallyHiddenProps } from './utils/VisuallyHidden/visuallyHidden';
export { AccessibleIcon } from './utils/AccessibleIcon/accessibleIcon';
export type { AccessibleIconProps } from './utils/AccessibleIcon/accessibleIcon';
export { Portal } from './utils/Portal/portal';
export type { PortalProps } from './utils/Portal/portal';

// ─── GlassSurface primitive ────────────────────────────────────────────────
export { GlassSurface } from './primitives/GlassSurface/GlassSurface';
export type { GlassSurfaceProps } from './primitives/GlassSurface/GlassSurface';

// ─── Primitives ────────────────────────────────────────────────────────────
export { Button } from './primitives/Button/Button';
export type { ButtonProps } from './primitives/Button/Button';
export { IconButton } from './primitives/IconButton/IconButton';
export type { IconButtonProps } from './primitives/IconButton/IconButton';
export { Text } from './primitives/Text/Text';
export type { TextProps } from './primitives/Text/Text';
export { Heading } from './primitives/Heading/Heading';
export type { HeadingProps } from './primitives/Heading/Heading';
export { Link } from './primitives/Link/Link';
export type { LinkProps } from './primitives/Link/Link';
export { Separator } from './primitives/Separator/Separator';
export type { SeparatorProps } from './primitives/Separator/Separator';
export { Avatar } from './primitives/Avatar/Avatar';
export type { AvatarProps } from './primitives/Avatar/Avatar';
export { AspectRatio } from './primitives/AspectRatio/AspectRatio';
export type { AspectRatioProps } from './primitives/AspectRatio/AspectRatio';
export { Badge } from './primitives/Badge/Badge';
export type { BadgeProps } from './primitives/Badge/Badge';
export { Kbd } from './primitives/Kbd/Kbd';
export type { KbdProps } from './primitives/Kbd/Kbd';

// ─── Theming system ────────────────────────────────────────────────────────
export { LucentProvider, LucentContext } from './theme/LucentProvider';
export type { LucentProviderProps, LucentContextValue } from './theme/LucentProvider';

export { useLucent } from './theme/useLucent';

export { ThemePanel } from './theme/ThemePanel';
export type { ThemePanelProps } from './theme/ThemePanel';

export {
  setTheme, setAccent, setDensity, setGlassOpacity, setGlassBlur, setContrast,
  GLASS_OPACITY_DEFAULT, GLASS_OPACITY_MIN, GLASS_OPACITY_MAX, GLASS_BLUR_MAX,
} from './theme/setters';
export type { Theme, Accent, Density, Contrast } from './theme/setters';

export { noFlashScript } from './theme/no-flash-script';

// ─── Phase 3 — Form Controls ──────────────────────────────────────────────
export { Label } from './primitives/Label/Label';
export type { LabelProps } from './primitives/Label/Label';
export { Input } from './primitives/Input/Input';
export type { InputProps } from './primitives/Input/Input';
export { Textarea } from './primitives/Textarea/Textarea';
export type { TextareaProps } from './primitives/Textarea/Textarea';
export { FormField } from './primitives/FormField/FormField';
export type { FormFieldProps, FormFieldLayout } from './primitives/FormField/FormField';
export { Checkbox } from './primitives/Checkbox/Checkbox';
export type { CheckboxProps } from './primitives/Checkbox/Checkbox';
export { Switch } from './primitives/Switch/Switch';
export type { SwitchProps } from './primitives/Switch/Switch';
export { Toggle } from './primitives/Toggle/Toggle';
export type { ToggleProps } from './primitives/Toggle/Toggle';
export { ToggleGroup, ToggleGroupItem } from './primitives/ToggleGroup/ToggleGroup';
export type { ToggleGroupProps, ToggleGroupItemProps } from './primitives/ToggleGroup/ToggleGroup';
export { RadioGroup, RadioGroupItem } from './primitives/RadioGroup/RadioGroup';
export type { RadioGroupProps, RadioGroupItemProps } from './primitives/RadioGroup/RadioGroup';
export { Slider } from './primitives/Slider/Slider';
export type { SliderProps } from './primitives/Slider/Slider';
export {
  SelectRoot, SelectTrigger, SelectValue, SelectIcon, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator,
} from './primitives/Select/Select';
export type {
  SelectTriggerProps, SelectValueProps, SelectIconProps, SelectContentProps,
  SelectItemProps, SelectGroupProps, SelectLabelProps, SelectSeparatorProps,
} from './primitives/Select/Select';

// ─── Phase 4 — Layout & Static Data Display ───────────────────────────────
export { Box } from './primitives/Box/Box';
export type { BoxProps } from './primitives/Box/Box';
export { Flex } from './primitives/Flex/Flex';
export type { FlexProps } from './primitives/Flex/Flex';
export { Grid } from './primitives/Grid/Grid';
export type { GridProps } from './primitives/Grid/Grid';
export { Card } from './primitives/Card/Card';
export type { CardProps, CardVariant, CardPadding, CardSectionProps } from './primitives/Card/Card';
export { ScrollArea } from './primitives/ScrollArea/ScrollArea';
export type { ScrollAreaProps, ScrollAreaOrientation } from './primitives/ScrollArea/ScrollArea';
export { Accordion } from './primitives/Accordion/Accordion';
export type {
  AccordionRootProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps,
} from './primitives/Accordion/Accordion';
export { Collapsible } from './primitives/Collapsible/Collapsible';
export type {
  CollapsibleRootProps, CollapsibleTriggerProps, CollapsibleContentProps,
} from './primitives/Collapsible/Collapsible';
export { Tabs } from './primitives/Tabs/Tabs';
export type {
  TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps,
} from './primitives/Tabs/Tabs';
export { Table } from './primitives/Table/Table';
export type {
  TableProps, TableCaptionProps, TableSectionProps, TableRowProps, TableHeadProps, TableCellProps,
} from './primitives/Table/Table';
export { Callout } from './primitives/Callout/Callout';
export type { CalloutProps, CalloutTone } from './primitives/Callout/Callout';
export { Progress } from './primitives/Progress/Progress';
export type { ProgressProps, ProgressVariant } from './primitives/Progress/Progress';
export { AvatarGroup } from './primitives/AvatarGroup/AvatarGroup';
export type { AvatarGroupProps } from './primitives/AvatarGroup/AvatarGroup';

// ─── Phase 5 — Overlays ───────────────────────────────────────────────────
export { Dialog } from './primitives/Dialog/Dialog';
export type { DialogContentProps, DialogTitleProps, DialogDescriptionProps } from './primitives/Dialog/Dialog';
export { AlertDialog } from './primitives/AlertDialog/AlertDialog';
export type {
  AlertDialogContentProps, AlertDialogTitleProps, AlertDialogDescriptionProps,
} from './primitives/AlertDialog/AlertDialog';
export { Popover } from './primitives/Popover/Popover';
export type { PopoverContentProps } from './primitives/Popover/Popover';
export { Tooltip, TooltipProvider } from './primitives/Tooltip/Tooltip';
export type { TooltipContentProps } from './primitives/Tooltip/Tooltip';
export { HoverCard } from './primitives/HoverCard/HoverCard';
export type { HoverCardContentProps } from './primitives/HoverCard/HoverCard';
export { DropdownMenu } from './primitives/DropdownMenu/DropdownMenu';
export type {
  DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps, DropdownMenuLabelProps, DropdownMenuSeparatorProps,
  DropdownMenuSubTriggerProps, DropdownMenuSubContentProps,
} from './primitives/DropdownMenu/DropdownMenu';
export { ContextMenu } from './primitives/ContextMenu/ContextMenu';
export type {
  ContextMenuContentProps, ContextMenuItemProps, ContextMenuCheckboxItemProps,
  ContextMenuRadioItemProps, ContextMenuLabelProps, ContextMenuSeparatorProps,
  ContextMenuSubTriggerProps, ContextMenuSubContentProps,
} from './primitives/ContextMenu/ContextMenu';

// ─── Design tokens (typed TS map) ─────────────────────────────────────────
// Re-exported via the ./tokens subpath; also available here for convenience.
// import type { LucentBg } from '@lucent/react' (from the generated TS map)
export * from './tokens/index';

