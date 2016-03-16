interface Sender {
  success: any;
  warning: any;
  error: any;
}

function sender_factory(): Sender {
    function sendMessage(label: string, body: string) {
        let p = document.getElementById("message");
        p.className = "";
        p.classList.add("message", label);
        p.textContent = body;
    }

    return {success: sendMessage.bind(null, "message-success"),
            warning: sendMessage.bind(null, "message-warning"),
            error: sendMessage.bind(null, "message-error")};
}

export let send: Sender = sender_factory();
