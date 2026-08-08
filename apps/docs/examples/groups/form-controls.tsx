/* eslint-disable */
// Live examples — Form Controls.
import {
  Label,
  Input,
  Textarea,
  FormField,
  Checkbox,
  Switch,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  RadioGroup,
  RadioGroupItem,
  Slider,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectItem,
} from '@lucent/react'

const stack: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, width: 300 }
const row: React.CSSProperties = { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }

// #region label-basic
export function LabelBasic() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Label htmlFor="lb-demo">Email</Label>
      <Input id="lb-demo" type="email" placeholder="you@example.com" />
    </div>
  )
}
// #endregion

// #region input-basic
export function InputBasic() {
  return (
    <div style={stack}>
      <Input placeholder="Default" />
      <Input placeholder="Invalid" aria-invalid isInvalid />
      <Input placeholder="Disabled" disabled />
    </div>
  )
}
// #endregion

// #region textarea-basic
export function TextareaBasic() {
  return (
    <div style={stack}>
      <Textarea placeholder="Write a message…" rows={3} />
    </div>
  )
}
// #endregion

// #region form-field-basic
export function FormFieldBasic() {
  return (
    <div style={stack}>
      <FormField label="Name" id="ff-name" description="As it appears on your card.">
        <Input id="ff-name" placeholder="Ada Lovelace" />
      </FormField>
      <FormField label="Email" id="ff-email" error="Enter a valid email" isInvalid>
        <Input id="ff-email" placeholder="you@example.com" />
      </FormField>
      <FormField layout="floating" label="Full name" id="ff-float">
        <Input id="ff-float" placeholder=" " />
      </FormField>
    </div>
  )
}
// #endregion

// #region checkbox-basic
export function CheckboxBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={row}>
        <Checkbox id="cb1" defaultChecked aria-label="Accept" />
        <Label htmlFor="cb1">Accept terms</Label>
      </div>
      <div style={row}>
        <Checkbox id="cb2" checked="indeterminate" aria-label="Some" />
        <Label htmlFor="cb2">Indeterminate</Label>
      </div>
    </div>
  )
}
// #endregion

// #region switch-basic
export function SwitchBasic() {
  return (
    <div style={row}>
      <Switch id="sw1" defaultChecked aria-label="Wi-Fi" />
      <Label htmlFor="sw1">Wi-Fi</Label>
    </div>
  )
}
// #endregion

// #region toggle-basic
export function ToggleBasic() {
  return (
    <div style={row}>
      <Toggle aria-label="Bold" defaultPressed><b>B</b></Toggle>
      <Toggle aria-label="Italic"><i>I</i></Toggle>
      <Toggle aria-label="Underline"><u>U</u></Toggle>
    </div>
  )
}
// #endregion

// #region toggle-group-basic
export function ToggleGroupBasic() {
  return (
    <ToggleGroup type="single" aria-label="Alignment" defaultValue="left">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  )
}
// #endregion

// #region radio-group-basic
export function RadioGroupBasic() {
  return (
    <RadioGroup aria-label="Plan" defaultValue="pro">
      <RadioGroupItem value="free" aria-label="Free" label="Free — $0/mo" />
      <RadioGroupItem value="pro" aria-label="Pro" label="Pro — $12/mo" />
      <RadioGroupItem value="ent" aria-label="Enterprise" label="Enterprise — custom" />
    </RadioGroup>
  )
}
// #endregion

// #region slider-basic
export function SliderBasic() {
  return (
    <div style={stack}>
      <Slider aria-label="Volume" defaultValue={[60]} min={0} max={100} getValueLabel={(v) => `${v}%`} />
      <Slider aria-label="Range" defaultValue={[20, 80]} min={0} max={100} step={5} getValueLabel={(v) => `$${v}`} />
    </div>
  )
}
// #endregion

// #region select-basic
export function SelectBasic() {
  return (
    <div style={{ width: 240 }}>
      <SelectRoot defaultValue="cyan">
        <SelectTrigger style={{ inlineSize: '100%' }}>
          <SelectValue placeholder="Pick an accent…" />
          <SelectIcon />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cyan">Cyan</SelectItem>
          <SelectItem value="violet">Violet</SelectItem>
          <SelectItem value="teal">Teal</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  )
}
// #endregion
