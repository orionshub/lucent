/* eslint-disable */
// Live examples — Data Display.
import { Table, Callout, Progress, AvatarGroup, Avatar } from '@lucent/react'

// #region table-basic
export function TableBasic() {
  return (
    <Table style={{ minWidth: 260 }}>
      <Table.Caption>Quarterly revenue</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Quarter</Table.Head>
          <Table.Head>Revenue</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Head scope="row">Q1</Table.Head>
          <Table.Cell>$1.2M</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Head scope="row">Q2</Table.Head>
          <Table.Cell>$1.8M</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
// #endregion

// #region callout-basic
export function CalloutBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 340 }}>
      <Callout tone="info">A neutral, static note.</Callout>
      <Callout tone="success">Saved successfully.</Callout>
      <Callout tone="danger" urgent>Something went wrong (role=alert).</Callout>
    </div>
  )
}
// #endregion

// #region progress-basic
export function ProgressBasic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Progress aria-label="Upload" value={64} />
      <Progress aria-label="Loading" />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Progress aria-label="Sync" variant="circular" value={72} />
        <Progress aria-label="Working" variant="circular" />
      </div>
    </div>
  )
}
// #endregion

// #region avatar-group-basic
export function AvatarGroupBasic() {
  return (
    <AvatarGroup max={3}>
      <Avatar fallback="AB" alt="Ada B" />
      <Avatar fallback="CD" alt="Carl D" />
      <Avatar fallback="EF" alt="Eve F" />
      <Avatar fallback="GH" alt="Gus H" />
      <Avatar fallback="IJ" alt="Ivy J" />
    </AvatarGroup>
  )
}
// #endregion
