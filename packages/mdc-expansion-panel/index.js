/**
 * Copyright 2017 Google Inc. All Rights Reserved.
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

import MDCComponent from '@material/base/component';
import MDCExpansionPanelFoundation from './foundation';

export {MDCExpansionPanelFoundation};

/**
 * @extends MDCComponent<!MDCExpansionPanelFoundation>
 * @final
 */
export class MDCExpansionPanel extends MDCComponent {
  /** @return {!MDCExpansionPanel} */
  static attachTo(element) {
    return new MDCExpansionPanel(element);
  }

  /** @return {!MDCExpansionPanelFoundation} */
  getDefaultFoundation() {
    const summary = this.root_.querySelector(MDCExpansionPanelFoundation.strings.SUMMARY_SELECTOR);

    return new MDCExpansionPanelFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerSummaryInteractionHandler: (event, handler) => summary.addEventListener(event, handler),
      deregisterSummaryInteractionHandler: (event, handler) => summary.removeEventListener(event, handler),
    });
  }

  /** @return {boolean} */
  get open() {
    return this.foundation_.isExpanded();
  }

  /** @param {boolean} open */
  set open(open) {
    open ? this.foundation_.expand() : this.foundation_.collapse();
  }

  expand() {
    this.foundation_.expand();
  }

  collapse() {
    this.foundation_.collapse();
  }
}
