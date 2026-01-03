
const Dashboard = () => {

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar - Contacts */}
      <div className="w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-blue-600 text-white font-bold">My Chats</div>
        <div className="overflow-y-auto flex-1">
          {['Ali', 'Sara', 'Osman'].map((user) => (
            <div key={user} className="p-4 border-b hover:bg-gray-100 cursor-pointer">
              <p className="font-semibold">{user}</p>
              <p className="text-xs text-gray-500">Last message...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b shadow-sm font-bold">Ali</div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
          <div className="bg-blue-100 p-3 rounded-lg max-w-xs self-start">Assalam o Alaikum! Kese ho?</div>
          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs self-end ml-auto">Walikum Assalam, mein theek hon.</div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input type="text" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" placeholder="Type a message..." />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;