export class Message {
  id: string;

  constructor(id: string) {
    // display messages on the element designated by id
    this.id = id;
  }

  _sendMessage(label: string, body: string) {
    let elem = document.getElementById(this.id);
    elem.className = "";
    elem.classList.add("message", label);
    elem.textContent = body;
  }

  success = this._sendMessage.bind(this, "message-success");
  warning = this._sendMessage.bind(this, "message-warning");
  error = this._sendMessage.bind(this, "message-error");
}
