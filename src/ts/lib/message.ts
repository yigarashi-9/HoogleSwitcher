module.exports.send = (function() {

  function sendMessage(label, body) {
    let p = document.getElementById("message");
    p.className = "";
    p.classList.add("message", label);
    p.textContent = body;
  }

  return {"success": sendMessage.bind(null, "message-success"),
          "warning": sendMessage.bind(null, "message-warning"),
          "error": sendMessage.bind(null, "message-error")};
}());
