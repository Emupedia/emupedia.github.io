/*
Orteil's crappy dungeon generation library, 2013
Unfinished and buggy, use at your own risk (please credit)
http://orteil.dashnet.org

Rough process (might or might not be what actually happens) :
1 make a room in the middle
2 pick one of its walls (not corners)
3 select a free tile on the other side of that wall
4 iteratively expand the selection in one (corridors) or two (rooms) directions, stopping when we meet a wall or when we're above the size threshold
5 compute that selection into a room
6 add decorations to the room (pillars, water) but only on the center tiles, as to leave free passages (sprinkle destructible decorations anywhere)
7 take a random floor tile in the room and repeat step 4, but don't stop at the walls of this room (this creates branching) - repeat about 5 times for interesting shapes
8 add those branches to the room
9 carve the room into the map, and set the initially selected wall as a door - set the new room's parent to the previous room, and add it to its parent's children
10 repeat step 2 with any free wall on the map until the amount of tiles dug is above the desired fill ratio

Note : I should probably switch the rendering to canvas to allow stuff like occlusion shadows and lights
*/

if (1==1 || undefined==Math.seedrandom)
{
	//seeded random function, courtesy of http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html
	(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);
}

if (1==1 || undefined==choose) {function choose(arr) {if (arr.length==0) return 0; else return arr[Math.floor(Math.random()*arr.length)];}}


var DungeonGen=function()
{
	var TILE_EMPTY=0;//solid
	var TILE_LIMIT=-100;//can't build anything here; edges of map
	var TILE_FLOOR_EDGE=100;
	var TILE_FLOOR_CENTER=110;
	var TILE_DOOR=200;
	var TILE_PILLAR=300;//not just pillars, could be any type of repetitive decoration
	var TILE_WATER=400;
	var TILE_WALL=500;
	var TILE_WALL_CORNER=510;
	var TILE_ENTRANCE=250;
	var TILE_EXIT=260;
	
	var colors=[];
	colors[TILE_EMPTY]='000';
	colors[TILE_LIMIT]='900';
	colors[TILE_FLOOR_EDGE]='ffc';
	colors[TILE_FLOOR_CENTER]='ff9';
	colors[TILE_DOOR]='f9f';
	colors[TILE_PILLAR]='990';
	colors[TILE_WATER]='99f';
	colors[TILE_WALL]='960';
	colors[TILE_WALL_CORNER]='630';
	colors[TILE_ENTRANCE]='f9f';
	colors[TILE_EXIT]='f9f';
	
	var rand=function(a,b){return Math.floor(Math.random()*(b-a+1)+a);}//return random value between a and b
	
	var Patterns=[];
	this.Pattern=function(name,func)
	{
		this.name=name;
		this.func=func;
		Patterns.push(this);
	}
	new this.Pattern('Pillars',function(x,y,room)
	{
		if ((x+room.x)%2==0 && (y+room.y)%2==0 && Math.random()<0.8) return TILE_PILLAR;
		return 0;
	});
	new this.Pattern('Large pillars',function(x,y,room)
	{
		if ((x+room.x)%3<2 && (y+room.y)%3<2 && Math.random()<0.8) return TILE_PILLAR;
		return 0;
	});
	new this.Pattern('Sparse pillars',function(x,y,room)
	{
		if ((x+room.x)%3==0 && (y+room.y)%3==0 && Math.random()<0.8) return TILE_PILLAR;
		return 0;
	});
	new this.Pattern('Lines',function(x,y,room)
	{
		if (room.x%2==0) if ((x+room.x)%2==0 && Math.random()<0.98) return TILE_PILLAR;
		if (room.x%2==1) if ((y+room.y)%2==0 && Math.random()<0.98) return TILE_PILLAR;
		return 0;
	});
	
	
	var getRandomPattern=function()
	{return choose(Patterns);}
	
	var defaultGenerator=function(me)
	{
		me.roomSize=10;
		me.corridorSize=5;
		me.fillRatio=1/3;
		me.corridorRatio=0.2;
		me.pillarRatio=0.2;
		me.waterRatio=0;
		me.branching=4;
		me.sizeVariance=0.2;
	
		me.fillRatio=0.1+Math.random()*0.4;
		me.roomSize=Math.ceil(rand(5,15)*me.fillRatio*2);
		me.corridorSize=Math.ceil(rand(1,7)*me.fillRatio*2);
		me.corridorRatio=Math.random()*0.8+0.1;
		me.pillarRatio=Math.random()*0.5+0.5;
		me.waterRatio=Math.pow(Math.random(),2);
		me.branching=Math.floor(Math.random()*6);
		me.sizeVariance=Math.random();
	}
	
	
	this.Map=function(w,h,seed,params)
	{
		//create a new map
		//leave the seed out for a random seed
		//params is an object that contains custom parameters as defined in defaultGenerator
		//example : MyMap=new DungeonGen.Map(30,30,MySeed,{waterRatio:0.8}); (80 percent of the rooms will contain water)
		if (undefined!=seed) this.seed=seed; else {Math.seedrandom();this.seed=Math.random();}
		Math.seedrandom(this.seed);
		this.seedState=Math.random;
		this.w=w||20;
		this.h=h||20;
		
		this.roomsAreHidden=0;
		
		this.rooms=[];
		this.freeWalls=[];//all walls that would be a good spot for a door
		this.freeTiles=[];//all passable floor tiles
		this.doors=[];
		this.tiles=this.w*this.h;
		this.tilesDug=0;
		this.digs=0;//amount of digging steps
		this.stuck=0;//how many times we ran into a problem; stop digging if we get too many of these
		
		this.data=[];//fill the map with 0
		for (var x=0;x<this.w;x++)
		{
			this.data[x]=[];
			for (var y=0;y<this.h;y++)
			{
				this.data[x][y]=[TILE_EMPTY,-1,0];//data is stored as [tile system type,room id,tile displayed type] (-1 is no room)
				if (x==0 || y==0 || x==this.w-1 || y==this.h-1) this.data[x][y]=[TILE_LIMIT,-1,0];
			}
		}
		
		defaultGenerator(this);
		if (params)
		{
			for (var i in params)
			{
				this[i]=params[i];
			}
		}
		Math.seedrandom();
		
	}
	
	this.Map.prototype.getType=function(x,y){return this.data[x][y][0];}
	this.Map.prototype.getRoom=function(x,y){if (this.data[x][y][1]!=-1) return this.rooms[this.data[x][y][1]]; else return -1;}
	this.Map.prototype.getTile=function(x,y){return this.rooms[this.data[x][y][2]];}
	
	this.Map.prototype.isWall=function(x,y)
	{
		var n=0;
		for (var i in this.freeWalls){if (this.freeWalls[i][0]==x && this.freeWalls[i][1]==y) return n; else n++;}
		return -1;
	}
	this.Map.prototype.isFloor=function(x,y)
	{
		var n=0;
		for (var i in this.freeTiles){if (this.freeTiles[i][0]==x && this.freeTiles[i][1]==y) return n; else n++;}
		return -1;
	}
	this.Map.prototype.removeFreeTile=function(x,y)
	{
		this.freeTiles.splice(this.isFloor(x,y),1);
	}
	
	this.Map.prototype.fill=function(what)
	{
		//fill with something (either a set value, or a function that takes the map, a position X and a position Y as arguments)
		//NOTE : this also resets the rooms!
		//example : MyMap.fill(function(m,x,y){return Math.floor((Math.random());});
		//...will fill the map with 0s and 1s
		var func=0;
		if (typeof(what)=='function') func=1;
		for (var x=0;x<this.w;x++){for (var y=0;y<this.h;y++){
			if (func) this.data[x][y]=[what(this,x,y),-1,0]; else this.data[x][y]=[what,-1,0];
		}}
		this.rooms=[];
	}
	
	this.Map.prototype.fillZone=function(X,Y,W,H,what)
	{
		//just plain fill a rectangle
		for (var x=X;x<X+W;x++){for (var y=Y;y<Y+H;y++){
			this.data[x][y][0]=what;
		}}
	}
	
	this.Map.prototype.getRoomTile=function(room,x,y)
	{
		var n=0;
		for (var i in room.tiles) {if (room.tiles[i].x==x && room.tiles[i].y==y) return n; else n++;}
		return -1;
	}
	
	this.Map.prototype.getFloorTileInRoom=function(room)
	{
		var tiles=[];
		for (var i in room.tiles) {if (room.tiles[i].type==TILE_FLOOR_EDGE || room.tiles[i].type==TILE_FLOOR_CENTER) tiles.push(room.tiles[i]);}
		return choose(tiles);
	}
	
	this.Map.prototype.canPlaceRoom=function(rx,ry,rw,rh)
	{
		if (rx<2 || ry<2 || rx+rw>=this.w-1 || ry+rh>=this.h-1) return false;
		for (var x=rx;x<rx+rw;x++)
		{
			for (var y=ry;y<ry+rh;y++)
			{
				var tile=this.getType(x,y);
				var room=this.getRoom(x,y);
				if (tile==TILE_LIMIT) return false;
				if (room!=-1) return false;
			}
		}
		return true;
	}
	
	this.Map.prototype.setRoomTile=function(room,x,y,tile)
	{
		//var mapTile=this.getType(x,y);
		var oldTile=this.getRoomTile(room,x,y);
		var oldTileType=oldTile!=-1?room.tiles[oldTile].type:-1;
		if (oldTile!=-1 && (
			//(tile!=TILE_FLOOR_EDGE && tile!=TILE_FLOOR_CENTER) ||// && (oldTileType!=TILE_FLOOR_EDGE && oldTileType!=TILE_FLOOR_CENTER)) ||
			//(tile!=TILE_FLOOR_EDGE && tile!=TILE_FLOOR_CENTER && (oldTileType!=TILE_FLOOR_EDGE && oldTileType!=TILE_FLOOR_CENTER)) ||
			(tile==TILE_WALL || tile==TILE_WALL_CORNER) ||//don't place a wall over an existing room
			(tile==TILE_FLOOR_EDGE && oldTileType==TILE_FLOOR_CENTER)//don't place an edge floor over a center floor
			)) {return false;}
		else
		{
			if (oldTile!=-1) room.tiles.splice(oldTile,1);
			room.tiles.push({x:x,y:y,type:tile,score:0});
			if ((tile==TILE_FLOOR_EDGE || tile==TILE_FLOOR_CENTER) && (oldTileType!=TILE_FLOOR_EDGE && oldTileType!=TILE_FLOOR_CENTER)) room.freeTiles++;
			else if (tile!=TILE_FLOOR_EDGE && tile!=TILE_FLOOR_CENTER && (oldTileType==TILE_FLOOR_EDGE || oldTileType==TILE_FLOOR_CENTER)) room.freeTiles--;
			return true;
		}
	}
	
	this.Map.prototype.expandRoom=function(room,rx,ry,rw,rh)
	{
		var x=0;var y=0;
		//floor
		for (var x=rx;x<rx+rw;x++){for (var y=ry;y<ry+rh;y++){
			this.setRoomTile(room,x,y,TILE_FLOOR_EDGE);
		}}
		for (var x=rx+1;x<rx+rw-1;x++){for (var y=ry+1;y<ry+rh-1;y++){
			this.setRoomTile(room,x,y,TILE_FLOOR_CENTER);
		}}
		//walls
		y=ry-1;
		for (var x=rx;x<rx+rw;x++){
			this.setRoomTile(room,x,y,TILE_WALL);
		}
		y=ry+rh;
		for (var x=rx;x<rx+rw;x++){
			this.setRoomTile(room,x,y,TILE_WALL);
		}
		x=rx-1;
		for (var y=ry;y<ry+rh;y++){
			this.setRoomTile(room,x,y,TILE_WALL);
		}
		x=rx+rw;
		for (var y=ry;y<ry+rh;y++){
			this.setRoomTile(room,x,y,TILE_WALL);
		}
		//corners
		x=rx-1;y=ry-1;
		this.setRoomTile(room,x,y,TILE_WALL_CORNER);
		x=rx+rw;y=ry-1;
		this.setRoomTile(room,x,y,TILE_WALL_CORNER);
		x=rx-1;y=ry+rh;
		this.setRoomTile(room,x,y,TILE_WALL_CORNER);
		x=rx+rw;y=ry+rh;
		this.setRoomTile(room,x,y,TILE_WALL_CORNER);
		
		//decoration
		var water=Math.random()<this.waterRatio?1:0;
		var pattern=Math.random()<this.pillarRatio?getRandomPattern():0;
		for (var x=rx;x<rx+rw;x++){for (var y=ry;y<ry+rh;y++){
			if (room.tiles[this.getRoomTile(room,x,y)].type==TILE_FLOOR_CENTER)
			{
				var tile=0;
				if (water!=0) tile=TILE_WATER;
				if (pattern!=0)
				{
					tile=pattern.func(x,y,room)||tile;
				}
				if (tile!=0) this.setRoomTile(room,x,y,tile);
			}
		}}
	}
	
	this.Map.prototype.newRoom=function(x,y,w,h,parent)
	{
		//create a new abstract room, ready to be carved
		var room={};
		room.id=this.rooms.length;
		room.w=w;//||rand(2,this.roomSize);
		room.h=h;//||rand(2,this.roomSize);
		room.x=x||rand(1,this.w-room.w-1);
		room.y=y||rand(1,this.h-room.h-1);
		room.tiles=[];
		room.freeTiles=0;
		room.parent=parent?parent:-1;
		room.children=[];
		room.gen=0;
		room.door=0;
		room.corridor=Math.random()<this.corridorRatio?1:0;
		room.hidden=this.roomsAreHidden;//if 1, don't draw
		//if (room.parent!=-1) room.corridor=!room.parent.corridor;//alternate rooms and corridors
		
		return room;
	}
	this.Map.prototype.planRoom=function(room)
	{
		var branches=this.branching+1;
		var forcedExpansions=[];
		var w=room.w;
		var h=room.h;
		while (w>0 && h>0)
		{
			if (w>0) {forcedExpansions.push(1,3);w--;}
			if (h>0) {forcedExpansions.push(2,4);h--;}
		}
		
		for (var i=0;i<branches;i++)
		{
			var steps=0;
			var expansions=[];
			if (!room.corridor)
			{
				expansions=[1,2,3,4];
				steps=this.roomSize;
			}
			else
			{
				expansions=choose([[1,3],[2,4]]);
				steps=this.corridorSize;
			}
			steps=Math.max(room.w+room.h,Math.ceil(steps*(1-Math.random()*this.sizeVariance)));
			if (room.tiles.length==0) {var rx=room.x;var ry=room.y;var rw=1;var rh=1;}
			else {var randomTile=this.getFloorTileInRoom(room);var rx=randomTile.x;var ry=randomTile.y;var rw=1;var rh=1;}
			for (var ii=0;ii<steps;ii++)
			{
				if (expansions.length==0) break;
				var xd=0;var yd=0;var wd=0;var hd=0;
				var side=choose(expansions);
				if (forcedExpansions.length>0) side=forcedExpansions[0];
				if (side==1) {xd=-1;wd=1;}
				else if (side==2) {yd=-1;hd=1;}
				else if (side==3) {wd=1;}
				else if (side==4) {hd=1;}
				if (this.canPlaceRoom(rx+xd,ry+yd,rw+wd,rh+hd)) {rx+=xd;ry+=yd;rw+=wd;rh+=hd;} else expansions.splice(expansions.indexOf(side),1);
				if (forcedExpansions.length>0) forcedExpansions.splice(0,1);
			}
			if (rw>1 || rh>1)
			{
				this.expandRoom(room,rx,ry,rw,rh);
			}
		}
	}
	
	
	this.Map.prototype.carve=function(room)
	{
		//carve a room into the map
		for (var i in room.tiles)
		{
			var thisTile=room.tiles[i];
			var x=thisTile.x;var y=thisTile.y;
			var myType=this.data[x][y][0];
			var type=thisTile.type;
			
			if ((type==TILE_WALL || type==TILE_WALL_CORNER) && this.isWall(x,y)!=-1) {this.freeWalls.splice(this.isWall(x,y),1);}
			
			if (this.data[x][y][1]!=-1 && (type==TILE_WALL || type==TILE_WALL_CORNER)) {}
			else
			{
				if (this.data[x][y][1]==-1) this.tilesDug++;
				this.data[x][y]=[thisTile.type,room.id,0];
				if (x>1 && y>1 && x<this.w-2 && y<this.h-2 && type==TILE_WALL) this.freeWalls.push([x,y]);
				if (type==TILE_FLOOR_EDGE || type==TILE_FLOOR_CENTER) this.freeTiles.push([x,y]);
			}
			var pos=[x,y];
		}
		this.rooms[room.id]=room;
	}
	
	this.Map.prototype.newRandomRoom=function(params)
	{
		var success=1;
		params=params||{};//params is an object such as {corridor:1}
		var door=choose(this.freeWalls);//select a free wall to use as a door
		if (!door) {success=0;}
		else
		{
			//this.data[door[0]][door[1]][0]=TILE_LIMIT;//not door
			var parentRoom=this.getRoom(door[0],door[1]);
			var sides=[];//select a free side of that door
			if (this.getType(door[0]-1,door[1])==TILE_EMPTY) sides.push([-1,0]);
			if (this.getType(door[0]+1,door[1])==TILE_EMPTY) sides.push([1,0]);
			if (this.getType(door[0],door[1]-1)==TILE_EMPTY) sides.push([0,-1]);
			if (this.getType(door[0],door[1]+1)==TILE_EMPTY) sides.push([0,1]);
			var side=choose(sides);
			if (!side) {success=0;this.freeWalls.splice(this.isWall(door[0],door[1]),1);}
			else
			{
				var room=this.newRoom(door[0]+side[0],door[1]+side[1],0,0,parentRoom);//try a new room from this spot
				for (var i in params)
				{
					room[i]=params[i];
				}
				this.planRoom(room);
				if (room.tiles.length>0 && room.freeTiles>0)//we got a decent room
				{
					this.carve(room);
					this.data[door[0]][door[1]][0]=TILE_DOOR;//place door
					room.door=[door[0],door[1]];
					this.data[door[0]][door[1]][1]=room.id;//set ID
					this.freeWalls.splice(this.isWall(door[0],door[1]),1);//the door isn't a wall anymore
					this.doors.push([door[0],door[1],room]);
					//remove free tiles on either side of the door
					if (this.isFloor(door[0]+side[0],door[1]+side[1])!=-1) this.removeFreeTile(door[0]+side[0],door[1]+side[1]);
					if (this.isFloor(door[0]-side[0],door[1]-side[1])!=-1) this.removeFreeTile(door[0]-side[0],door[1]-side[1]);
					room.parent=parentRoom;
					parentRoom.children.push(room);
					room.gen=parentRoom.gen+1;
				}
				else//not a good spot; remove this tile from the list of walls
				{
					this.freeWalls.splice(this.isWall(door[0],door[1]),1);
					success=0;
				}
			}
		}
		if (success) return room;
		else return 0;
	}
	
	this.Map.prototype.getRandomSpotInRoom=function(room)
	{
		var listOfTiles=[];
		for (var i in room.tiles)
		{
			if ((room.tiles[i].type==TILE_FLOOR_EDGE || room.tiles[i].type==TILE_FLOOR_CENTER) && this.isFloor(room.tiles[i].x,room.tiles[i].y)!=-1)
			{
				listOfTiles.push(room.tiles[i]);
			}
		}
		if (listOfTiles.length==0) return -1;
		return choose(listOfTiles);
	}
	this.Map.prototype.getBestSpotInRoom=function(room)
	{
		var highest=-1;
		var listOfHighest=[];
		for (var i in room.tiles)
		{
			if ((room.tiles[i].type==TILE_FLOOR_EDGE || room.tiles[i].type==TILE_FLOOR_CENTER) && this.isFloor(room.tiles[i].x,room.tiles[i].y)!=-1)
			{
				if (room.tiles[i].score>highest)
				{
					listOfHighest=[];
					highest=room.tiles[i].score;
					listOfHighest.push(room.tiles[i]);
				}
				else if (room.tiles[i].score==highest)
				{
					listOfHighest.push(room.tiles[i]);
				}
			}
		}
		if (listOfHighest.length==0) return -1;
		return choose(listOfHighest);
	}
	this.Map.prototype.getEarliestRoom=function()
	{
		return this.rooms[0];
	}
	this.Map.prototype.getDeepestRoom=function()
	{
		var deepest=0;
		var deepestRoom=this.rooms[0];
		for (var i in this.rooms)
		{
			if ((this.rooms[i].gen+Math.sqrt(this.rooms[i].freeTiles)*0.05)>=deepest && this.rooms[i].corridor==0 && this.rooms[i].freeTiles>4) {deepest=(this.rooms[i].gen+Math.sqrt(this.rooms[i].freeTiles)*0.05);deepestRoom=this.rooms[i];}
		}
		return deepestRoom;
	}
	
	this.Map.prototype.dig=function()
	{
		//one step in which we try to carve new stuff
		//returns 0 when we couldn't dig this step, 1 when we could, and 2 when the digging is complete
		Math.random=this.seedState;
		
		var badDig=0;
		
		if (this.digs==0)//first dig : build a starting room in the middle of the map
		{
			var w=rand(3,7);
			var h=rand(3,7);
			var room=this.newRoom(Math.floor(this.w/2-w/2),Math.floor(this.h/2-h/2),w,h);
			room.corridor=0;
			this.planRoom(room);
			this.carve(room);
		}
		else
		{
			if (this.newRandomRoom()==0) badDig++;
		}
		if (badDig>0) this.stuck++;
		
		this.digs++;
		
		var finished=0;
		if (this.tilesDug>=this.tiles*this.fillRatio) finished=1;
		if (this.stuck>100) finished=1;
		
		if (finished==1)//last touch : try to add a whole room at the end
		{
			for (var i=0;i<10;i++)
			{
				var newRoom=this.newRandomRoom({corridor:0,w:rand(3,7),h:rand(3,7)});
				if (newRoom!=0 && newRoom.freeTiles>15) break;
			}
		}
		
		Math.seedrandom();
		if (finished==1) return 1; else if (badDig>0) return -1; else return 0;
	}
	
	this.Map.prototype.finish=function()
	{
		//touch up the map : add pillars in corners etc
		/*
		//set paths
		for (var i in this.rooms)
		{
			var me=this.rooms[i];
			if (me.door!=0)
			{
				var doors=[];
				doors.push(me.door);
				for (var ii in me.children)
				{
					if (me.children[ii].door!=0) doors.push(me.children[ii].door);
				}
				for (var ii in doors)
				{
					this.data[doors[ii][0]][doors[ii][1]][0]=TILE_LIMIT;
					//ideally we should run agents that step from each door to the next
				}
			}
		}
		*/
		for (var i in this.rooms)
		{
			var pillars=Math.random()<this.pillarRatio;
			for (var ii in this.rooms[i].tiles)
			{
				var x=this.rooms[i].tiles[ii].x;
				var y=this.rooms[i].tiles[ii].y;
				var me=this.data[x][y][0];
				var x1=this.data[x-1][y][0];
				var x2=this.data[x+1][y][0];
				var y1=this.data[x][y-1][0];
				var y2=this.data[x][y+1][0];
				var xy1=this.data[x-1][y-1][0];
				var xy2=this.data[x+1][y-1][0];
				var xy3=this.data[x-1][y+1][0];
				var xy4=this.data[x+1][y+1][0];
				
				var walls=0;
				if ((x1==TILE_WALL||x1==TILE_WALL_CORNER)) walls++;
				if ((y1==TILE_WALL||y1==TILE_WALL_CORNER)) walls++;
				if ((x2==TILE_WALL||x2==TILE_WALL_CORNER)) walls++;
				if ((y2==TILE_WALL||y2==TILE_WALL_CORNER)) walls++;
				if ((xy1==TILE_WALL||xy1==TILE_WALL_CORNER)) walls++;
				if ((xy2==TILE_WALL||xy2==TILE_WALL_CORNER)) walls++;
				if ((xy3==TILE_WALL||xy3==TILE_WALL_CORNER)) walls++;
				if ((xy4==TILE_WALL||xy4==TILE_WALL_CORNER)) walls++;
				
				var floors=0;
				if ((x1==TILE_FLOOR_CENTER||x1==TILE_FLOOR_EDGE)) floors++;
				if ((y1==TILE_FLOOR_CENTER||y1==TILE_FLOOR_EDGE)) floors++;
				if ((x2==TILE_FLOOR_CENTER||x2==TILE_FLOOR_EDGE)) floors++;
				if ((y2==TILE_FLOOR_CENTER||y2==TILE_FLOOR_EDGE)) floors++;
				if ((xy1==TILE_FLOOR_CENTER||xy1==TILE_FLOOR_EDGE)) floors++;
				if ((xy2==TILE_FLOOR_CENTER||xy2==TILE_FLOOR_EDGE)) floors++;
				if ((xy3==TILE_FLOOR_CENTER||xy3==TILE_FLOOR_EDGE)) floors++;
				if ((xy4==TILE_FLOOR_CENTER||xy4==TILE_FLOOR_EDGE)) floors++;
				
				var complete=0;
				if (walls+floors==8) complete=1;
				
				var angle=0;
				if (complete)
				{
					var top=0;
					var left=0;
					var right=0;
					var bottom=0;
					if ((xy1==TILE_WALL||xy1==TILE_WALL_CORNER) && (y1==TILE_WALL||y1==TILE_WALL_CORNER) && (xy2==TILE_WALL||xy2==TILE_WALL_CORNER)) top=1;
					else if ((xy1==TILE_FLOOR_CENTER||xy1==TILE_FLOOR_EDGE) && (y1==TILE_FLOOR_CENTER||y1==TILE_FLOOR_EDGE) && (xy2==TILE_FLOOR_CENTER||xy2==TILE_FLOOR_EDGE)) top=-1;
					if ((xy2==TILE_WALL||xy2==TILE_WALL_CORNER) && (x2==TILE_WALL||x2==TILE_WALL_CORNER) && (xy4==TILE_WALL||xy4==TILE_WALL_CORNER)) right=1;
					else if ((xy2==TILE_FLOOR_CENTER||xy2==TILE_FLOOR_EDGE) && (x2==TILE_FLOOR_CENTER||x2==TILE_FLOOR_EDGE) && (xy4==TILE_FLOOR_CENTER||xy4==TILE_FLOOR_EDGE)) right=-1;
					if ((xy1==TILE_WALL||xy1==TILE_WALL_CORNER) && (x1==TILE_WALL||x1==TILE_WALL_CORNER) && (xy3==TILE_WALL||xy3==TILE_WALL_CORNER)) left=1;
					else if ((xy1==TILE_FLOOR_CENTER||xy1==TILE_FLOOR_EDGE) && (x1==TILE_FLOOR_CENTER||x1==TILE_FLOOR_EDGE) && (xy3==TILE_FLOOR_CENTER||xy3==TILE_FLOOR_EDGE)) left=-1;
					if ((xy3==TILE_WALL||xy3==TILE_WALL_CORNER) && (y2==TILE_WALL||y2==TILE_WALL_CORNER) && (xy4==TILE_WALL||xy4==TILE_WALL_CORNER)) bottom=1;
					else if ((xy3==TILE_FLOOR_CENTER||xy3==TILE_FLOOR_EDGE) && (y2==TILE_FLOOR_CENTER||y2==TILE_FLOOR_EDGE) && (xy4==TILE_FLOOR_CENTER||xy4==TILE_FLOOR_EDGE)) bottom=-1;
					if ((top==1 && bottom==-1) || (top==-1 && bottom==1) || (left==1 && right==-1) || (left==-1 && right==1)) angle=1;
				}
				
				if (pillars && Math.random()<0.8 && this.rooms[i].freeTiles>4)
				{
					if ((angle==1 || (complete && walls==7)) && me==TILE_FLOOR_EDGE && x1!=TILE_DOOR && x2!=TILE_DOOR && y1!=TILE_DOOR && y2!=TILE_DOOR)
					{
						this.data[x][y][0]=TILE_PILLAR;
						me=TILE_PILLAR;
						this.removeFreeTile(x,y);
						this.rooms[i].freeTiles--;
					}
				}
				
				//calculate score (for placing items and exits)
				if (top==1 || bottom==1 || left==1 || right==1)
				{
					this.rooms[i].tiles[ii].score+=2;
				}
				if (walls>5 || floors>5)
				{
					this.rooms[i].tiles[ii].score+=1;
				}
				if (walls==7 || floors==8)
				{
					this.rooms[i].tiles[ii].score+=5;
				}
				if ((me!=TILE_FLOOR_CENTER && me!=TILE_FLOOR_EDGE) || x1==TILE_DOOR || x2==TILE_DOOR || y1==TILE_DOOR || y2==TILE_DOOR) this.rooms[i].tiles[ii].score=-1;
				
			}
		}
		
		
		
		//carve entrance and exit
		var entrance=this.getBestSpotInRoom(this.getEarliestRoom());
		this.data[entrance.x][entrance.y][0]=TILE_ENTRANCE;
		this.entrance=[entrance.x,entrance.y];
		entrance.score=0;
		this.removeFreeTile(entrance.x,entrance.y);
		var exit=this.getBestSpotInRoom(this.getDeepestRoom());
		this.data[exit.x][exit.y][0]=TILE_EXIT;
		this.exit=[exit.x,exit.y];
		this.removeFreeTile(exit.x,exit.y);
		exit.score=0;
		
		/*
		for (var i in this.doors)//remove door tiles (to add later; replace the tiles by entities that delete themselves when opened)
		{
			this.data[this.doors[i][0]][this.doors[i][1]][0]=TILE_FLOOR_EDGE;
		}
		*/
	}
	
	this.Map.prototype.isObstacle=function(x,y)
	{
		var free=[TILE_FLOOR_EDGE,TILE_FLOOR_CENTER,TILE_DOOR,TILE_ENTRANCE,TILE_EXIT];
		for (var i in free)
		{
			if (this.data[x][y][0]==free[i]) return 0;
		}
		return 1;
	}
	
	var joinTile=function(map,x,y,joinWith)
	{
		//for the tile at x,y, return 2 if it joins with its horizontal neighbors, 3 if it joins with its vertical neighbors, 1 if it joins with either both or neither.
		//joinWith contains the tile types that count as joinable, in addition to this tile. (don't add the tested tile to joinWith!)
		var p=1;
		var me=map.data[x][y][0];
		var x1=map.data[x-1][y][0];
		var x2=map.data[x+1][y][0];
		var y1=map.data[x][y-1][0];
		var y2=map.data[x][y+1][0];
		joinWith.push(me);
		var joinsX=0;
		for (var i in joinWith)
		{
			if (x1==joinWith[i]) joinsX++;
			if (x2==joinWith[i]) joinsX++;
		}
		var joinsY=0;
		for (var i in joinWith)
		{
			if (y1==joinWith[i]) joinsY++;
			if (y2==joinWith[i]) joinsY++;
		}
		if (joinsX==2 && joinsY==2) p=1;
		else if (joinsX==2) p=2;
		else if (joinsY==2) p=3;
		return p;
	}
	this.Map.prototype.getPic=function(x,y)
	{
		//return a position [x,y] in the tiles (as 0, 1, 2...) for the tile on the map at position x,y
		if (Tiles[this.data[x][y][2]])
		{
			if (Tiles[this.data[x][y][2]].joinType=='join')
			{
				var thisPic=Tiles[this.data[x][y][2]].pic;
				thisPic=[thisPic[0],thisPic[1]];//why is this even necessary?
				var joinWith=[];
				if (this.data[x][y][0]==TILE_WALL) joinWith.push(TILE_WALL_CORNER);
				else if (this.data[x][y][0]==TILE_DOOR) joinWith.push(TILE_WALL,TILE_WALL_CORNER);
				thisPic[0]+=joinTile(this,x,y,joinWith)-1;
				return thisPic;
			}
			else if (Tiles[this.data[x][y][2]].joinType=='random3')
			{
				var thisPic=Tiles[this.data[x][y][2]].pic;
				thisPic=[thisPic[0],thisPic[1]];
				thisPic[0]+=Math.floor(Math.random()*3);
				return thisPic;
			}
			return Tiles[this.data[x][y][2]].pic;
		}
		return [0,0];
	}
	
	var Tiles=[];
	var TilesByName=[];
	this.Tile=function(name,pic,joinType)
	{
		this.name=name;
		this.pic=pic;
		this.joinType=joinType||'none';
		this.id=Tiles.length;
		Tiles[this.id]=this;
		TilesByName[this.name]=this;
	}
	new this.Tile('void',[0,0]);
	this.loadTiles=function(tiles)
	{
		for (var i in tiles)
		{
			var name=tiles[i][0];
			var pic=tiles[i][1];
			var joinType=tiles[i][2];
			new this.Tile(name,pic,joinType);
		}
	}
	
	var computeTile=function(tile,tiles,value,name)
	{
		if (tile==value && tiles[name]) return TilesByName[tiles[name]];
		return 0;
	}
	this.Map.prototype.assignTiles=function(room,tiles)
	{
		//set the displayed tiles for this room
		for (var i in room.tiles)
		{
			var type=Tiles[0];
			var me=room.tiles[i];
			var tile=this.data[me.x][me.y][0];
			type=computeTile(tile,tiles,TILE_WALL_CORNER,'wall corner')||type;
			type=computeTile(tile,tiles,TILE_WALL,'wall')||type;
			type=computeTile(tile,tiles,TILE_FLOOR_EDGE,'floor edges')||type;
			type=computeTile(tile,tiles,TILE_FLOOR_CENTER,'floor')||type;
			type=computeTile(tile,tiles,TILE_PILLAR,'pillar')||type;
			type=computeTile(tile,tiles,TILE_DOOR,'door')||type;
			type=computeTile(tile,tiles,TILE_WATER,'water')||type;
			type=computeTile(tile,tiles,TILE_ENTRANCE,'entrance')||type;
			type=computeTile(tile,tiles,TILE_EXIT,'exit')||type;
			
			this.data[me.x][me.y][2]=type.id;
		}
	}
	
	
	this.Map.prototype.draw=function(size)
	{
		//return a string containing a rough visual representation of the map
		var str='';
		var size=size||10;
		for (var y=0;y<this.h;y++){for (var x=0;x<this.w;x++){
				var text='';
				if (this.isFloor(x,y)!=-1) text='o';
				if (this.isWall(x,y)!=-1) text+='x';
				var room=this.getRoom(x,y);
				var opacity=Math.max(0.1,1-(this.getRoom(x,y).gen/10));
				var title=room.freeTiles;//this.data[x][y][0].toString();
				text='';
				str+='<div style="opacity:'+opacity+';width:'+size+'px;height:'+size+'px;position:absolute;left:'+(x*size)+'px;top:'+(y*size)+'px;display:block;padding:0px;margin:0px;background:#'+colors[this.data[x][y][0]]+';color:#999;" title="'+title+'">'+text+'</div>';
			}
			str+='<br>';
		}
		str='<div style="position:relative;width:'+(this.w*size)+'px;height:'+(this.h*size)+'px;background:#000;font-family:Courier;font-size:'+size+'px;float:left;margin:10px;">'+str+'</div>';
		return str;
	}
	
	this.Map.prototype.drawDetailed=function()
	{
		//return a string containing a rough visual representation of the map (with graphics)
		var str='';
		var size=16;
		for (var y=0;y<this.h;y++){for (var x=0;x<this.w;x++){
				var room=this.getRoom(x,y);
				//var opacity=Math.max(0.1,room.tiles[this.getRoomTile(room,x,y)].score);
				var opacity=1;
				var title='void';
				if (room!=-1)
				{
					opacity=Math.max(0.1,1-room.gen/5);
					if (this.data[x][y][0]==TILE_ENTRANCE || this.data[x][y][0]==TILE_EXIT) opacity=1;
					title=(room.corridor?'corridor':'room')+' '+room.id+' | depth : '+room.gen+' | children : '+room.children.length;
				}
				var pic=this.getPic(x,y);
				str+='<div style="opacity:'+opacity+';width:'+size+'px;height:'+size+'px;position:absolute;left:'+(x*size)+'px;top:'+(y*size)+'px;display:block;padding:0px;margin:0px;background:#'+colors[this.data[x][y][0]]+' url(img/dungeonTiles.png) '+(-pic[0]*16)+'px '+(-pic[1]*16)+'px;color:#999;" title="'+title+'"></div>';
			}
			str+='<br>';
		}
		str='<div style="box-shadow:0px 0px 12px 6px #00061b;position:relative;width:'+(this.w*size)+'px;height:'+(this.h*size)+'px;background:#00061b;font-family:Courier;font-size:'+size+'px;float:left;margin:10px;">'+str+'</div>';
		return str;
	}
	
	this.Map.prototype.getStr=function()
	{
		//return a string containing the map with tile graphics, ready to be pasted in a wrapper
		var str='';
		var size=16;
		for (var y=0;y<this.h;y++){for (var x=0;x<this.w;x++){
				var room=this.getRoom(x,y);
				//var opacity=Math.max(0.1,room.tiles[this.getRoomTile(room,x,y)].score);
				var opacity=1;
				var title='void';
				var pic=this.getPic(x,y);
				if (room!=-1)
				{
					/*
					opacity=Math.max(0.1,1-room.gen/5);
					if (room.hidden) opacity=0;
					if (this.data[x][y][0]==TILE_ENTRANCE || this.data[x][y][0]==TILE_EXIT) opacity=1;
					*/
					if (room.hidden) pic=[0,0];
					title=(room.corridor?'corridor':'room')+' '+room.id+' | depth : '+room.gen+' | children : '+room.children.length;
				}
				str+='<div style="opacity:'+opacity+';width:'+size+'px;height:'+size+'px;position:absolute;left:'+(x*size)+'px;top:'+(y*size)+'px;display:block;padding:0px;margin:0px;background:#'+colors[this.data[x][y][0]]+' url(img/dungeonTiles.png) '+(-pic[0]*16)+'px '+(-pic[1]*16)+'px;color:#999;" title="'+title+'"></div>';
			}
			str+='<br>';
		}
		return str;
	}
	
}