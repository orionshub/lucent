/* eslint-disable */
// Live examples — Primitives.
import {
  Button,
  IconButton,
  Text,
  Heading,
  Link,
  Separator,
  Avatar,
  AspectRatio,
  Badge,
  Kbd,
} from '@lucent/react'

const row: React.CSSProperties = { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

// #region button-variants
export function ButtonVariants() {
  return (
    <div style={row}>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}
// #endregion

// #region button-loading
export function ButtonLoading() {
  return (
    <div style={row}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button loading>Loading</Button>
      <Button startIcon={<PlusIcon />}>With icon</Button>
    </div>
  )
}
// #endregion

// #region icon-button-basic
export function IconButtonBasic() {
  return (
    <div style={row}>
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="solid" />
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="soft" />
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" />
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="ghost" />
    </div>
  )
}
// #endregion

// #region text-basic
export function TextBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Text size="body">Body — the quick brown fox jumps over the lazy dog.</Text>
      <Text size="label">Label — a smaller, heavier caption.</Text>
      <Text muted>Muted — secondary, lower-emphasis text.</Text>
    </div>
  )
}
// #endregion

// #region heading-basic
export function HeadingBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Heading size="display" as="h2">Display heading</Heading>
      <Heading size="heading" as="h3">Section heading</Heading>
    </div>
  )
}
// #endregion

// #region link-basic
export function LinkBasic() {
  return (
    <Text>
      An <Link href="#internal">internal link</Link> and an{' '}
      <Link href="https://example.com" target="_blank">external link</Link> with a new-tab cue.
    </Text>
  )
}
// #endregion

// #region separator-basic
export function SeparatorBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 240 }}>
      <Text>Above</Text>
      <Separator />
      <Text>Below</Text>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 24 }}>
        <Text>A</Text>
        <Separator orientation="vertical" />
        <Text>B</Text>
      </div>
    </div>
  )
}
// #endregion

// #region avatar-basic
export function AvatarBasic() {
  return (
    <div style={row}>
      <Avatar src="https://i.pravatar.cc/80?img=1" alt="Ada" fallback="AD" />
      <Avatar fallback="JD" />
    </div>
  )
}
// #endregion

// #region aspect-ratio-basic
export function AspectRatioBasic() {
  return (
    <div style={{ width: 280 }}>
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://picsum.photos/480/270"
          alt="Sample"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }}
        />
      </AspectRatio>
    </div>
  )
}
// #endregion

// #region badge-basic
export function BadgeBasic() {
  return (
    <div style={row}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="accent" variant="outline">Outline</Badge>
    </div>
  )
}
// #endregion

// #region kbd-basic
export function KbdBasic() {
  return (
    <Text>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
    </Text>
  )
}
// #endregion
