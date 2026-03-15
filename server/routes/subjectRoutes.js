const router = require("express").Router()

const auth = require("../middleware/authMiddleware")

const {
getSubjects,
createSubject,
deleteSubject
} = require("../controllers/subjectController")

router.get("/",auth,getSubjects)

router.post("/",auth,createSubject)

router.delete("/:id",auth,deleteSubject)

module.exports = router