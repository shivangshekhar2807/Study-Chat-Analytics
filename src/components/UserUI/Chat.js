

import { useState } from "react";
import ChatSidebar from "./ChatSideBar";
import WriteEmail from "./WriteEmail";
import SentEmail from "./SentEmail";
import ReceivedEmail from "./ReceivedEmail";

function Chat() {
  const [selectedview, setSelectedView] = useState('write');
  

  return (
    <div className="d-flex">
      <ChatSidebar setSelectedView={setSelectedView} />
      <div style={{ flex: 1, padding: '20px' }}>
        {selectedview === 'write' && <WriteEmail  />}
        {selectedview === 'received' && <ReceivedEmail />}
        {selectedview === 'sent' && <SentEmail  />}
      </div>
    </div>
  );
}

export default Chat;