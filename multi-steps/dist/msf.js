parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"uCOr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.validateEmail=exports.convertToString=exports.getDistanceFromTop=exports.isVisible=exports.select=exports.isFormElement=void 0,exports.isFormElement=function(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement},exports.select=function(e){var t=e.required,r=void 0!==t&&t,o=e.selector,n=e.errorMessage,s=e.scope,i=void 0===s?document:s;if(o){var f=i.querySelector(o);if(f)return f;throw new Error(n)}if(r)throw new Error(n)},exports.isVisible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},exports.getDistanceFromTop=function(e){var t=e,r=0;if(t.offsetParent)do{r+=t.offsetTop,t=t.offsetParent instanceof HTMLElement?t.offsetParent:null}while(t);return r>=0?r:0},exports.convertToString=function(e){return"string"==typeof e?e:"number"==typeof e?e.toString():e?"true":"false"},exports.validateEmail=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())};
},{}],"ZHxS":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./helpers"),r=function(){function t(i){e(this,t),this.view=i,this.view=i,this.currentStep=0,this.init()}return i(t,[{key:"init",value:function(){this.view.setMaskHeight(this.currentStep),this.view.hideElement(this.view.back),this.view.hideAlert(),this.view.createHiddenForm(),this.setEvents()}},{key:"setEvents",value:function(){var e=this,t=function(t){e.navClick(t)},i=function(t){e.handleInput(t)};this.view.next.addEventListener("click",function(){e.nextClick()}),this.view.back&&this.view.back.addEventListener("click",function(){e.backClick()}),this.view.navLinks.forEach(function(e){e.addEventListener("click",t)}),this.view.inputs.forEach(function(e){e.addEventListener("input",i)}),this.view.sendHiddenForm&&this.view.rightArrow.addEventListener("click",function t(){e.currentStep===e.view.hiddenFormStep&&(e.view.submitHiddenForm(),e.view.rightArrow.removeEventListener("click",t))})}},{key:"nextClick",value:function(){this.checkRequiredInputs()?(this.currentStep++,1===this.currentStep&&this.view.showElement(this.view.back),this.currentStep===this.view.steps.length?(this.view.submitForm(),this.view.hideButtons()):(this.view.goNext(),this.view.setMaskHeight(this.currentStep),this.view.setButtonText(this.currentStep)),this.view.hideAlert(),this.view.scrollTop()):this.view.showAlert()}},{key:"backClick",value:function(){var e=this.currentStep-1;e<0||(this.view.goBack(),this.view.setMaskHeight(e),this.view.setButtonText(e),this.view.hideAlert(),this.view.scrollTop(),0===e&&this.view.hideElement(this.view.back),this.currentStep=e)}},{key:"navClick",value:function(e){var t=e.currentTarget;if(t instanceof HTMLElement){var i=+t.dataset.msfNav-1;i<this.currentStep&&(this.view.sliderDots[i].click(),this.currentStep=i,this.view.setMaskHeight(this.currentStep),this.view.setButtonText(this.currentStep))}}},{key:"handleInput",value:function(e){var t=e.currentTarget;if(n.isFormElement(t)){var i="-";switch(t.type){case"checkbox":if(!(t instanceof HTMLInputElement))break;i=t.checked;var r=t.parentElement;if(!r)break;var a=r.querySelector(".w-checkbox-input");t.checked&&a instanceof Element&&this.view.removeWarningClass(a);break;case"radio":var s=this.view.form.querySelector('input[name="'.concat(t.name,'"]:checked'));if(!(s instanceof HTMLInputElement))break;i=s.value;var c=t.parentElement;if(!c)break;var h=c.querySelector(".w-radio-input");h instanceof Element&&this.view.removeWarningClass(h);break;default:if(!t.value)break;if("email"===t.type&&!n.validateEmail(t.value))break;i=t.value,this.view.removeWarningClass(t)}this.view.setValues(t,i)}}},{key:"checkRequiredInputs",value:function(){var e=this,t=this.view.getInputs(this.currentStep).filter(function(e){return e.required&&n.isVisible(e)}),i=0;return t.forEach(function(t){switch(t.type){case"checkbox":if(t.checkValidity()){i++;break}var r=t.parentElement;if(!r)break;var a=r.querySelector(".w-checkbox-input");a instanceof HTMLElement&&e.view.addWarningClass(a);break;case"radio":if(t.checkValidity()){i++;break}var s=t.parentElement;if(!s)break;var c=s.querySelector(".w-radio-input");c instanceof Element&&e.view.addWarningClass(c);break;default:if(!t.checkValidity()||"email"===t.type&&!n.validateEmail(t.value)){e.view.addWarningClass(t);break}i++}}),i===t.length}}]),t}();exports.default=r;
},{"./helpers":"uCOr"}],"wl4Y":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0});var i=require("./helpers"),s=function(){function t(n){var s=n.formSelector,r=n.nextSelector,o=n.backSelector,a=n.alertSelector,l=n.nextButtonText,u=n.submitButtonText,h=n.warningClass,d=n.alertText,c=n.scrollTopOnStepChange,m=n.hiddeButtonsOnSubmit,f=void 0===m||m,v=n.sendHiddenForm,y=void 0!==v&&v,p=n.hiddenFormStep,w=void 0===p?1:p;e(this,t),this.form=i.select({required:!0,selector:s,errorMessage:"No form was found with the selector ".concat(s)}),this.next=i.select({required:!0,selector:r,errorMessage:"No next button was found with the selector ".concat(r)}),this.back=i.select({selector:o,errorMessage:"No back button was found with the selector ".concat(o)}),this.alert=i.select({selector:a,errorMessage:"No alert element was found with the selector ".concat(a)}),this.submitButton=i.select({selector:'input[type="submit"]',errorMessage:"No submit button was found in the form, please add one.",scope:this.form}),this.slider=i.select({selector:".w-slider",errorMessage:"No slider found inside the form, please add one.",scope:this.form}),this.mask=this.form.querySelector(".w-slider-mask"),this.steps=this.form.querySelectorAll(".w-slide"),this.rightArrow=this.form.querySelector(".w-slider-arrow-right"),this.leftArrow=this.form.querySelector(".w-slider-arrow-left"),this.sliderDots=this.form.querySelectorAll(".w-slider-dot"),this.navLinks=document.querySelectorAll("[data-msf-nav]"),this.nextText=l||this.next.textContent||"Next",this.submitText=u||this.submitButton.value,this.warningClass=h,this.alertText=d,this.scrollTopOnStepChange=c,this.hiddeButtonsOnSubmit=f,this.sendHiddenForm=y,this.hiddenFormStep=w>=1?w:1,this.inputs=this.getInputs()}return n(t,[{key:"setMaskHeight",value:function(e){this.mask.style.height="",this.mask.style.height="".concat(this.steps[e].offsetHeight,"px")}},{key:"getInputs",value:function(e){var t=e?this.steps[e].querySelectorAll("input, select, textarea"):this.form.querySelectorAll("input, select, textarea");return Array.from(t)}},{key:"setButtonText",value:function(e){var t=this;if(e!==this.steps.length-1)if("string"!=typeof this.nextText||e!==this.steps.length-2){if(Array.isArray(this.nextText))for(var n=function(n){var i=t.nextText.findIndex(function(t){return t.step-1==e-n});if(i>1)return t.next.textContent=t.nextText[i].text,"break"},i=0;i++;i=e){if("break"===n(i))break}}else this.next.textContent=this.nextText;else this.next.textContent=this.submitText}},{key:"goNext",value:function(){this.rightArrow.click()}},{key:"goBack",value:function(){this.back&&this.leftArrow.click()}},{key:"submitForm",value:function(){this.submitButton.click()}},{key:"submitHiddenForm",value:function(){this.sendHiddenForm&&this.hiddenSubmitButton.click()}},{key:"addWarningClass",value:function(e){this.warningClass&&e.classList.add(this.warningClass)}},{key:"removeWarningClass",value:function(e){this.warningClass&&e.classList.remove(this.warningClass)}},{key:"hideElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e){t&&e.addEventListener("transitionend",function t(){e.classList.add("msf-hidden"),e.removeEventListener("transitionend",t)}),e.style.opacity="0",e.style.pointerEvents="none"}}},{key:"showElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e&&(t&&e.classList.remove("msf-hidden"),requestAnimationFrame(function(){e.style.opacity="",e.style.pointerEvents=""}))}},{key:"hideButtons",value:function(){this.hiddeButtonsOnSubmit&&(this.hideElement(this.next),this.back&&this.hideElement(this.back))}},{key:"showAlert",value:function(){this.alertText&&alert(this.alertText),this.alert&&this.showElement(this.alert,!0)}},{key:"hideAlert",value:function(){this.alert&&this.hideElement(this.alert,!0)}},{key:"scrollTop",value:function(){this.scrollTopOnStepChange&&window.scrollTo({top:i.getDistanceFromTop(this.form),behavior:"smooth"})}},{key:"setValues",value:function(e,t){t=i.convertToString(t);var n=document.querySelector('[data-msf-value="'.concat(e.id,'"]'))||document.querySelector('[data-msf-value="'.concat(e.name,'"]'));if(n&&(n.textContent=t),e.hasAttribute("msf-data-hidden")){var s=this.hiddenForm.querySelector('input[name="'.concat(e.name,'"]'));s instanceof HTMLInputElement&&(s.value=t)}}},{key:"createHiddenForm",value:function(){var e=this;if(this.sendHiddenForm){var t=this.form.parentElement;if(t)t.insertAdjacentHTML("afterend",'\n    <div class="w-form" style="display: none;">\n        <form id="msf-hidden-form" name="MSF Hidden Form" data-name="MSF Hidden Form">\n            <input type="submit" value="Submit" data-wait="Please wait..." />\n        </form>\n    </div>\n    '),this.hiddenForm=t.parentElement?t.parentElement.querySelector("#msf-hidden-form"):document.querySelector("#msf-hidden-form"),this.hiddenSubmitButton=this.hiddenForm.querySelector('input[type="submit"]'),this.form.querySelectorAll("[data-msf-hidden]").forEach(function(t){var n=["INPUT","SELECT","TEXTAREA"].includes(t.tagName)?t:t.querySelector("input, select, textarea");if(n&&!e.hiddenForm.querySelector('input[name="'.concat(n.name,'"]'))){var i='<input type="hidden" name='.concat(n.name," data-name=").concat(n.name," />");e.hiddenForm.insertAdjacentHTML("beforeend",i)}}),window.Webflow&&window.Webflow.ready(),window.Webflow&&window.Webflow.destroy(),window.Webflow&&window.Webflow.require("ix2").init()}}}]),t}();exports.default=s;
},{"./helpers":"uCOr"}],"gEMr":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=t(require("./controller")),n=t(require("./view"));module.exports=function(){return function t(i){e(this,t),this.view=new n.default(i),this.controller=new r.default(this.view)}}();
},{"./controller":"ZHxS","./view":"wl4Y"}]},{},["gEMr"], "MSF")