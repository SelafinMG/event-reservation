import {
  getFavoriteSessionsService,
  addFavoriteSessionService,
  removeFavoriteSessionService,
} from "../services/favorites.service.js"

// GET /api/favorites/sessions
export const getFavoriteSessionsController = async (req, res) => {
  try {
    const favorites = await getFavoriteSessionsService()
    return res.status(200).json(favorites)
  } catch (error) {
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    })
  }
}

// POST /api/favorites/:sessionId
export const addFavoriteSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params
    if (!sessionId) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Session ID is required.",
      })
    }
    const favorite = await addFavoriteSessionService(sessionId)
    return res.status(201).json(favorite)
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: error.message,
      })
    }
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    })
  }
}

// DELETE /api/favorites/:sessionId
export const removeFavoriteSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params
    if (!sessionId) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Session ID is required.",
      })
    }
    const deleted = await removeFavoriteSessionService(sessionId)
    if (!deleted) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: "Favorite not found.",
      })
    }
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    })
  }
}
