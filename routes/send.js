router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message, from } = req.body;

    const msg = await Message.create({
      senderId,
      receiverId,
      message,
      from,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});