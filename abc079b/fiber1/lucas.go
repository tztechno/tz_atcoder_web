// handlers/lucas.go
package handlers

import (
    "strconv"

    "github.com/gofiber/fiber/v2"
)

func lucasNumber(n int) int {
    if n == 0 {
        return 2
    } else if n == 1 {
        return 1
    } else {
        return lucasNumber(n-1) + lucasNumber(n-2)
    }
}

func LucasHandler(c *fiber.Ctx) error {
    n, err := strconv.Atoi(c.Query("n"))
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid value for n",
        })
    }

    result := lucasNumber(n)
    return c.JSON(fiber.Map{
        "result": result,
    })
}
