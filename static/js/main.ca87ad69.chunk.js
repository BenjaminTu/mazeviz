(this.webpackJsonpmazeviz=this.webpackJsonpmazeviz||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(1),i=n.n(a),o=n(8),s=n.n(o),c=(n(14),n(15),n(4)),u=n(2),h=n(3),l=n(6),d=n(5),p=(n(16),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,a=e.nodeType,i=e.onMouseDown,o=e.onMouseEnter,s=e.onMouseUp;return Object(r.jsx)("div",{className:"node".concat(" ",a).trim(),onMouseDown:function(){return i(t,n)},onMouseEnter:function(){return o(t,n)},onMouseUp:function(){return s()}})}}]),n}(a.Component)),v="",f="wall",y="start",g="goal",b="visited",j="path",T=[[0,-1],[1,0],[0,1],[-1,0]],m=[[0,-1],[1,0],[0,1],[-1,0],[1,1],[1,-1],[-1,-1],[-1,1]];function k(e,t,n){if(!e.length)return[];for(var r=e.length,a=e[0].length,i=n?m:T,o=[],s=0;s<i.length;s++){var c=i[s],u=t.row+c[0],h=t.col+c[1];u>=0&&h>=0&&u<r&&h<a&&e[u][h].nodeType!==f&&o.push(e[u][h])}return o}var w=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e,t){return e-t};Object(u.a)(this,e),this.heap=[],this._comparator=t}return Object(h.a)(e,[{key:"add",value:function(e){if(null===e)throw new Error("Item cannot be null!");return this.heap.push(e),this._swimUp(this.size()-1),!0}},{key:"clear",value:function(){this.heap=[]}},{key:"peek",value:function(){return 0===this.size()?null:this.heap[0]}},{key:"updateItem",value:function(e){for(var t=0;t<this.size();t++)this.heap[t]===e&&(this._sinkDown(t),this._swimUp(t))}},{key:"poll",value:function(){if(this.size()<=1)return this.heap.pop();var e=this.heap[0];return this.heap[0]=this.heap.pop(),this._sinkDown(0),e}},{key:"size",value:function(){return this.heap.length}},{key:"isEmpty",value:function(){return 0===this.size()}},{key:"_sinkDown",value:function(e){for(var t=e;t<this.size();){var n=2*t+1,r=2*t+2,a=t;if(n<this.size()&&this._comparator(this.heap[t],this.heap[n])>0&&(a=n),r<this.size()&&this._comparator(this.heap[a],this.heap[r])>0&&(a=r),a===t)return;var i=this.heap[t];this.heap[t]=this.heap[a],this.heap[a]=i,t=a}}},{key:"_swimUp",value:function(e){for(var t=e;t>0;){var n=Math.floor((t-1)/2);if(!(this._comparator(this.heap[n],this.heap[t])>0))return;var r=this.heap[n];this.heap[n]=this.heap[t],this.heap[t]=r,t=n}}}]),e}();function M(e,t,n,r,a){function i(e){return"".concat(e.row," ",e.col)}void 0===a&&(a=r?function(e,t){var n=Math.abs(e.row-t.row),r=Math.abs(e.col-t.col);return 1*(n+r)+(Math.SQRT2-2)*Math.min(n,r)}:function(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}),console.log(a);var o=new w((function(e,t){return e.f-t.f})),s=[],c={};for(t.distance=0,t.f=0,t.opened=!0,c[i(t)]=[t],o.add(t);!o.isEmpty();){var u=o.poll();if(u.closed=!0,s.push(u),u===n)return[c[i(u)],s];for(var h=k(e,u,r),l=0;l<h.length;l++){var d=h[l];if(!d.closed){var p=d.row-u.row===0||d.col-u.col===0?1:Math.SQRT2,v=u.distance+p;(!d.opened||v<d.distance)&&(d.distance=v,d.f=d.distance+a(d,n),c[i(d)]=c[i(u)].slice(),c[i(d)].push(d),d.opened?o.updateItem(d):(o.add(d),d.opened=!0))}}}return[[],s]}var O={"---":function(){return[[],[]]},"A*":M,BFS:function(e,t,n,r){var a=[],i=[];for(a.push([t,[t]]);a.length;){var o=a.shift(),s=Object(c.a)(o,2),u=s[0],h=s[1];if(!u.visited){if(u.visited=!0,i.push(u),u===n)return[h,i];for(var l=k(e,u,r),d=0;d<l.length;d++){var p=l[d];if(!p.visited){var v=h.slice();v.push(p),a.push([p,v])}}}}return[[],i]},DFS:function(e,t,n,r){var a=[],i=[];for(a.push([t,[t]]);a.length;){var o=a.pop(),s=Object(c.a)(o,2),u=s[0],h=s[1];if(!u.visited){if(u.visited=!0,i.push(u),u===n)return[h,i];for(var l=k(e,u,r),d=0;d<l.length;d++){var p=l[d];if(!p.visited){var v=h.slice();v.push(p),a.push([p,v])}}}}return[[],i]},Dijkstra:function(e,t,n,r){return M(e,t,n,r,(function(e,t){return 0}))}};function S(e,t,n){var r=e.length,a=e[0].length,i=T.slice();!function(e){var t,n,r;for(r=e.length-1;r>0;r--)t=Math.floor(Math.random()*(r+1)),n=e[r],e[r]=e[t],e[t]=n}(i),t.visited=!0;for(var o=0;o<i.length;o++){var s=i[o],c=t.row+2*s[0],u=t.col+2*s[1];if(c>=0&&u>=0&&c<r&&u<a&&e[c][u]!==g&&!e[c][u].visited){var h=Math.floor((c+t.row)/2),l=Math.floor((u+t.col)/2);n.push(t),n.push(e[h][l]),S(e,e[c][u],n)}}return n}n(17);var N={r:10,c:10},x={r:10,c:43},z=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).state={start:N,goal:x,grid:r.initGrid(27,51),pathAlgo:"---",diag:!1,dragType:v,disabled:!1,mouseIsPressed:!1,animationSpeed:20},r}return Object(h.a)(n,[{key:"initGrid",value:function(e,t){for(var n=[],r=0;r<e;r++){for(var a=[],i=0;i<t;i++){var o=v;N.r===r&&N.c===i&&(o=y),x.r===r&&x.c===i&&(o=g);var s={row:r,col:i,prevNodeType:v,nodeType:o,visited:!1,distance:1/0,f:1/0,opened:!1,closed:!1};a.push(s)}n.push(a)}return n}},{key:"clearBoard",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++){var r=e[t][n].nodeType;r!==y&&r!==g?this.setNodeType(t,n,v):e[t][n].prevNodeType=v}this.setState(e)}},{key:"clearCache",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++){e[t][n].visited=!1,e[t][n].opened=!1,e[t][n].closed=!1,e[t][n].distance=1/0,e[t][n].f=1/0;var r=e[t][n].nodeType;r===b||r===j?this.setNodeType(t,n,v):r===f&&(e[t][n].prevNodeType=v)}this.setState(e)}},{key:"setNodeType",value:function(e,t,n){var r=this.state.grid;r[e][t].nodeType!==n&&(r[e][t].prevNodeType=r[e][t].nodeType),r[e][t].nodeType=n}},{key:"revertNodeType",value:function(e,t){var n=this.state.grid;n[e][t].nodeType=n[e][t].prevNodeType}},{key:"handleMouseDown",value:function(e,t){var n=this.state,r=n.grid;if(!n.disabled){var a=r[e][t].nodeType;switch(a){case v:case b:case j:this.setNodeType(e,t,f);break;case f:this.revertNodeType(e,t)}this.setState({grid:r,dragType:a,mouseIsPressed:!0})}}},{key:"handleMouseEnter",value:function(e,t){var n=this.state,r=n.grid,a=n.start,i=n.goal,o=n.disabled,s=n.mouseIsPressed,c=n.dragType;if(!o&&s){var u=r[e][t].nodeType;switch(c){case v:case b:case j:u!==y&&u!==g&&this.setNodeType(e,t,f);break;case f:u===f&&this.revertNodeType(e,t);break;case y:u!==f&&u!==g&&(this.revertNodeType(a.r,a.c),this.setNodeType(e,t,y),this.setState({start:{r:e,c:t}}));break;case g:u!==f&&u!==y&&(this.revertNodeType(i.r,i.c),this.setNodeType(e,t,g),this.setState({goal:{r:e,c:t}}))}this.setState(r)}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"disableInput",value:function(){document.querySelectorAll("button, input").forEach((function(e){return e.disabled=!0})),this.setState({disabled:!0})}},{key:"enableInput",value:function(){document.querySelectorAll("button, input").forEach((function(e){return e.disabled=!1})),this.setState({disabled:!1})}},{key:"setDiag",value:function(e){this.setState({diag:e.target.checked})}},{key:"setPathAlgo",value:function(e){var t=e.target.value;t in O&&this.setState({pathAlgo:t})}},{key:"animateSearch",value:function(){var e=this,t=this.state,n=t.grid,r=t.start,a=t.goal,i=t.pathAlgo,o=t.diag,s=t.animationSpeed;this.clearCache();var u=O[i](n,n[r.r][r.c],n[a.r][a.c],o),h=Object(c.a)(u,2),l=h[0],d=h[1];this.disableInput();for(var p=d.concat(l),v=function(t){var r=p[t];if(r.nodeType===y||r.nodeType===g)return r.prevNodeType=j,"continue";var a=t<d.length?b:j;setTimeout((function(){r.nodeType=a,e.setState({grid:n})}),s*t)},f=0;f<p.length;f++)v(f);setTimeout((function(){e.enableInput()}),s*p.length)}},{key:"generateMaze",value:function(){var e=this,t=this.state,n=t.grid,r=t.start,a=t.animationSpeed,i=[];S(n,n[r.r][r.c],i),this.clearCache(),this.disableInput();for(var o=0;o<n.length;o++)for(var s=0;s<n[0].length;s++){var c=n[o][s].nodeType;c!==y&&c!==g&&this.setNodeType(o,s,f)}this.setState({grid:n});for(var u=function(t){var r=i[t];if(r.nodeType===y||r.nodeType===g)return"continue";setTimeout((function(){r.nodeType=v,e.setState({grid:n})}),a*t)},h=0;h<i.length;h++)u(h);this.enableInput(a*i.length)}},{key:"render",value:function(){var e=this,t=this.state.grid;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{className:"panel",children:[Object(r.jsx)("button",{onClick:function(){return e.clearBoard()},children:" Clear Board "}),Object(r.jsx)("input",{type:"checkbox",id:"checkbox",onChange:function(t){return e.setDiag(t)}}),Object(r.jsx)("label",{htmlFor:"checkbox",children:"Allow Diagonal Movements"}),Object(r.jsx)("select",{id:"select",onChange:function(t){return e.setPathAlgo(t)},children:Object.keys(O).map((function(e,t){return Object(r.jsx)("option",{value:e,children:e},t)}))}),Object(r.jsx)("button",{onClick:function(){return e.animateSearch()},children:"Start Search"}),Object(r.jsx)("button",{onClick:function(){return e.generateMaze()},children:"Generate Maze"})]}),Object(r.jsx)("div",{className:"grid",children:t.map((function(t,n){return Object(r.jsx)("div",{children:t.map((function(t,n){var a=t.row,i=t.col,o=t.nodeType;return Object(r.jsx)(p,{row:a,col:i,nodeType:o,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()}},n)}))},n)}))})]})}}]),n}(a.Component);var I=function(){return Object(r.jsxs)("div",{className:"App",children:[" ",Object(r.jsx)(z,{})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),i(e),o(e)}))};s.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(I,{})}),document.getElementById("root")),C()}],[[18,1,2]]]);
//# sourceMappingURL=main.ca87ad69.chunk.js.map