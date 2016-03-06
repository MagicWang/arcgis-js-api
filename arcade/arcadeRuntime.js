// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.

define(["require","exports","../geometry/Polygon","../graphic","../geometry/Polyline","../geometry/Point","../geometry/Extent","../geometry/Multipoint","../SpatialReference","./languageUtils","./treeAnalysis","./Dictionary","./Feature","./FunctionWrapper","./functions/date","./functions/string","./functions/maths","./functions/geometry","./functions/stats"],function(e,r,n,t,o,a,i,u,s,l,c,f,p,E,g,h,v,w,N){function d(e,r){for(var n=[],t=0;t<r.arguments.length;t++)n.push(T(e,r.arguments[t]));return n}function m(e,r,n){try{return n(e,r,d(e,r))}catch(t){throw t}}function S(e){return e instanceof ur||e instanceof E}function T(e,r){try{switch(r.type){case"EmptyStatement":return sr;case"VariableDeclarator":return B(e,r);case"VariableDeclaration":return L(e,r);case"BlockStatement":return P(e,r);case"FunctionDeclaration":return F(e,r);case"ReturnStatement":return D(e,r);case"IfStatement":return x(e,r);case"ExpressionStatement":return A(e,r);case"AssignmentExpression":return U(e,r);case"UpdateExpression":return R(e,r);case"BreakStatement":return lr;case"ContinueStatement":return cr;case"ForStatement":return M(e,r);case"ForInStatement":return b(e,r);case"Identifier":return q(e,r);case"MemberExpression":return V(e,r);case"Literal":return r.value;case"ThisExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"CallExpression":return H(e,r);case"UnaryExpression":return _(e,r);case"BinaryExpression":return Y(e,r);case"LogicalExpression":return G(e,r);case"ConditionalExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return k(e,r);case"ObjectExpression":return y(e,r);case"Property":return I(e,r);case"Array":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","UNREOGNISED"))}}catch(n){throw n}}function y(e,r){for(var n={},t=0;t<r.properties.length;t++){var o=T(e,r.properties[t]);if(S(o.value))throw new Error("Illegal Argument");n[o.key.toString()]=o.value}return new f(n)}function I(e,r){return{key:"Identifier"===r.key.type?r.key.name:T(e,r.key),value:T(e,r.value)}}function b(e,r){var n=T(e,r.right);"VariableDeclaration"===r.left.type&&T(e,r.left);var t=null,o="VariableDeclaration"===r.left.type?r.left.declarations[0].id.name:r.left.name;if(null!==e.localScope&&void 0!==e.localScope[o]&&(t=e.localScope[o]),null===t&&void 0!==e.globalScope[o]&&(t=e.globalScope[o]),null===t)throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTDECLARED"));if(l.isArray(n)||l.isString(n)){for(var a=0;a<n.length;a++){t.value=a;var i=T(e,r.body);if(i===lr)break;if(i instanceof ar)return i}return sr}if(!(n instanceof f||n instanceof p))return sr;for(var u=n.keys(),s=0;s<u.length;s++){t.value=u[s];var i=T(e,r.body);if(i===lr)break;if(i instanceof ar)return i}}function M(e,r){null!==r.init&&T(e,r.init);var n={testResult:!0,lastAction:sr};do O(e,r,n);while(n.testResult===!0);return n.lastAction instanceof ar?n.lastAction:sr}function O(e,r,n){return null===r.test||(n.testResult=T(e,r.test),n.testResult!==!1)?(n.lastAction=T(e,r.body),n.lastAction===lr?void(n.testResult=!1):n.lastAction instanceof ar?void(n.testResult=!1):void(null!==r.update&&T(e,r.update))):void 0}function R(e,r){var n,t=r.argument.name.toLowerCase();if(null!==e.localScope&&void 0!==e.localScope[t])return n=e.localScope[t].value,e.localScope[t]={value:"++"===r.operator?n+1:n-1,valueset:!0,node:r},r.prefix===!1?n:"++"===r.operator?n+1:n-1;if(void 0!==e.globalScope[t])return n=e.globalScope[t].value,e.globalScope[t]={value:"++"===r.operator?n+1:n-1,valueset:!0,node:r},r.prefix===!1?n:"++"===r.operator?n+1:n-1;throw new Error("Variable not recognised")}function C(e,r,n,t){switch(r){case"=":return e;case"/=":return l.toNumber(n)/l.toNumber(e);case"*=":return l.toNumber(n)*l.toNumber(e);case"-=":return l.toNumber(n)-l.toNumber(e);case"+=":return l.isString(n)||l.isString(e)?l.toString(n)+l.toString(e):l.toNumber(n)+l.toNumber(e);case"%=":return l.toNumber(n)%l.toNumber(e);default:throw new Error(c.nodeErrorMessage(t,"RUNTIME","OPERATORNOTRECOGNISED"))}}function U(e,r){var n,t=r.left.name.toLowerCase();if(n=T(e,r.right),null!==e.localScope&&void 0!==e.localScope[t])return e.localScope[t]={value:C(n,r.operator,e.localScope[t].value,r),valueset:!0,node:r.right},sr;if(void 0!==e.globalScope[t])return e.globalScope[t]={value:C(n,r.operator,e.globalScope[t].value,r),valueset:!0,node:r.right},sr;throw new Error("Variable not recognised")}function A(e,r){if("AssignmentExpression"===r.expression.type||"UpdateExpression"===r.expression.type)return T(e,r.expression);if("CallExpression"===r.expression.type){var n=T(e,r.expression);return n===sr?sr:new ir(n)}var n=T(e,r.expression);return n===sr?sr:new ir(n)}function x(e,r){if("AssignmentExpression"===r.test.type||"UpdateExpression"===r.test.type)throw new Error(c.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var n=T(e,r.test);if(n===!0)return T(e,r.consequent);if(n===!1)return null!==r.alternate?T(e,r.alternate):sr;throw new Error(c.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))}function P(e,r){for(var n=sr,t=0;t<r.body.length;t++)if(n=T(e,r.body[t]),n instanceof ar||n===lr||n===cr)return n;return n}function D(e,r){if(null===r.argument)return new ar(sr);var n=T(e,r.argument);return new ar(n)}function F(e,r){var n=r.id.name.toLowerCase();return e.globalScope[n]={valueset:!0,node:null,value:new E(r,e)},sr}function L(e,r){for(var n=0;n<r.declarations.length;n++)T(e,r.declarations[n]);return sr}function B(e,r){var n=null===r.init?null:T(e,r.init),t=r.id.name.toLowerCase();return null!==e.localScope?e.localScope[t]={value:n,valueset:!0,node:r.init}:e.globalScope[t]={value:n,valueset:!0,node:r.init},sr}function V(e,r){try{var n=T(e,r.object);if(null===n)throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"));if(r.computed===!1){if(n instanceof f||n instanceof p)return n.field(r.property.name);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}var t=T(e,r.property);if(n instanceof f||n instanceof p){if(l.isString(t))return n.field(t);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isArray(n)){if(l.isNumber(t)&&isFinite(t)&&Math.floor(t)===t)return n[t];throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isString(n)){if(l.isNumber(t)&&isFinite(t)&&Math.floor(t)===t)return n[t];throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}catch(o){throw o}}function _(e,r){try{var n=T(e,r.argument);if(l.isBoolean(n)){if("!"===r.operator)return!n;throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}if(l.isNumber(n)){if("-"===r.operator)return-1*n;if("+"===r.operator)return 1*n;throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDTYPE"))}catch(t){throw t}}function k(e,r){try{for(var n=[],t=0;t<r.elements.length;t++){var o=T(e,r.elements[t]);if(S(o))throw new Error(c.nodeErrorMessage(r,"RUNTIME","FUNCTIONCONTEXTILLEGAL"));n.push(o)}return n}catch(a){throw a}}function Y(e,r){try{var n=[T(e,r.left),T(e,r.right)],t=n[0],o=n[1];switch(r.operator){case"==":return l.equalityTest(t,o);case"=":return l.equalityTest(t,o);case"!=":return!l.equalityTest(t,o);case"<":return o>t;case">":return t>o;case"<=":return o>=t;case">=":return t>=o;case"+":return l.isString(t)||l.isString(o)?l.toString(t)+l.toString(o):l.toNumber(t)+l.toNumber(o);case"-":return l.toNumber(t)-l.toNumber(o);case"*":return l.toNumber(t)*l.toNumber(o);case"/":return l.toNumber(t)/l.toNumber(o);case"%":return l.toNumber(t)%l.toNumber(o);default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","OPERATORNOTRECOGNISED"))}}catch(a){throw a}}function G(e,r){try{if("AssignmentExpression"===r.left.type||"UpdateExpression"===r.left.type)throw new Error(c.nodeErrorMessage(r.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("AssignmentExpression"===r.right.type||"UpdateExpression"===r.right.type)throw new Error(c.nodeErrorMessage(r.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var n=[T(e,r.left),T(e,r.right)],t=n[0],o=n[1];if(!l.isBoolean(t)||!l.isBoolean(o))throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYBOOLEAN"));switch(r.operator){case"||":return t||o;case"&&":return t&&o;default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"))}}catch(a){throw a}}function q(e,r){var n;try{var t=r.name.toLowerCase();if(null!==e.localScope&&void 0!==e.localScope[t])return n=e.localScope[t],n.valueset===!0?n.value:(n.value=T(e,n.node),n.valueset=!0,n.value);if(void 0!==e.globalScope[t])return n=e.globalScope[t],n.valueset===!0?n.value:(n.value=T(e,n.node),n.valueset=!0,n.value);throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTFOUND"))}catch(o){throw o}}function H(e,r){try{if("Identifier"!==r.callee.type)throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYNODESSUPPORTED"));if(null!==e.localScope&&void 0!==e.localScope[r.callee.name.toLowerCase()]){var n=e.localScope[r.callee.name.toLowerCase()];if(n.value instanceof ur)return n.value.fn(e,r);if(n.value instanceof E)return Q(e,r,n.value.definition);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}if(void 0!==e.globalScope[r.callee.name.toLowerCase()]){var n=e.globalScope[r.callee.name.toLowerCase()];if(n.value instanceof ur)return n.value.fn(e,r);if(n.value instanceof E)return Q(e,r,n.value.definition);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))}catch(t){throw t}}function W(e){return null==e?"":l.isArray(e)?"Array":l.isDate(e)?"Date":l.isString(e)?"String":l.isBoolean(e)?"Boolean":l.isNumber(e)?"Number":e instanceof f?"Dictionary":e instanceof p?"Feature":e instanceof a?"Point":e instanceof n?"Polygon":e instanceof o?"Polyline":e instanceof u?"MultiPoint":e instanceof i?"Envelope":S(e)?"Function":e===sr?"Void":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function j(e,r,n,t){try{var o=T(e,r.arguments[n]);if(l.equalityTest(o,t))return T(e,r.arguments[n+1]);var a=r.arguments.length-n;return 1===a?T(e,r.arguments[n]):2===a?null:j(e,r,n+2,t)}catch(i){throw i}}function K(e,r,n,t){try{if(t===!0)return T(e,r.arguments[n+1]);var o=r.arguments.length-n;if(3===o)return T(e,r.arguments[n+2]);var a=T(e,r.arguments[n+2]);if(l.isBoolean(a)===!1)throw new Error("WHEN needs boolean test conditions");return K(e,r,n+2,a)}catch(i){throw i}}function X(e,r){var n=e.length,t=Math.floor(n/2);return 0===n?[]:1===n?[e[0]]:z(X(e.slice(0,t),r),X(e.slice(t,n),r),r)}function z(e,r,n){for(var t=[];e.length>0||r.length>0;)if(e.length>0&&r.length>0){var o=n(e[0],r[0]);isNaN(o)&&(o=0),0>=o?(t.push(e[0]),e=e.slice(1)):(t.push(r[0]),r=r.slice(1))}else e.length>0?(t.push(e[0]),e=e.slice(1)):r.length>0&&(t.push(r[0]),r=r.slice(1));return t}function J(e,r,n){try{var t=e.body;if(n.length!==e.params.length)throw new Error("Invalid Parameter calls to function.");for(var o=0;o<n.length;o++)r.localScope[e.params[o].name.toLowerCase()]={d:null,value:n[o],valueset:!0,node:null};var a=T(r,t);if(a instanceof ar)return a.value;if(a===lr)throw new Error("Cannot Break from a Function");if(a===cr)throw new Error("Cannot Continue from a Function");return a instanceof ir?a.value:a}catch(i){throw i}}function Q(e,r,n){return m(e,r,function(r,t,o){var a={spatialReference:e.spatialReference,applicationCache:void 0===e.applicationCache?null:e.applicationCache,globalScope:e.globalScope,depthCounter:e.depthCounter+1,localScope:{}};if(a.depthCounter>64)throw new Error("Exceeded maximum function depth");return J(n,a,o)})}function Z(e){var r=function(){var r={applicationCache:void 0===e.context.applicationCache?null:e.context.applicationCache,spatialReference:e.context.spatialReference,localScope:{},depthCounter:e.context.depthCounter+1,globalScope:e.context.globalScope};if(r.depthCounter>64)throw new Error("Exceeded maximum function depth");return J(e.definition,r,arguments)};return r}function $(e,r,n){var o={};e||(e={}),n||(n={}),o.infinity={value:Number.POSITIVE_INFINITY,valueset:!0,node:null},o.pi={value:Math.PI,valueset:!0,node:null};for(var a in r)o[a]={value:new ur(r[a]),valueset:!0,node:null};for(var a in n)o[a]={value:new ur(n[a]),"native":!0,valueset:!0,node:null};for(var a in e)o[a]=e[a]instanceof t?{value:new f(e[a]),valueset:!0,node:null}:{value:e[a],valueset:!0,node:null};return o}function er(e,r,n){n||(n=new s(102100));var t=$(r.vars,fr,r.customfunctions),o={spatialReference:n,globalScope:t,localScope:null,depthCounter:1,applicationCache:void 0===r.applicationCache?null:r.applicationCache},a=T(o,e.body[0].body);if(a instanceof ar&&(a=a.value),a instanceof ir&&(a=a.value),a===sr)throw new Error("Cannot return VOID");if(a===lr)throw new Error("Cannot return BREAK");if(a===cr)throw new Error("Cannot return CONTINUE");if(a instanceof E)throw new Error("Cannot return FUNCTION");if(a instanceof ur)throw new Error("Cannot return FUNCTION");return a}function rr(e,r){return void 0===r&&(r=!1),c.findFieldLiterals(e,r)}function nr(e,r){return c.validateScript(e,r,"simple")}function tr(e,r){return c.referencesMember(e,r)}function or(e,r){return c.referencesFunction(e,r)}var ar=function(){function e(e){this.value=e}return e}(),ir=function(){function e(e){this.value=e}return e}(),ur=function(){function e(e){this.fn=e}return e}(),sr={type:"VOID"},lr={type:"BREAK"},cr={type:"CONTINUE"},fr={};g.registerFunctions(fr,m),h.registerFunctions(fr,m),v.registerFunctions(fr,m),w.registerFunctions(fr,m,S),N.registerFunctions(fr,m),fr["typeof"]=function(e,r){return m(e,r,function(e,r,n){l.pcCheck(n,1,1);var t=W(n[0]);if("Unrecognised Type"===t)throw new Error("Unrecognised Type");return t})},fr.iif=function(e,r){try{l.pcCheck(null===r.arguments?[]:r.arguments,3,3);var n=T(e,r.arguments[0]);if(l.isBoolean(n)===!1)throw new Error("IF Function must have a boolean test condition");return n===!0?T(e,r.arguments[1]):T(e,r.arguments[2])}catch(t){throw t}},fr.decode=function(e,r){try{if(r.arguments.length<2)throw new Error("Missing Parameters");if(2===r.arguments.length)return T(e,r.arguments[1]);if((r.arguments.length-1)%2===0)throw new Error("Must have a default value result.");var n=T(e,r.arguments[0]),t=1;return j(e,r,t,n)}catch(o){throw o}},fr.when=function(e,r){try{if(r.arguments.length<3)throw new Error("Missing Parameters");if(r.arguments.length%2===0)throw new Error("Must have a default value result.");var n=T(e,r.arguments[0]);if(l.isBoolean(n)===!1)throw new Error("WHEN needs boolean test conditions");var t=0;return K(e,r,t,n)}catch(o){throw o}},fr.top=function(e,r){return m(e,r,function(e,r,n){if(l.pcCheck(n,2,2),l.isArray(n[0]))return n[1].length>=n[0].length?n[0]:n[0].slice(0,l.toNumber(n[1]));throw new Error("Top cannot accept this parameter type")})},fr.first=function(e,r){return m(e,r,function(e,r,n){return l.pcCheck(n,1,1),l.isArray(n[0])?0===n[0].length?null:n[0][0]:null})},fr.sort=function(e,r){return m(e,r,function(e,r,n){if(l.pcCheck(n,1,2),l.isArray(n[0])===!1)throw new Error("Illegal Argument");if(n.length>1){if(S(n[1])===!1)throw new Error("Illegal Argument");var t=n[0],o=Z(n[1]);return t=X(t,function(e,r){return o(e,r)})}var t=n[0];if(0===t.length)return[];for(var a={},i=!0,u=0;u<t.length;u++){var s=W(t[u]);""!==s?a[s]=!0:i=!0}if(a.Array===!0||a.Dictionary===!0||a.Feature===!0||a.Point===!0||a.Polygon===!0||a.Polyline===!0||a.MultiPoint===!0||a.Envelope===!0||a.Function===!0)return t.slice(0);var c=0,f="";for(var p in a)c++,f=p;return t=c>1||"String"===f?X(t,function(e,r){return null===e||void 0===e?null===r||void 0===r?0:1:null===r||void 0===r?-1:e.toString()<r.toString()?-1:e.toString()===r.toString()?0:1}):"Number"===f?X(t,function(e,r){return e-r}):"Boolean"===f?X(t,function(e,r){return e===r?0:e?-1:1}):"Date"===f?X(t,function(e,r){return r-e}):t.slice(0)})};var pr={fixSpatialReference:l.fixSpatialReference,parseArguments:d,standardFunction:m};r.functionHelper=pr,r.executeScript=er,r.extractFieldLiterals=rr,r.validateScript=nr,r.referencesMember=tr,r.referencesFunction=or});