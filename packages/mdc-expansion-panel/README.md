# Expansion panels

The MDC expansion panel component is a spec-aligned panel component adhering to the
[Material Design expansion panel requirements](https://material.io/guidelines/components/expansion-panels.html).


## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/guidelines/components/expansion-panels.html">Material Design guidelines: Expansion panels</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components-web.appspot.com/expansion-panel.html">Demo</a>
  </li>
</ul>

## Installation

```
npm install --save @material/expansion-panel
```

## Usage

The demonstrations use the [Material Design Icon Font](https://design.google.com/icons/).
You may include this to use them as shown or use any other icon method you wish.

### Single expansion panel

```html
<section class="mdc-expansion-panel">
    <div class="mdc-expansion-panel__summary">
        <span class="mdc-expansion-panel__title">Start and end dates</span>
        <span class="mdc-expansion-panel__value"><span class="mdc-expansion-panel__value__label">Start date:</span> Feb 29, 2016</span>
        <span class="mdc-expansion-panel__value"><span class="mdc-expansion-panel__value__label">End date:</span> Not set</span>
        <span class="mdc-expansion-panel__summary__marker material-icons">expand_more</span>
    </div>
    <div class="mdc-expansion-panel__content">
        <!-- Content -->
    </div>
</section>
```

### Single expansion panel with actions

```html
<section class="mdc-expansion-panel">
    <div class="mdc-expansion-panel__summary">
        <span class="mdc-expansion-panel__title">Start and end dates</span>
        <span class="mdc-expansion-panel__value"><span class="mdc-expansion-panel__value__label">Start date:</span> Feb 29, 2016</span>
        <span class="mdc-expansion-panel__value"><span class="mdc-expansion-panel__value__label">End date:</span> Not set</span>
        <span class="mdc-expansion-panel__summary__marker material-icons">expand_more</span>
    </div>
    <div class="mdc-expansion-panel__content">
        <!-- Content -->
    </div>
    <footer class="mdc-expansion-panel__actions">
        <button type="button" class="mdc-expansion-panel__action mdc-button">Cancel</button>
        <button type="button" class="mdc-expansion-panel__action mdc-button mdc-button--primary">Save</button>
    </footer>
</section>
```

### Expansion panel group

TODO: Implement expansion panel groups

## Classes

### Block

The block class is `mdc-expansion-panel`. This defines the top-level expansion panel element.

### Element

Each expansion panel has, at least, a `mdc-expansion-panel__summary` child, which contains the collapsed version of 
the expansion panel. Add a `mdc-expansion-panel__content` child for the expanded version of the panel.
Additionally, you can add a `mdc-expansion-panel__actions` child to add actions to the expansion panel.

### Modifier

The provided modifiers are:

| Class                                | Description                             |
| -------------------------------------| --------------------------------------- |
| `mdc-expansion-panel--open`          | Expanded version of the expansion panel |


## JS Usage

### Including in code

#### ES2015

```javascript
import {MDCExpansionPanel, MDCExpansionPanelFoundation} from '@material/expansion-panel';
```

#### CommonJS

```javascript
const mdcExpansionPanel = require('@material/expansion-panel');
const MDCExpansionPanel = mdcExpansionPanel.MDCExpansionPanel;
const MDCExpansionPanelFoundation = mdcExpansionPanel.MDCExpansionPanelFoundation;
```

#### AMD

```javascript
require(['/path/to/@material/expansion-panel'], mdcExpansionPanel => {
  const MDCExpansionPanel = mdcExpansionPanel.MDCExpansionPanel;
  const MDCExpansionPanelFoundation = mdcExpansionPanel.MDCExpansionPanelFoundation;
});
```

#### Global

```javascript
const MDCExpansionPanel = mdc.expansionPanel.MDCExpansionPanel;
const MDCExpansionPanelFoundation = mdc.expansionPanel.MDCExpansionPanelFoundation;
```

### Automatic Instantiation

If you do not care about retaining the component instance for the panel, simply call `attachTo()`
and pass it a DOM element.

```javascript
mdc.expansionPanel.MDCExpansionPanel.attachTo(document.querySelector('.mdc-expansion-panel'));
```

### Manual Instantiation

```javascript
import {MDCExpansionPanel} from '@material/expansion-panel';

const panel = new MDCExpansionPanel(document.querySelector('.mdc-expansion-panel'));
```

### Using the MDCExpansionPanel Foundation Class

#### API

| Method Signature | Description |
| --- | --- |
| `isExpanded() => boolean` | Returns whether the panel is expanded. |
| `expand() => void` | Expand the panel. |
| `collapse() => void` | Collapse the panel. |

#### Adapter

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element of the component. |
| `removeClass(className: string) => void` | Removes a class from the root element of the component. |
| `registerSummaryInteractionHandler(eventName: string, handler: Function) => void` | Registers a handler to be called when user interacts with summary element. |
| `deregisterSummaryInteractionHandler(eventName: string, handler: Function) => void` | Unregisters a handler to be called when user interacts with summary element. |
