const express = require("express");
const {
  update_user,
  delete_user,
  change_password,
} = require("../../controllers/user");

const router = express.Router();

router.put("/user_update/:id", update_user);
router.patch("/user_password_update/:id", change_password);
//user soft delete method
router.delete("/delete_user/:id", delete_user);

exports.user_profile_update = router;
