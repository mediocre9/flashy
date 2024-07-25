# Flashy

Simple and basic middleware for handling **flash messages** in Express with no additional features.

# Usage

```javascript
import express from "express";
import session from "express-session";
import { flashy } from "flashy";

app.use(
    session({
        secret: "krabby patty secret formula",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(flashy());

app.get("/", (request, response) => {
    request.flashy("success", " ＼（^０＾）／ ");
    request.flashy("warning", " (˚☐˚! ) ");
    request.flashy("error", " (ⅈ▱ⅈ) ");
    response.redirect("/flashy");
});

app.get("/flashy", (request, response) => {
    // use any template engine
    const successNotifications = request.flashy("success");
    const warningNotifications = request.flashy("warning");
    const errorNotifications = request.flashy("error");
    response.render("template", {
        success: successNotifications,
        warning: warningNotifications,
        error: errorNotifications,
    });
});

app.listen(8080);
```
