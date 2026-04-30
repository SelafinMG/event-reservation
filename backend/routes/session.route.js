import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.send("Session route")
})


router.get("/:sessionId/questions", )

export default router