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

import {assert} from 'chai';
import td from 'testdouble';

import {setupFoundationTest} from '../helpers/setup';
import {verifyDefaultAdapter, captureHandlers} from '../helpers/foundation';
import MDCExpansionPanelFoundation from '../../../packages/mdc-expansion-panel/foundation';

const {cssClasses} = MDCExpansionPanelFoundation;

suite('MDCExpansionPanelFoundation');

test('exports strings', () => {
  assert.isOk('strings' in MDCExpansionPanelFoundation);
});

test('exports cssClasses', () => {
  assert.isOk('cssClasses' in MDCExpansionPanelFoundation);
});

test('defaultAdapter returns a complete adapter implementation', () => {
  verifyDefaultAdapter(MDCExpansionPanelFoundation, [
    'addClass', 'removeClass', 'registerSummaryInteractionHandler', 'deregisterSummaryInteractionHandler',
  ]);
});

const setupTest = () => setupFoundationTest(MDCExpansionPanelFoundation);

test('#constructor sets expanded to false', () => {
  const {foundation} = setupTest();
  assert.isNotOk(foundation.isExpanded());
});

test('#init registers all interaction handlers', () => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  td.verify(mockAdapter.registerSummaryInteractionHandler('click', isA(Function)));
});

test('#destroy deregisters all interaction handlers', () => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.destroy();
  td.verify(mockAdapter.deregisterSummaryInteractionHandler('click', isA(Function)));
});

test('#expand sets expanded to true', () => {
  const {foundation} = setupTest();
  foundation.expand();
  assert.isOk(foundation.isExpanded());
});

test('#collapse sets expanded to false', () => {
  const {foundation} = setupTest();
  foundation.expand();
  assert.isOk(foundation.isExpanded());
  foundation.collapse();
  assert.isNotOk(foundation.isExpanded());
});

test('#expand adds cssClasses.OPEN when expanded', () => {
  const {foundation, mockAdapter} = setupTest();
  foundation.expand();
  td.verify(mockAdapter.addClass(cssClasses.OPEN));
});

test('#collapse removes cssClasses.OPEN when collapsed', () => {
  const {foundation, mockAdapter} = setupTest();
  foundation.collapse();
  td.verify(mockAdapter.removeClass(cssClasses.OPEN));
});

test('on click triggers panel expansion', () => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter, 'registerSummaryInteractionHandler');
  foundation.init();

  handlers.click();
  td.verify(mockAdapter.addClass(cssClasses.OPEN));

  handlers.click();
  td.verify(mockAdapter.removeClass(cssClasses.OPEN));
});

