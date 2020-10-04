"use strict";

// load .env configurations
require("dotenv").config();

var fs = require("fs"),
    multer = require("multer"),
    request = require("request"),
    express = require("express"),
    router = express.Router();

// Google OAuth client id, secret and redirect uri configured from .env
const CLIENTID = process.env.CLIENT_ID,
    CLIENTSECRET = process.env.CLIENT_SECRET,
    REDIRECTURI = process.env.REDIRECT_URL;

var access_token = "";

var oauthUrl = getOAuthURL();

function getOAuthURL() {
    // authorization uri
    var authUrl = "https://accounts.google.com/o/oauth2/v2/auth?";

    //#region get parameters

    // access_type
    var access_type = "access_type=offline&";
    // scopes
    var scope =
        "scope=" +
        encodeURIComponent(
            "https://www.googleapis.com/auth/drive.file" +
            " " +
            "https://www.googleapis.com/auth/drive.metadata.readonly" +
            " " +
            "https://www.googleapis.com/auth/plus.me"
        ) +
        "&";
    // response type
    var response_type = "response_type=code&";
    // client id
    var client_id = "client_id=" + CLIENTID + "&";
    // redirect uri
    var redirect_uri = "redirect_uri=" + encodeURIComponent(REDIRECTURI);

    //#endregion

    // prepare url and return
    var oauthUrl = authUrl + access_type + scope + response_type + client_id + redirect_uri;
    return oauthUrl;
}

router.get(
    "/auth",
    (req, res) => {
        res.json({ url: oauthUrl });
    },
    (err) => {
        console.error(err);
        res.send(500);
    }
);

router.use("/oauthcallback", (req, res) => {
    var session = req.session;
    var code = req.query.code;

    var url = "https://www.googleapis.com/oauth2/v4/token";
    request(
        {
            uri: url,
            method: "POST",
            form: {
                code: code,
                client_id: CLIENTID,
                client_secret: CLIENTSECRET,
                grant_type: "authorization_code",
                redirect_uri: REDIRECTURI
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        (err, response, body) => {
            if (err) {
                return console.error(err);
            }

            // set the access_token
            var json = JSON.parse(body);
            access_token = json.access_token;
            session["tokens"] = body;

            // redirect to home page for upload
            res.redirect("/welcome.html");
        }
    );
});

const upload = multer({ dest: __dirname + '/uploads/images' });
router.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        var url = "https://www.googleapis.com/upload/drive/v3/files";
        request(
            {
                uri: url,
                qs: {
                    uploadType: "multipart"
                },
                method: "POST",
                headers: {
                    "Content-Type": "multipart/related",
                    Authorization: "Bearer " + access_token
                },
                multipart: [
                    {
                        "Content-Type": "application/json; charset=UTF-8",
                        body: JSON.stringify({
                            name: req.file.originalname
                        })
                    },
                    {
                        "Content-Type": req.file.mimetype,
                        body: fs.createReadStream(req.file.path)
                    }
                ]
            },
            (error, response, body) => {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                }
                res.redirect('/success.html');
            }
        );
    }
    else throw 'error';
});

router.get("/user", (req, res) => {
    if (req.session["tokens"]) {
        res.send(200);
    } else {
        res.send(500);
    }
});

module.exports = router;