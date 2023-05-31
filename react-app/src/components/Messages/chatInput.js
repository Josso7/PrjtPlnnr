import { postMessages } from '../../store/message'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

function ChatInput({activeChannel, socket}) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const currentChannel = useSelector(state => {
        if(Object.values(state.channels.entries).length > 0){
            const channels = Object.values(state.channels.entries)
            const channel = channels.find(channel => channel.id === activeChannel)
            return channel
        }
    })
    const [chatInput, setChatInput] = useState('')

    const postMessage = async (e) => {
        e.preventDefault();

        if (chatInput) {
          dispatch(postMessages(activeChannel, user.id, chatInput));
          socket.emit("chat", {
            user: user.username,
            msg: chatInput,
            room: activeChannel,
            created_at: new Date().toLocaleTimeString(),
          });
          setChatInput("");
        }
      };

      const handleInput = (e) => {
        setChatInput(e.target.value);
        e.target.style.height = "20px";
        e.target.style.height = `${e.target.scrollHeight + 4}px`;
      };

    return (
        <div className="chat-container">
          <form autoComplete="off" className="chat-form" onSubmit={postMessage}>
            <textarea
              className="chat-input"
              value={chatInput}
              onChange={(e) => handleInput(e)}
              placeholder={`Message #${currentChannel && currentChannel.name}`}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && postMessage(e)
              }
            ></textarea>
          </form>
      </div>
    )
}

export default ChatInput
