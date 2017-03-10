import React from 'react';
class Header extends React.Component {
	constructor(props) {
    super(props)
    this.props=props;
    this.onSubmitForm=this.onSubmitForm.bind(this);
    this.onSubmitUnameForm=this.onSubmitUnameForm.bind(this);
    this.state={
      socket:{}  }
    this.socketInfo=this.socketInfo.bind(this)
}

componentWillMount() {
  this.socketInfo();
}

componentDidMount() {
  var chat=$('#chat');
  var users=$('#users');
  this.state.socket.on('new message',function(data){
      chat.append("<span className='msg'<b/>"+data.uNme+":"+data.msg);
})
          console.log("hhhh");
   this.state.socket.on('usernames',function(data){
    var html='';
    for(var i in data){
      html+=data[i]+'<br/>'
    }
    users.html(html);
})
   this.state.socket.on('whisper',function(data){
     chat.append("<h4 className='whisper'><br/>"+data.uNme+":<b/>"+data.msg+"</h4><br/>");
   });
}
socketInfo(){
  var socket = io.connect('http://localhost:3000');
  console.log(this)
  console.log(socket);
  this.setState({
        socket:socket
   });
   console.log(this.state.socket);
     socket.on('news', function (data) {
       console.log(data);
       socket.emit('my other event', { my: 'data' });
     });
}
onSubmitChatName(){

}
onSubmitForm(e){
    e.preventDefault();
      var chat=$('#chat');
    var messageBox=$('#message');
    this.state.socket.emit('send message',messageBox.val(),function(data){
      chat.append("<span className='error'<b/>"+data+"</span><br/>");

    });
     messageBox.val('');
    }
onSubmitUnameForm(e){
    e.preventDefault();
    var unameForm=$('#sendName');
    var err=$('#err');
    var uname=$('#uname')
    this.state.socket.emit('new user',uname.val(), function(data){
        if(data){
                $('#unameWrap').hide();
                $('#contentWrap').show();
              }
              else{
                err.html('Username Exists!!Retry!!');
              }
    });
     uname.val('');
    }
  
render() { 
		var obj=this;
      return (
        <div>
        <div id="unameWrap">
            <p>Enter your username:</p>
            <p id="err"></p>
          <form id="sendName">
            <input size="35" id="uname" />
            <button type="submit" onClick={obj.onSubmitUnameForm}> Enter</button>
          </form>
          </div>
       <div id="contentWrap">
        <div id="chatWrap">
          <div id="chat" ></div>
          <form id="send-message">
            <input size="35" id="message"/>
            <button type="submit" onClick={obj.onSubmitForm}>Submit</button>
          </form>
        </div>

        <div id="wrapName">
        <input size="15" id="chatName"/>
         <button type="submit" onClick={obj.onSubmitChatName}>Chat</button>
        <div id="users">Available Users:</div>
      </div></div>
      </div>

      );
   }
}
export default Header;