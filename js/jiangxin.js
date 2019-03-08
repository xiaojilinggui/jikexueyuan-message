let backgroundColors = ['#f50','#2db7f5','#87d068','#108ee9'];
let cardList = [
	{name:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},
	{name:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},
	{name:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'},
	{name:'耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'}
];
const PAGE ={
	data:{
    backgroundColors: backgroundColors,
    defaultDatas: cardList,
    itemWidth: 338,
    itemHeight: 169,
    paddingOffset: 20,
    zIndex: 0,
    item: null,
    itemOffsetTop: null,
    itemOffsetLeft: null,
    pageX: null,
    pageY: null,
    isLock: true,
    content: null,
  },
  init:function(){
    this.bind();
    this.again();
  },
  bind:function(){
    let tags = document.getElementById('tags');
    this.onEventLister(tags,'click','close',this.remove)
    this.onEventLister(tags, 'mousedown', 'tags-list', this.storage);
    window.addEventListener('mousemove',this.handleMouseDown);
    window.addEventListener('mouseup',this.handleMouseUp);
    let button = document.getElementById('button');
    button.addEventListener('click',this.button);
  },
  onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  remove:function(e){
    let index = e.target.parentNode;
    index.remove();
  },
  button:function(){
    let input = document.getElementById('input');
    let content = input.innerText;
    console.log(content)
    let defaultDatas = PAGE.data.defaultDatas;
    console.log(defaultDatas)
    defaultDatas.push({name:content})
    PAGE.addCard(content);
  },
  handleMouseDown:function(e){
    if (!PAGE.data.isLock) {
      let tags = document.getElementById('tags');
      let tagsHegiht = tags.offsetHeight;
      let tagsWidth = tags.offsetWidth;
      let itemHeight = PAGE.data.itemHeight;
      let itemWidth = PAGE.data.itemWidth;
      let paddingOffset = PAGE.data.paddingOffset;
      let maxHeight = tagsHegiht - itemHeight - paddingOffset;
      let maxWidth = tagsWidth - itemWidth - paddingOffset;
      let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
      let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
      translateX = translateX > maxWidth ? maxWidth : translateX;
      translateY = translateY > maxHeight ? maxHeight : translateY;
      translateX = translateX < paddingOffset ? paddingOffset : translateX;
      translateY = translateY < paddingOffset ? paddingOffset : translateY;
      PAGE.data.item.style.top = translateY + 'px';
      PAGE.data.item.style.left = translateX + 'px';
    }
  },
  handleMouseUp:function(){
    PAGE.data.isLock = true;
  },
  storage:function(e){
    let item = e.target;
    console.log(item)
    item.style.zIndex = ++PAGE.data.zIndex;
    PAGE.data.itemOffsetTop = item.offsetTop;
    PAGE.data.itemOffsetLeft = item.offsetLeft;
    PAGE.data.pageX = e.pageX;
    PAGE.data.pageY = e.pageY;
    PAGE.data.item = item;
    PAGE.data.isLock = false;
  },
  again:function(){
    PAGE.data.defaultDatas.forEach(data =>PAGE.addCard(data.name));
  },
  addCard:function(name){
    let tags = document.getElementById('tags');
    let tagsHegiht = tags.offsetHeight;
    let tagsWidth = tags.offsetWidth;
    let itemHeight = PAGE.data.itemHeight;
    let itemWidth = PAGE.data.itemWidth;
    let paddingOffset = PAGE.data.paddingOffset;
    let maxHeight = tagsHegiht - itemHeight;
    let maxWidth = tagsWidth - itemWidth;
    let randomTop = PAGE.random(paddingOffset,maxHeight);
    let randomLeft = PAGE.random(paddingOffset,maxWidth);
    let zIndex = ++PAGE.data.zIndex;
    let backgroundColors = PAGE.data.backgroundColors;
    let background = backgroundColors[zIndex%backgroundColors.length];
    let tagsList = document.createElement('div');
        tagsList.setAttribute('class', 'tags-list');
        tagsList.innerText = name;
        let styleStr = `
          background:url(img/line.png)no-repeat;;
          z-index:${zIndex};
          background-color:${background};
          top:${randomTop}px;
          left:${randomLeft}px;`;
        tagsList.setAttribute('style', styleStr);
        tags.appendChild(tagsList);

    let close = document.createElement('div');
        close.setAttribute('class', 'close');
         close.innerText = 'X';
        let styleClose = `
         position: absolute;
          bottom: 5px;
          left: 140px;
          height: 30px;`;
        close.setAttribute('style', styleClose);
        tagsList.appendChild(close);
  },
  random:function(min,max){
    return Math.floor(Math.random() * (max - min) + min);
  }

}
PAGE.init();