(this.webpackJsonpmazeviz=this.webpackJsonpmazeviz||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(1),i=n.n(a),o=n(8),s=n.n(o),u=(n(14),n(15),n(2)),c=n(3),h=n(4),l=n(6),d=n(5),p=(n(16),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,a=e.nodeType,i=e.onMouseDown,o=e.onMouseEnter,s=e.onMouseUp;return Object(r.jsx)("div",{draggable:"false",className:"node".concat(" ",a).trim(),onMouseDown:function(){return i(t,n)},onMouseEnter:function(){return o(t,n)},onMouseUp:function(){return s()}})}}]),n}(a.Component)),f="",v="wall",g="start",y="goal",b="visited",j="path",m=[[0,-1],[1,0],[0,1],[-1,0]],k=[[0,-1],[1,0],[0,1],[-1,0],[1,1],[1,-1],[-1,-1],[-1,1]];function T(e){var t,n,r;for(r=e.length-1;r>0;r--)t=Math.floor(Math.random()*(r+1)),n=e[r],e[r]=e[t],e[t]=n}function w(e,t,n){if(!e.length)return[];for(var r=e.length,a=e[0].length,i=n?k:m,o=[],s=0;s<i.length;s++){var u=i[s],c=t.row+u[0],h=t.col+u[1];c>=0&&h>=0&&c<r&&h<a&&e[c][h].nodeType!==v&&o.push(e[c][h])}return o}var M=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e,t){return e-t};Object(c.a)(this,e),this.heap=[],this._comparator=t}return Object(h.a)(e,[{key:"add",value:function(e){if(null===e)throw new Error("Item cannot be null!");return this.heap.push(e),this._swimUp(this.size()-1),!0}},{key:"clear",value:function(){this.heap=[]}},{key:"peek",value:function(){return 0===this.size()?null:this.heap[0]}},{key:"updateItem",value:function(e){for(var t=0;t<this.size();t++)this.heap[t]===e&&(this._sinkDown(t),this._swimUp(t))}},{key:"poll",value:function(){if(this.size()<=1)return this.heap.pop();var e=this.heap[0];return this.heap[0]=this.heap.pop(),this._sinkDown(0),e}},{key:"size",value:function(){return this.heap.length}},{key:"isEmpty",value:function(){return 0===this.size()}},{key:"_sinkDown",value:function(e){for(var t=e;t<this.size();){var n=2*t+1,r=2*t+2,a=t;if(n<this.size()&&this._comparator(this.heap[t],this.heap[n])>0&&(a=n),r<this.size()&&this._comparator(this.heap[a],this.heap[r])>0&&(a=r),a===t)return;var i=this.heap[t];this.heap[t]=this.heap[a],this.heap[a]=i,t=a}}},{key:"_swimUp",value:function(e){for(var t=e;t>0;){var n=Math.floor((t-1)/2);if(!(this._comparator(this.heap[n],this.heap[t])>0))return;var r=this.heap[n];this.heap[n]=this.heap[t],this.heap[t]=r,t=n}}}]),e}(),O=function(){function e(t){Object(c.a)(this,e),this.sets=new Array(t),this.sizes=new Array(t);for(var n=0;n<t;n++)this.sets[n]=n,this.sizes[n]=1}return Object(h.a)(e,[{key:"union",value:function(e,t){var n=this._getRoot(e),r=this._getRoot(t);n!==r&&(this.sizes[n]<this.sizes[r]?(this.sets[n]=r,this.sizes[r]+=this.sizes[n]):(this.sets[r]=n,this.sizes[n]+=this.sizes[r]))}},{key:"find",value:function(e,t){return this._getRoot(e)===this._getRoot(t)}},{key:"_getRoot",value:function(e){for(var t=e;this.sets[t]!==t;)t=this.sets[t];return t}}]),e}();function z(e,t,n,r,a){function i(e){return"".concat(e.row," ",e.col)}void 0===a&&(a=r?function(e,t){var n=Math.abs(e.row-t.row),r=Math.abs(e.col-t.col);return 1*(n+r)+(Math.SQRT2-2)*Math.min(n,r)}:function(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)});var o=new M((function(e,t){return e.f-t.f})),s=[],u={};for(t.distance=0,t.f=0,t.opened=!0,u[i(t)]=[t],o.add(t);!o.isEmpty();){var c=o.poll();if(c.closed=!0,s.push(c),c===n)return[u[i(c)],s];for(var h=w(e,c,r),l=0;l<h.length;l++){var d=h[l];if(!d.closed){var p=d.row-c.row===0||d.col-c.col===0?1:Math.SQRT2,f=c.distance+p;(!d.opened||f<d.distance)&&(d.distance=f,d.f=d.distance+a(d,n),u[i(d)]=u[i(c)].slice(),u[i(d)].push(d),d.opened?o.updateItem(d):(o.add(d),d.opened=!0))}}}return[[],s]}var S={"---":function(){return[[],[]]},"A*":z,BFS:function(e,t,n,r){var a=[],i=[];for(a.push([t,[t]]);a.length;){var o=a.shift(),s=Object(u.a)(o,2),c=s[0],h=s[1];if(!c.visited){if(c.visited=!0,i.push(c),c===n)return[h,i];for(var l=w(e,c,r),d=0;d<l.length;d++){var p=l[d];if(!p.visited){var f=h.slice();f.push(p),a.push([p,f])}}}}return[[],i]},DFS:function(e,t,n,r){var a=[],i=[];for(a.push([t,[t]]);a.length;){var o=a.pop(),s=Object(u.a)(o,2),c=s[0],h=s[1];if(!c.visited){if(c.visited=!0,i.push(c),c===n)return[h,i];for(var l=w(e,c,r),d=0;d<l.length;d++){var p=l[d];if(!p.visited){var f=h.slice();f.push(p),a.push([p,f])}}}}return[[],i]},Dijkstra:function(e,t,n,r){return z(e,t,n,r,(function(e,t){return 0}))}};function N(e,t,n){var r=e.length,a=e[0].length,i=m.slice();T(i),t.visited=!0;for(var o=0;o<i.length;o++){var s=i[o],u=t.row+2*s[0],c=t.col+2*s[1];if(u>=0&&c>=0&&u<r&&c<a&&e[u][c]!==y&&!e[u][c].visited){var h=Math.floor((u+t.row)/2),l=Math.floor((c+t.col)/2);n.push(t),n.push(e[h][l]),n.push(e[u][c]),N(e,e[u][c],n)}}return n}var x={"---":function(){return[]},"Recursive Backtracking":function(e,t){var n=[];return N(e,t,n),n},Kruskal:function(e,t){for(var n=e.length,r=e[0].length,a=[],i=[],o=0;o<n;o+=2)for(var s=0;s<r;s+=2)i.push([o,s,[2,0]]),i.push([o,s,[0,2]]);T(i);for(var c=new O(n*r);i.length;){var h=i.pop(),l=Object(u.a)(h,3),d=l[0],p=l[1],f=l[2],v=d+f[0],g=p+f[1],y=d*n+p,b=v*n+g;if(!(v>=n||g>=r)&&!c.find(y,b)){c.union(y,b);var j=Math.floor((v+d)/2),m=Math.floor((g+p)/2);a.push(e[d][p]),a.push(e[j][m]),a.push(e[v][g])}}return a}},A=(n(17),{r:10,c:10}),C={r:10,c:41},D=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={start:A,goal:C,grid:r.initGrid(27,51),pathAlgo:"---",mazeAlgo:"---",diag:!1,dragType:f,disabled:!1,mouseIsPressed:!1,animationSpeed:20},r}return Object(h.a)(n,[{key:"componentDidMount",value:function(){document.title="Path Visualizer"}},{key:"initGrid",value:function(e,t){for(var n=[],r=0;r<e;r++){for(var a=[],i=0;i<t;i++){var o=f;A.r===r&&A.c===i&&(o=g),C.r===r&&C.c===i&&(o=y);var s={row:r,col:i,prevNodeType:f,nodeType:o,visited:!1,distance:1/0,f:1/0,opened:!1,closed:!1};a.push(s)}n.push(a)}return n}},{key:"clearBoard",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++){var r=e[t][n].nodeType;r!==g&&r!==y?this.setNodeType(t,n,f):e[t][n].prevNodeType=f}this.setState(e)}},{key:"clearCache",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++){e[t][n].visited=!1,e[t][n].opened=!1,e[t][n].closed=!1,e[t][n].distance=1/0,e[t][n].f=1/0;var r=e[t][n].nodeType;r!==b&&r!==j||this.setNodeType(t,n,f),e[t][n].prevNodeType=f}this.setState(e)}},{key:"setNodeType",value:function(e,t,n){var r=this.state.grid;r[e][t].nodeType!==n&&(r[e][t].prevNodeType=r[e][t].nodeType),r[e][t].nodeType=n}},{key:"revertNodeType",value:function(e,t){var n=this.state.grid;n[e][t].nodeType=n[e][t].prevNodeType}},{key:"handleMouseDown",value:function(e,t){var n=this.state,r=n.grid;if(!n.disabled){var a=r[e][t].nodeType;switch(a){case f:case b:case j:this.setNodeType(e,t,v);break;case v:this.revertNodeType(e,t)}this.setState({grid:r,dragType:a,mouseIsPressed:!0})}}},{key:"handleMouseEnter",value:function(e,t){var n=this.state,r=n.grid,a=n.start,i=n.goal,o=n.disabled,s=n.mouseIsPressed,u=n.dragType;if(!o&&s){var c=r[e][t].nodeType;switch(u){case f:case b:case j:c!==g&&c!==y&&this.setNodeType(e,t,v);break;case v:c===v&&this.revertNodeType(e,t);break;case g:c!==v&&c!==y&&(this.revertNodeType(a.r,a.c),this.setNodeType(e,t,g),this.setState({start:{r:e,c:t}}));break;case y:c!==v&&c!==g&&(this.revertNodeType(i.r,i.c),this.setNodeType(e,t,y),this.setState({goal:{r:e,c:t}}))}this.setState(r)}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"disableInput",value:function(){document.querySelectorAll("button").forEach((function(e){return e.disabled=!0})),this.setState({disabled:!0})}},{key:"enableInput",value:function(){document.querySelectorAll("button").forEach((function(e){return e.disabled=!1})),this.setState({disabled:!1})}},{key:"setDiag",value:function(e){this.setState({diag:e.target.checked})}},{key:"setPathAlgo",value:function(e){var t=e.target.value;t in S&&this.setState({pathAlgo:t})}},{key:"getPathLength",value:function(e){for(var t=0,n=0;n<e.length-1;n++){var r=e[n],a=e[n+1],i=Math.abs(r.row-a.row),o=Math.abs(r.col-a.col);t+=0===i||0===o?1:Math.SQRT2}return t}},{key:"animateSearch",value:function(){var e=this,t=this.state,n=t.grid,r=t.start,a=t.goal,i=t.pathAlgo,o=t.diag,s=t.animationSpeed;this.clearCache();var c=performance.now(),h=S[i](n,n[r.r][r.c],n[a.r][a.c],o),l=Object(u.a)(h,2),d=l[0],p=l[1],f=performance.now()-c;console.log(f);var v=this.getPathLength(d);console.log(v),this.disableInput();for(var m=p.concat(d),k=function(t){var r=m[t];if(r.nodeType===g||r.nodeType===y)return r.nodeType===g&&m.length===p.length?(r.prevNodeType=b,"continue"):(r.prevNodeType=j,"continue");var a=t<p.length?b:j;setTimeout((function(){r.nodeType=a,e.setState({grid:n})}),s*t)},T=0;T<m.length;T++)k(T);setTimeout((function(){e.enableInput()}),s*m.length)}},{key:"setMazeAlgo",value:function(e){var t=e.target.value;t in x&&this.setState({mazeAlgo:t})}},{key:"generateMaze",value:function(){var e=this,t=this.state,n=t.grid,r=t.start,a=t.animationSpeed,i=t.mazeAlgo,o=performance.now(),s=x[i](n,n[r.r][r.c]),u=performance.now()-o;console.log(u),this.clearCache(),this.disableInput();for(var c=0;c<n.length;c++)for(var h=0;h<n[0].length;h++){var l=n[c][h].nodeType;l!==g&&l!==y&&this.setNodeType(c,h,v)}this.setState({grid:n});for(var d=function(t){var r=s[t];if(r.nodeType===g||r.nodeType===y)return"continue";setTimeout((function(){r.nodeType=f,e.setState({grid:n})}),a*t)},p=0;p<s.length;p++)d(p);setTimeout((function(){e.enableInput()}),a*s.length)}},{key:"render",value:function(){var e=this,t=this.state.grid;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{className:"panel",children:[Object(r.jsx)("button",{onClick:function(){return e.clearBoard()},children:" Clear Board "}),Object(r.jsx)("input",{type:"checkbox",id:"checkbox",onChange:function(t){return e.setDiag(t)}}),Object(r.jsx)("label",{htmlFor:"checkbox",children:"Allow Diagonal Movements"}),Object(r.jsx)("select",{id:"path",onChange:function(t){return e.setPathAlgo(t)},children:Object.keys(S).map((function(e,t){return Object(r.jsx)("option",{value:e,children:e},t)}))}),Object(r.jsx)("button",{onClick:function(){return e.animateSearch()},children:"Start Search"}),Object(r.jsx)("select",{id:"maze",onChange:function(t){return e.setMazeAlgo(t)},children:Object.keys(x).map((function(e,t){return Object(r.jsx)("option",{value:e,children:e},t)}))}),Object(r.jsx)("button",{onClick:function(){return e.generateMaze()},children:"Generate Maze"})]}),Object(r.jsx)("div",{className:"grid",children:t.map((function(t,n){return Object(r.jsx)("div",{children:t.map((function(t,n){var a=t.row,i=t.col,o=t.nodeType;return Object(r.jsx)(p,{row:a,col:i,nodeType:o,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()}},n)}))},n)}))})]})}}]),n}(a.Component);var I=function(){return Object(r.jsxs)("div",{className:"App",children:[" ",Object(r.jsx)(D,{})]})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),i(e),o(e)}))};s.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(I,{})}),document.getElementById("root")),_()}],[[18,1,2]]]);
//# sourceMappingURL=main.7e138c4c.chunk.js.map