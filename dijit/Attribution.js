// COPYRIGHT © 2015 Esri
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
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.

// No attribution data, No copyright - just ignore this layer

// No need to update layers that just have copyright

// Nothing to do for layers that have copyright text

// Does layerId have copyright text that is a duplicate of 

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/kernel","dojo/has","dojo/query","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","../kernel","../lang","../SpatialReference","../geometry/webMercatorUtils","../geometry/Extent"],function(t,e,i,s,o,r,n,a,d,h,c,l,u,_,m,p,f,y){var g=t(null,{declaredClass:"esri.dijit.Attribution",itemDelimiter:" | ",listClass:"esriAttributionList",itemClass:"esriAttributionItem",lastItemClass:"esriAttributionLastItem",delimiterClass:"esriAttributionDelim",constructor:function(t,i){try{e.mixin(this,t),this._attributions={},this._pendingDfds={},this._activeLayers=[],this._sharedLayers=[];var r=this.domNode=a.byId(i),n=this.map,h="<span class='"+this.listClass+"'></span>";if(r&&(d.set(r,"innerHTML",h),this.listNode=o.query(".esriAttributionList",r)[0],this.itemNodes={}),this._eventConnections=[s.connect(n,"onLayerAdd",this,this._onLayerAdd),s.connect(n,"onLayerRemove",this,this._onLayerRemove),s.connect(n,"onLayerSuspend",this,this._onLayerSuspend),s.connect(n,"onLayerResume",this,this._onLayerResume),s.connect(n,"onExtentChange",this,this._onExtentChange)],n.loaded){var c,l,u=n.layerIds.concat(n.graphicsLayerIds),_=u.length;for(l=0;_>l;l++)c=n.getLayer(u[l]),c.loaded&&this._onLayerAdd(c)}}catch(m){}},startup:function(){},destroy:function(){i.forEach(this._eventConnections,s.disconnect),h.destroy(this.listNode),this.map=this.domNode=this._eventConnections=this.listNode=this._attributions=this._pendingDfds=this.itemNodes=this._activeLayers=this._lastItem=this._sharedLayers=null},_onLayerAdd:function(t){try{var i=this._attributions,s=t.id;if(m.isDefined(i[s])||!t.showAttribution)return;if(t.hasAttributionData){var o=t.getAttributionData();this._pendingDfds[s]=1,i[s]=o,o.addBoth(e.partial(this._onAttributionLoad,this,t))}else i[s]=t.copyright||t.copyrightText||"",i[s]?(t.suspended||this._activeLayers.push(s),this._createNode(s)):this._onLayerRemove(t)}catch(r){}},_onAttributionLoad:function(t,e,i){var s=t._attributions,o=t._pendingDfds,r=e.id;o&&o[r]&&(delete o[r],(!i||i instanceof Error)&&(i=""),s[r]=i?t._createIndexByLevel(i,-1!==e.declaredClass.toLowerCase().indexOf("vetiledlayer")):e.copyright||e.copyrightText||"",s[r]?(e.suspended||t._activeLayers.push(r),t._createNode(r)):t._onLayerRemove(e))},_onLayerRemove:function(t){try{var e,s=t.id,o=this.itemNodes,r=-1;this._onLayerSuspend(t),delete this._attributions[s],delete this._pendingDfds[s],e=this._getGroupIndex(s),-1!==e&&(r=i.indexOf(this._sharedLayers[e],s),-1!==r&&(this._sharedLayers[e].splice(r,1),this._sharedLayers[e].length<=1&&this._sharedLayers.splice(e,1))),o[s]&&-1===r&&h.destroy(o[s]),delete o[s],this._updateLastItem()}catch(n){}},_onLayerSuspend:function(t){try{var e=t.id;if(this._attributions[e]){var s=i.indexOf(this._activeLayers,e),o=this.itemNodes[e];-1!==s&&this._activeLayers.splice(s,1),o&&this._toggleItem(o,!1,this._getGroupIndex(e))}}catch(r){}},_onLayerResume:function(t){try{var s=t.id,o=this._attributions[s],r=this.itemNodes[s];if(o&&(-1===i.indexOf(this._activeLayers,s)&&this._activeLayers.push(s),r)){var n=e.isString(o)?o:this._getContributorsList(o,this.map.extent,this.map.getLevel());e.isString(o)||d.set(r,"innerHTML",n?n+this._getDelimiter():""),n&&this._toggleItem(r,!0,this._getGroupIndex(s))}}catch(a){}},_onExtentChange:function(t,i,s,o){try{var r,n,a,h,c=this._activeLayers,l=this._attributions,u=this.itemNodes,_=c.length||0;for(h=0;_>h;h++)if(n=c[h],a=l[n],r=u[n],r&&!e.isString(a)){var m=this._getContributorsList(a,t,o?o.level:-1);d.set(r,"innerHTML",m?m+this._getDelimiter():""),this._toggleItem(r,!!m,-1)}}catch(p){}this._adjustCursorStyle()},_createNode:function(t){if(this.domNode){var i,s=this._checkShareInfo(t),o=s&&s.sharedWith,r=o&&this.itemNodes[o],n=this.map,a=this._attributions[t],d=e.isString(a)?a:this._getContributorsList(a,n.extent,n.getLevel()),c=!!d&&!n.getLayer(t).suspended;r?(this.itemNodes[t]=r,this._toggleItem(r,c,s.index)):(i=this.itemNodes[t]=h.create("span",{"class":this.itemClass,innerHTML:d?d+this._getDelimiter():"",style:{display:c?"inline":"none"}},this.listNode),c&&this._setLastItem(i)),this._adjustCursorStyle()}},_checkShareInfo:function(t){var s,o,r,n=this._attributions,a=-1,d=n[t];if(d&&e.isString(d)){for(o in n)if(s=n[o],o!==t&&s&&e.isString(s)&&s.length===d.length&&s.toLowerCase()===d.toLowerCase()){r=o;break}var h,c=this._sharedLayers,l=c.length;if(r){for(o=0;l>o;o++)if(h=c[o],-1!==i.indexOf(h,r)){a=o,h.push(t);break}-1===a&&(a=c.push([r,t])-1)}}return a>-1?{index:a,sharedWith:r}:null},_getGroupIndex:function(t){var e,s=this._sharedLayers,o=s.length,r=-1;for(e=0;o>e;e++)if(-1!==i.indexOf(s[e],t)){r=e;break}return r},_getDelimiter:function(){var t=this.itemDelimiter;return t?"<span class='"+this.delimiterClass+"'>"+t+"</span>":""},_toggleItem:function(t,e,s){if(s>-1&&!e){var o,r=this._sharedLayers[s],n=r.length,a=this._activeLayers;for(o=0;n>o;o++)if(-1!==i.indexOf(a,r[o]))return}c.set(t,"display",e?"inline":"none"),this._updateLastItem()},_updateLastItem:function(){var t,e,i=this.listNode.childNodes,s=i.length;if(s)for(t=s-1;t>=0;t--)if(e=i[t],"none"!==c.get(e,"display")){this._setLastItem(e);break}this._adjustCursorStyle()},_setLastItem:function(t){var e=this.itemClass,i=this.lastItemClass;this._lastItem&&l.replace(this._lastItem,e,i),t&&(l.replace(t,i,e),this._lastItem=t)},_createIndexByLevel:function(t,e){var i,s,o,r,n,a,d,h,c,l=t.contributors,u=l?l.length:0,_=new p(4326),g={};for(r=0;u>r;r++)for(i=l[r],s=i.coverageAreas,a=s?s.length:0,n=0;a>n;n++)for(o=s[n],c=o.bbox,h={extent:f.geographicToWebMercator(new y(c[1],c[0],c[3],c[2],_)),attribution:i.attribution||"",zoomMin:o.zoomMin-(e&&o.zoomMin?1:0),zoomMax:o.zoomMax-(e&&o.zoomMax?1:0),score:m.isDefined(o.score)?o.score:100,objectId:r},d=h.zoomMin;d<=h.zoomMax;d++)g[d]=g[d]||[],g[d].push(h);return g},_getContributorsList:function(t,e,i){var s="";if(e&&m.isDefined(i)&&i>-1){var o,r,n=t[i],a=e.getCenter().normalize(),d=n?n.length:0,h=[],c={};for(r=0;d>r;r++)o=n[r],!c[o.objectId]&&o.extent.contains(a)&&(c[o.objectId]=1,h.push(o));for(h.sort(function(t,e){return e.score-t.score||t.objectId-e.objectId}),d=h.length,r=0;d>r;r++)h[r]=h[r].attribution;s=h.join(", ")}return s},_adjustCursorStyle:function(){var t=u.position(this.listNode.parentNode,!0).h;l.contains(this.listNode.parentNode,"esriAttributionOpen")?(l.remove(this.listNode.parentNode,"esriAttributionOpen"),t>u.position(this.listNode.parentNode,!0).h?(c.set(this.listNode.parentNode,"cursor","pointer"),l.add(this.listNode.parentNode,"esriAttributionOpen")):c.set(this.listNode.parentNode,"cursor","default")):(l.add(this.listNode.parentNode,"esriAttributionOpen"),t<u.position(this.listNode.parentNode,!0).h?c.set(this.listNode.parentNode,"cursor","pointer"):c.set(this.listNode.parentNode,"cursor","default"),l.remove(this.listNode.parentNode,"esriAttributionOpen"))}});return r("extend-esri")&&e.setObject("dijit.Attribution",g,_),g});