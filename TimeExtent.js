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
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","./kernel"],function(e,t,i,s){var r=e(null,{declaredClass:"esri.TimeExtent",constructor:function(e){if(arguments.length>1)this._create(arguments[0],arguments[1]);else if(e)if(t.isArray(e)){var i=e[0],s=e[1];this.startTime=null===i||"null"===i?null:new Date(i),this.endTime=null===s||"null"===s?null:new Date(s)}else e instanceof Date&&this._create(e,null)},offset:function(e,t){var i=new r,s=this.startTime,n=this.endTime;return s&&(i.startTime=this._getOffsettedDate(s,e,t)),n&&(i.endTime=this._getOffsettedDate(n,e,t)),i},intersection:function(e){return this._intersection(this,e)},toJson:function(){var e=[],t=this.startTime;e.push(t?t.getTime():"null");var i=this.endTime;return e.push(i?i.getTime():"null"),e},_create:function(e,t){this.startTime=e?new Date(e.getTime()):null,this.endTime=t?new Date(t.getTime()):null},_refData:{esriTimeUnitsMilliseconds:{getter:"getUTCMilliseconds",setter:"setUTCMilliseconds",multiplier:1},esriTimeUnitsSeconds:{getter:"getUTCSeconds",setter:"setUTCSeconds",multiplier:1},esriTimeUnitsMinutes:{getter:"getUTCMinutes",setter:"setUTCMinutes",multiplier:1},esriTimeUnitsHours:{getter:"getUTCHours",setter:"setUTCHours",multiplier:1},esriTimeUnitsDays:{getter:"getUTCDate",setter:"setUTCDate",multiplier:1},esriTimeUnitsWeeks:{getter:"getUTCDate",setter:"setUTCDate",multiplier:7},esriTimeUnitsMonths:{getter:"getUTCMonth",setter:"setUTCMonth",multiplier:1},esriTimeUnitsYears:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:1},esriTimeUnitsDecades:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:10},esriTimeUnitsCenturies:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:100}},_intersection:function(e,t){if(e&&t){var i=e.startTime,s=e.endTime,n=t.startTime,l=t.endTime;i=i?i.getTime():-1/0,n=n?n.getTime():-1/0,s=s?s.getTime():1/0,l=l?l.getTime():1/0;var a,u;if(n>=i&&s>=n?a=n:i>=n&&l>=i&&(a=i),s>=n&&l>=s?u=s:l>=i&&s>=l&&(u=l),isNaN(a)||isNaN(u))return null;var T=new r;return T.startTime=a===-1/0?null:new Date(a),T.endTime=1/0===u?null:new Date(u),T}return null},_getOffsettedDate:function(e,t,i){var s=this._refData,r=new Date(e.getTime());return t&&i&&(s=s[i],r[s.setter](r[s.getter]()+t*s.multiplier)),r}});return i("extend-esri")&&(s.TimeExtent=r),r});