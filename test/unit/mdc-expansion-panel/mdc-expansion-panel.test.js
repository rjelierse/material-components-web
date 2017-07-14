/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import bel from 'bel';
import domEvents from 'dom-events';
import td from 'testdouble';
import {assert} from 'chai';

import {MDCExpansionPanel, MDCExpansionPanelFoundation} from '../../../packages/mdc-expansion-panel';

function getFixture() {
  return bel`
<details class="mdc-expansion-panel">
  <summary class="mdc-expansion-panel__summary">
    <span class="mdc-expansion-panel__title">Foo</span>
  </summary>
  <div class="mdc-expansion-panel__content"></div>
  <div class="mdc-expansion-panel__actions"></div>
</details>
  `;
}

function setupTest() {
  const root = getFixture();
  const summary = root.querySelector('.mdc-expansion-panel__summary');
  const component = new MDCExpansionPanel(root);
  return {root, summary, component};
}

suite('MDCExpansionPanel');

test('attachTo initializes and returns a MDCExpansionPanel instance', () => {
  const root = getFixture();
  assert.isOk(MDCExpansionPanel.attachTo(root) instanceof MDCExpansionPanel);
});

test('get/set open', () => {
  const {component} = setupTest();
  component.open = true;
  assert.isOk(component.open);

  component.open = false;
  assert.isNotOk(component.open);
});

test('expand expands the panel', () => {
  const {component} = setupTest();
  component.expand();
  assert.isOk(component.open);
});

test('collapse collapses the panel', () => {
  const {component} = setupTest();
  component.collapse();
  assert.isNotOk(component.open);
});

test('#expand proxies to foundation.expand()', () => {
  const MockExpansionPanelFoundation = td.constructor(MDCExpansionPanelFoundation);
  const root = getFixture();
  const foundation = new MockExpansionPanelFoundation();
  const component = new MDCExpansionPanel(root, foundation);
  component.expand();
  td.verify(foundation.expand());
});

test('#adapter.addClass adds a class to the root element', () => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.addClass('foo');
  assert.isOk(root.classList.contains('foo'));
});

test('#adapter.removeClass removes a class from the root element', () => {
  const {root, component} = setupTest();
  root.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClass('foo');
  assert.isNotOk(root.classList.contains('foo'));
});

test('#adapter.registerSummaryInteractionHandler adds an event listener for (type, handler)', () => {
  const {root, summary, component} = setupTest();
  document.body.appendChild(root);
  const handler = td.func('clickHandler');
  component.getDefaultFoundation().adapter_.registerSummaryInteractionHandler('click', handler);
  domEvents.emit(summary, 'click');
  td.verify(handler(td.matchers.anything()));
  document.body.removeChild(root);
});

test('#adapter.deregisterSummaryInteractionHandler removes an event listener for (type, hander)', () => {
  const {root, summary, component} = setupTest();
  document.body.appendChild(root);
  const handler = td.func('clickHandler');
  summary.addEventListener('click', handler);
  component.getDefaultFoundation().adapter_.deregisterSummaryInteractionHandler('click', handler);
  domEvents.emit(summary, 'click');
  td.verify(handler(td.matchers.anything()), {times: 0});
  document.body.removeChild(root);
});

