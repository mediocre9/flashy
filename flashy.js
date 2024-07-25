/**
 * Flashy is a middleware for handling flash messages in Express.
 * 
 * Reinvented the wheel. (つ▀¯▀)つ
 * 
 * @example
 * import express from "express";
 * import session from "express-session";
 * import { flashy } from "./flashy.js";
 * 
 * const app = express();
 * 
 * app.use(session({ 
 *     secret: "krabby patty secret formula", 
 *     resave: false, 
 *     saveUninitialized: true 
 * }));
 * 
 * app.use(flashy());
 * 
 * app.get("/", (request, response) => {
 *     request.flashy("success", " ＼（^０＾）／ ");
 *     request.flashy("warning", " (˚☐˚! ) ");
 *     request.flashy("error", " (ⅈ▱ⅈ) ");
 *     response.redirect("/flashy");
 * });
 * 
 * app.get("/flashy", (request, response) => {
 *     const successNotifications = request.flashy("success");
 *     const warningNotifications = request.flashy("warning");
 *     const errorNotifications = request.flashy("error");
 *     // use any template engine
 *     response.render("template", { 
 *         success: successNotifications, 
 *         warning: warningNotifications, 
 *         error: errorNotifications 
 *     });
 * });
 * 
 * app.listen(8080);
 * 
 * @returns {Function} middleware function.
 */
export const flashy = () => {
    return (request, _, next) => {
        if (!request.session) throw new Error("express-session middleware is required!");

        request.flashy = (key, message) => {
            if (!key) throw new Error("key is required!");

            request.session.messages = request.session.messages ?? {};

            if (key && !message) {
                let messages = request.session.messages[key];
                delete request.session.messages[key];
                return messages;
            }

            if (!request.session.messages[key]) request.session.messages[key] = [];
            request.session.messages[key].push(message);
        }
        next();
    }
}
