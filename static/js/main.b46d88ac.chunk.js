(this.webpackJsonpmazeviz=this.webpackJsonpmazeviz||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(1),i=n.n(s),r=n(8),o=n.n(r),c=(n(14),n(15),n(2)),h=n(3),l=n(4),u=n(6),d=n(5),p=(n(16),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,s=e.nodeType,i=e.onMouseDown,r=e.onMouseEnter,o=e.onMouseUp;return Object(a.jsx)("div",{draggable:"false",className:"flex-item node".concat(" ",s).trim(),onMouseDown:function(){return i(t,n)},onMouseEnter:function(){return r(t,n)},onMouseUp:function(){return o()}})}}]),n}(s.Component)),f="",v="wall",m="start",b="goal",g="visited",y="path",j=[[0,-1],[1,0],[0,1],[-1,0]],k=[[0,-1],[1,0],[0,1],[-1,0],[1,1],[1,-1],[-1,-1],[-1,1]];function O(e){var t,n,a;for(a=e.length-1;a>0;a--)t=Math.floor(Math.random()*(a+1)),n=e[a],e[a]=e[t],e[t]=n}function T(e,t,n){if(!e.length)return[];for(var a=e.length,s=e[0].length,i=n?k:j,r=[],o=0;o<i.length;o++){var c=i[o],h=t.row+c[0],l=t.col+c[1];h>=0&&l>=0&&h<a&&l<s&&e[h][l].nodeType!==v&&r.push(e[h][l])}return r}var x=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e,t){return e-t};Object(h.a)(this,e),this.heap=[],this._comparator=t}return Object(l.a)(e,[{key:"add",value:function(e){if(null===e)throw new Error("Item cannot be null!");return this.heap.push(e),this._swimUp(this.size()-1),!0}},{key:"clear",value:function(){this.heap=[]}},{key:"peek",value:function(){return 0===this.size()?null:this.heap[0]}},{key:"updateItem",value:function(e){for(var t=0;t<this.size();t++)this.heap[t]===e&&(this._sinkDown(t),this._swimUp(t))}},{key:"poll",value:function(){if(this.size()<=1)return this.heap.pop();var e=this.heap[0];return this.heap[0]=this.heap.pop(),this._sinkDown(0),e}},{key:"size",value:function(){return this.heap.length}},{key:"isEmpty",value:function(){return 0===this.size()}},{key:"_sinkDown",value:function(e){for(var t=e;t<this.size();){var n=2*t+1,a=2*t+2,s=t;if(n<this.size()&&this._comparator(this.heap[t],this.heap[n])>0&&(s=n),a<this.size()&&this._comparator(this.heap[s],this.heap[a])>0&&(s=a),s===t)return;var i=this.heap[t];this.heap[t]=this.heap[s],this.heap[s]=i,t=s}}},{key:"_swimUp",value:function(e){for(var t=e;t>0;){var n=Math.floor((t-1)/2);if(!(this._comparator(this.heap[n],this.heap[t])>0))return;var a=this.heap[n];this.heap[n]=this.heap[t],this.heap[t]=a,t=n}}}]),e}(),w=function(){function e(t){Object(h.a)(this,e),this.sets=new Array(t),this.sizes=new Array(t);for(var n=0;n<t;n++)this.sets[n]=n,this.sizes[n]=1}return Object(l.a)(e,[{key:"union",value:function(e,t){var n=this._getRoot(e),a=this._getRoot(t);n!==a&&(this.sizes[n]<this.sizes[a]?(this.sets[n]=a,this.sizes[a]+=this.sizes[n]):(this.sets[a]=n,this.sizes[n]+=this.sizes[a]))}},{key:"find",value:function(e,t){return this._getRoot(e)===this._getRoot(t)}},{key:"_getRoot",value:function(e){for(var t=e;this.sets[t]!==t;)t=this.sets[t];return t}}]),e}();function N(e,t,n,a,s){function i(e){return"".concat(e.row," ",e.col)}void 0===s&&(s=a?function(e,t){var n=Math.abs(e.row-t.row),a=Math.abs(e.col-t.col);return 1*(n+a)+(Math.SQRT2-2)*Math.min(n,a)}:function(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)});var r=new x((function(e,t){return e.f-t.f})),o=[],c={};for(t.distance=0,t.f=0,t.opened=!0,c[i(t)]=[t],r.add(t);!r.isEmpty();){var h=r.poll();if(h.closed=!0,o.push(h),h===n)return[c[i(h)],o];for(var l=T(e,h,a),u=0;u<l.length;u++){var d=l[u];if(!d.closed){var p=d.row-h.row===0||d.col-h.col===0?1:Math.SQRT2,f=h.distance+p;(!d.opened||f<d.distance)&&(d.distance=f,d.f=d.distance+s(d,n),c[i(d)]=c[i(h)].slice(),c[i(d)].push(d),d.opened?r.updateItem(d):(r.add(d),d.opened=!0))}}}return[[],o]}var M={"A*":N,BFS:function(e,t,n,a){var s=[],i=[];for(s.push([t,[t]]);s.length;){var r=s.shift(),o=Object(c.a)(r,2),h=o[0],l=o[1];if(!h.visited){if(h.visited=!0,i.push(h),h===n)return[l,i];for(var u=T(e,h,a),d=0;d<u.length;d++){var p=u[d];if(!p.visited){var f=l.slice();f.push(p),s.push([p,f])}}}}return[[],i]},DFS:function(e,t,n,a){var s=[],i=[];for(s.push([t,[t]]);s.length;){var r=s.pop(),o=Object(c.a)(r,2),h=o[0],l=o[1];if(!h.visited){if(h.visited=!0,i.push(h),h===n)return[l,i];for(var u=T(e,h,a),d=0;d<u.length;d++){var p=u[d];if(!p.visited){var f=l.slice();f.push(p),s.push([p,f])}}}}return[[],i]},Dijkstra:function(e,t,n,a){return N(e,t,n,a,(function(e,t){return 0}))}};function z(e,t,n){var a=e.length,s=e[0].length,i=j.slice();O(i),t.visited=!0;for(var r=0;r<i.length;r++){var o=i[r],c=t.row+2*o[0],h=t.col+2*o[1];if(c>=0&&h>=0&&c<a&&h<s&&e[c][h]!==b&&!e[c][h].visited){var l=Math.floor((c+t.row)/2),u=Math.floor((h+t.col)/2);n.push(t),n.push(e[l][u]),n.push(e[c][h]),z(e,e[c][h],n)}}return n}var S={"Recursive Backtracker":function(e,t){var n=[];return z(e,t,n),n},"Kruskal's":function(e,t){for(var n=e.length,a=e[0].length,s=[],i=[],r=0;r<n;r+=2)for(var o=0;o<a;o+=2)i.push([r,o,[2,0]]),i.push([r,o,[0,2]]);O(i);for(var h=new w(n*a);i.length;){var l=i.pop(),u=Object(c.a)(l,3),d=u[0],p=u[1],f=u[2],v=d+f[0],m=p+f[1],b=d*n+p,g=v*n+m;if(!(v>=n||m>=a)&&!h.find(b,g)){h.union(b,g);var y=Math.floor((v+d)/2),j=Math.floor((m+p)/2);s.push(e[d][p]),s.push(e[y][j]),s.push(e[v][m])}}return s}},I=(n(17),n(18),{r:10,c:10}),A={r:10,c:46},E={"0.5x":96,"1x":48,"1.5x":36,"2x":24,Instant:0},B=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).state={start:I,goal:A,grid:a.initGrid(29,57),pathAlgo:"",mazeAlgo:"",pathLength:0,time:0,diag:!1,dragType:f,disabled:!1,mouseIsPressed:!1,animationSpeed:E["1x"]},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.title="Path Visualizer",document.getElementById("path-button").disabled=!0,document.getElementById("maze-button").disabled=!0}},{key:"initGrid",value:function(e,t){for(var n=[],a=0;a<e;a++){for(var s=[],i=0;i<t;i++){var r=f;I.r===a&&I.c===i&&(r=m),A.r===a&&A.c===i&&(r=b);var o={row:a,col:i,prevNodeType:f,nodeType:r,visited:!1,distance:1/0,f:1/0,opened:!1,closed:!1};s.push(o)}n.push(s)}return n}},{key:"clearBoard",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++){var a=e[t][n].nodeType;a!==m&&a!==b?this.setNodeType(t,n,f):e[t][n].prevNodeType=f}this.displayStats(0,0),this.setState(e)}},{key:"clearCache",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++){e[t][n].visited=!1,e[t][n].opened=!1,e[t][n].closed=!1,e[t][n].distance=1/0,e[t][n].f=1/0;var a=e[t][n].nodeType;a!==g&&a!==y||this.setNodeType(t,n,f),e[t][n].prevNodeType=f}this.setState(e)}},{key:"setNodeType",value:function(e,t,n){var a=this.state.grid;a[e][t].nodeType!==n&&(a[e][t].prevNodeType=a[e][t].nodeType),a[e][t].nodeType=n}},{key:"revertNodeType",value:function(e,t){var n=this.state.grid;n[e][t].nodeType=n[e][t].prevNodeType}},{key:"handleMouseDown",value:function(e,t){var n=this.state,a=n.grid;if(!n.disabled){var s=a[e][t].nodeType;switch(s){case f:case g:case y:this.setNodeType(e,t,v);break;case v:this.revertNodeType(e,t)}this.setState({grid:a,dragType:s,mouseIsPressed:!0})}}},{key:"handleMouseEnter",value:function(e,t){var n=this.state,a=n.grid,s=n.start,i=n.goal,r=n.disabled,o=n.mouseIsPressed,c=n.dragType;if(!r&&o){var h=a[e][t].nodeType;switch(c){case f:case g:case y:h!==m&&h!==b&&this.setNodeType(e,t,v);break;case v:h===v&&this.revertNodeType(e,t);break;case m:h!==v&&h!==b&&(this.revertNodeType(s.r,s.c),this.setNodeType(e,t,m),this.setState({start:{r:e,c:t}}));break;case b:h!==v&&h!==m&&(this.revertNodeType(i.r,i.c),this.setNodeType(e,t,b),this.setState({goal:{r:e,c:t}}))}this.setState(a)}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"disableInput",value:function(){document.querySelectorAll("button").forEach((function(e){return e.disabled=!0})),this.setState({disabled:!0})}},{key:"enableInput",value:function(){var e=this.state,t=e.pathAlgo,n=e.mazeAlgo;"---"!==t&&(document.getElementById("path-button").disabled=!1),"---"!==n&&(document.getElementById("maze-button").disabled=!1),document.getElementById("clear-button").disabled=!1,this.setState({disabled:!1})}},{key:"setDiag",value:function(e){this.setState({diag:e.target.checked})}},{key:"setPathAlgo",value:function(e){var t=this.state.disabled,n=e.target.value;n in M&&(t||"---"===n||(document.getElementById("path-button").disabled=!1),this.setState({pathAlgo:n}))}},{key:"getPathLength",value:function(e){for(var t=0,n=0;n<e.length-1;n++){var a=e[n],s=e[n+1],i=Math.abs(a.row-s.row),r=Math.abs(a.col-s.col);t+=0===i||0===r?1:Math.SQRT2}return t}},{key:"displayStats",value:function(e,t){this.setState({pathLength:e,time:t}),document.getElementById("length").className=0===e?"hide":"show",document.getElementById("time").className=0===t?"hide":"show"}},{key:"animateSearch",value:function(){var e=this,t=this.state,n=t.grid,a=t.start,s=t.goal,i=t.pathAlgo,r=t.diag,o=t.animationSpeed;this.clearCache();var h=performance.now(),l=M[i](n,n[a.r][a.c],n[s.r][s.c],r),u=Object(c.a)(l,2),d=u[0],p=u[1],f=performance.now()-h,v=this.getPathLength(d);this.displayStats(v,f),this.disableInput();for(var j=p.concat(d),k=function(t){var a=j[t];if(a.nodeType===m||a.nodeType===b)return a.nodeType===m&&j.length===p.length?(a.prevNodeType=g,"continue"):(a.prevNodeType=y,"continue");var s=t<p.length?g:y;0!==o?setTimeout((function(){a.nodeType=s,e.setState({grid:n})}),o*t):a.nodeType=s},O=0;O<j.length;O++)k(O);setTimeout((function(){e.enableInput()}),o*j.length)}},{key:"setMazeAlgo",value:function(e){var t=this.state.disabled,n=e.target.value;n in S&&(t||"---"===n||(document.getElementById("maze-button").disabled=!1),this.setState({mazeAlgo:n}))}},{key:"generateMaze",value:function(){var e=this,t=this.state,n=t.grid,a=t.start,s=t.animationSpeed,i=t.mazeAlgo,r=performance.now(),o=S[i](n,n[a.r][a.c]),c=performance.now()-r;this.displayStats(0,c),this.clearCache(),this.disableInput();for(var h=0;h<n.length;h++)for(var l=0;l<n[0].length;l++){var u=n[h][l].nodeType;u!==m&&u!==b&&this.setNodeType(h,l,v)}this.setState({grid:n});for(var d=function(t){var a=o[t];if(a.nodeType===m||a.nodeType===b)return"continue";0!==s?setTimeout((function(){a.nodeType=f,e.setState({grid:n})}),s*t):a.nodeType=f},p=0;p<o.length;p++)d(p);setTimeout((function(){e.enableInput()}),s*o.length),this.setState({grid:n})}},{key:"setAnimationSpeed",value:function(e){var t=e.target.value;t in E&&(console.log(t),this.setState({animationSpeed:E[t]}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,s=t.pathLength,i=t.time;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"panel",children:[Object(a.jsxs)("div",{className:"title",children:[Object(a.jsx)("p",{className:"h1",children:"MazeViz"}),Object(a.jsxs)("footer",{children:["Project Hosted on",Object(a.jsx)("a",{href:"https://github.com/BenjaminTu/mazeviz",children:" Github"})]})]}),Object(a.jsxs)("div",{className:"left",children:[Object(a.jsx)("small",{className:"path-title",children:"Pathfinding Algorithm:"}),Object(a.jsxs)("select",{id:"path",className:"d-block m-2 top",onChange:function(t){return e.setPathAlgo(t)},children:[Object(a.jsx)("option",{selected:!0,disabled:!0,children:"---"}),Object.keys(M).map((function(e,t){return Object(a.jsx)("option",{value:e,children:e},t)}))]}),Object(a.jsxs)("label",{className:"bot",children:[Object(a.jsx)("input",{type:"checkbox",className:"checkbox mr-1",onChange:function(t){return e.setDiag(t)}}),"Allow Diagonal Movement"]}),Object(a.jsx)("button",{id:"path-button",className:"btn btn-sm btn-success rt",onClick:function(){return e.animateSearch()},children:"Search Path"})]}),Object(a.jsx)("div",{className:"right",children:Object(a.jsx)("button",{id:"clear-button",className:"btn btn btn-primary d-block",onClick:function(){return e.clearBoard()},children:"Clear Board"})}),Object(a.jsxs)("div",{className:"middle",children:[Object(a.jsx)("small",{className:"path-title",children:"Maze Generation Algorithm:"}),Object(a.jsxs)("select",{id:"maze",className:"lt",onChange:function(t){return e.setMazeAlgo(t)},children:[Object(a.jsx)("option",{selected:!0,disabled:!0,children:"---"}),Object.keys(S).map((function(e,t){return Object(a.jsx)("option",{value:e,children:e},t)}))]}),Object(a.jsx)("button",{id:"maze-button",className:"btn btn-sm btn-success ml-2 rtrt",onClick:function(){return e.generateMaze()},children:"Generate Maze"})]}),Object(a.jsxs)("div",{className:"knob",children:[Object(a.jsx)("small",{children:"Speed:"}),Object(a.jsx)("select",{className:"lt",onChange:function(t){return e.setAnimationSpeed(t)},children:Object.keys(E).map((function(e,t){return Object(a.jsx)("option",{value:e,selected:"1x"===e,children:e},t)}))})]}),Object(a.jsxs)("div",{className:"stats",children:[Object(a.jsx)("small",{className:"show",children:"Algorithm Stats:"}),Object(a.jsxs)("div",{className:"stats-panel",children:[Object(a.jsxs)("small",{id:"length",className:"h6 hide",children:["path length: ",s.toFixed(2)," unit"]}),Object(a.jsx)("br",{}),Object(a.jsxs)("small",{id:"time",className:"h6 hide",children:["time taken: ",i.toFixed(2)," ms"]})]})]})]}),Object(a.jsx)("div",{className:"flex-container grid",children:n.map((function(t,n){return Object(a.jsx)("div",{className:"flex-nowrap d-flex flex-row justify-content-center overflow-hidden",children:t.map((function(t,n){var s=t.row,i=t.col,r=t.nodeType;return Object(a.jsx)(p,{row:s,col:i,nodeType:r,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()}},n)}))},n)}))})]})}}]),n}(s.Component);var C=function(){return Object(a.jsxs)("div",{className:"App",children:[" ",Object(a.jsx)(B,{})]})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),s(e),i(e),r(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(C,{})}),document.getElementById("root")),D()}},[[19,1,2]]]);
//# sourceMappingURL=main.b46d88ac.chunk.js.map