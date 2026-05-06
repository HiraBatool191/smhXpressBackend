// const express = require("express");
// const Activity = require("../models/Activity");
// const router = express.Router();

// router.post("/track", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productName,
//       timeSpent = 0,
//       zoomCount = 0,
//       action,
//     } = req.body;

//     if (!userId) {
//       return res.status(400).json({ message: "userId required" });
//     }

//     const activity = await Activity.create({
//       userId,
//       productId,
//       productName,
//       timeSpent: Number(timeSpent),
//       zoomCount: Number(zoomCount),
//       action,
//     });

//     res.json(activity);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


// routes/track.js
const express = require("express");
const Activity = require("../models/Activity");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      productId,
      productName,
      timeSpent,
      zoomCount,
      action,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    await Activity.create({
      userId,
      productId,
      productName,
      timeSpent: Number(timeSpent || 0),
      zoomCount: Number(zoomCount || 0),
      action,
    });

    res.json({ message: "Tracked successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;