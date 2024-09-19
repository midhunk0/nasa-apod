const express=require("express");
const { fetchDates, toggleFav, inFav, registerUser, loginUser, deleteUser, removeItem } = require("./controller");
const router=express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.delete("/deleteUser", deleteUser);
router.get("/fetchDates/:username", fetchDates);
router.get("/inFav/:username/:date", inFav);
router.post("/toggleFav", toggleFav);
router.post("/removeItem", removeItem);
module.exports=router;