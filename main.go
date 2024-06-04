package main

import (
    "app/handlers"

    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Static("/", "./public")

    app.Get("/lucas", handlers.LucasHandler)

    app.Listen(":3000")
}