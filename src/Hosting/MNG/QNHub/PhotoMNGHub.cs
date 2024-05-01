using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace QN.Ots.Photo.MNG.Hosting
{
    public class PhotoMNGHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            var name = Context.GetHttpContext().Request.Query["name"];
            return Clients.All.SendAsync("Send", $"{name} joined the chat");
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var name = Context.GetHttpContext().Request.Query["name"];
            return Clients.All.SendAsync("Send", $"{name} left the chat");
        }

        public async Task NewMessage(long username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }

        public async Task Send(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}
